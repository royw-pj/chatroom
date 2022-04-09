package com.chatroom.chat.service.impl;

import com.chatroom.chat.enums.RedisTopic;
import com.chatroom.chat.enums.WebSocketMessageType;
import com.chatroom.chat.model.*;
import com.chatroom.chat.redis.RedisSubscriber;
import com.chatroom.chat.redis.UserRepository;
import com.chatroom.chat.service.ChatroomService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import javax.websocket.Session;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ChatroomServiceImpl implements ChatroomService {

    private final ConcurrentHashMap<String, Session> userSessionMap = new ConcurrentHashMap<>();

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    @Qualifier("userTopicSubscriber")
    private RedisSubscriber userTopicSubscriber;

    @Autowired
    @Qualifier("messageTopicSubscriber")
    private RedisSubscriber messageTopicSubscriber;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @PostConstruct
    private void addTopicListener() {
        userTopicSubscriber.addListener(this::handleRedisTopicEvent);
        messageTopicSubscriber.addListener(this::handleRedisTopicEvent);
    }

    private void handleRedisTopicEvent(Message msg, RedisTopic topic) {
        try {
            switch (topic) {
                case MESSAGE:
                    ChatMessage chatMessage = objectMapper.readValue(msg.getBody(), ChatMessage.class);
                    sendChatMessageToUser(chatMessage);
                    break;
                case USER:
                    UserUpdateMessage userUpdateMessage = objectMapper.readValue(msg.getBody(), UserUpdateMessage.class);
                    boardcastUserUpdateMessage(userUpdateMessage);
                    break;
                default:
                    throw new IllegalArgumentException();
            }
        } catch (IOException ex) {
            log.error("Unable to cast msg", ex);
        }
    }


    @Override
    public void websocketClose(Session session) throws JsonProcessingException {
        Optional<String> userOpt = Optional.empty();
        for (Map.Entry<String, Session> entry : userSessionMap.entrySet()) {
            if (entry.getValue() == session) {
                userOpt = Optional.of(entry.getKey());
            }
        }
        if (userOpt.isEmpty()) {
            return;
        }
        String username = userOpt.get();
        userSessionMap.remove(username);

        User user = userRepository.getUser(username);
        userRepository.removeUser(user);
        UserUpdateMessage userUpdateMessage = new UserUpdateMessage();
        userUpdateMessage.setUser(user);
        userUpdateMessage.setOnline(false);
        redisTemplate.convertAndSend(RedisTopic.USER.getCode(), userUpdateMessage);
    }

    @Autowired
    private Validator beanValidator;

    @Override
    public void userRegister(Session session, User user) throws IOException {
        // 0. validation
        Registration registration = new Registration();
        registration.setUser(user);

        if (userRepository.exist(user.getUsername())) {
            Map<String, String> errors = new HashMap<>();
            errors.put("username", "Username exists");
            registration.setErrors(errors);
            sendEnvelopToUser(session, new Envelop(WebSocketMessageType.REGISTER, registration));
            safelyClose(session);
            return;
        }
        Set<ConstraintViolation<User>> constraints = beanValidator.validate(user);
        Map<String, String> errors = constraints.stream().collect(Collectors.toMap(
                constraint -> constraint.getPropertyPath().toString(),
                ConstraintViolation::getMessage
        ));
        registration.setErrors(errors);
        sendEnvelopToUser(session, new Envelop(WebSocketMessageType.REGISTER, registration));
        if (!errors.isEmpty()) {
            safelyClose(session);
            return;
        }

        // 1. save to userSessionMap
        userSessionMap.put(user.getUsername(), session);

        // 2. save to redis
        userRepository.addUser(user);
        UserUpdateMessage userUpdateMessage = new UserUpdateMessage();
        userUpdateMessage.setUser(user);
        userUpdateMessage.setOnline(true);

        // 3. notify another app server
        redisTemplate.convertAndSend(RedisTopic.USER.getCode(), userUpdateMessage);

        // 4. send contact list to user
        sendContactList(session);
    }

    private void safelyClose(Session session) {
        if (session != null && session.isOpen()) {
            try {
                session.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void receiveChatMessageFromUser(ChatMessage message) {
        redisTemplate.convertAndSend(RedisTopic.MESSAGE.getCode(), message);
    }

    private void boardcastUserUpdateMessage(UserUpdateMessage message) {
        Envelop envelop = new Envelop(WebSocketMessageType.USER, message);
        for (Map.Entry<String, Session> entry : userSessionMap.entrySet()) {
            String username = entry.getKey();
            Session session = entry.getValue();
            if (!message.getUser().getUsername().equals(username)) {
                sendEnvelopToUser(session, envelop);
            }
        }
    }

    private void sendContactList(Session session) {
        ContactListMessage message = new ContactListMessage();
        message.setUsers(userRepository.getUsers());
        Envelop envelop = new Envelop(WebSocketMessageType.CONTACT_LIST, message);
        sendEnvelopToUser(session, envelop);
    }

    private void sendChatMessageToUser(ChatMessage message) {
        String receiver = message.getReceiver();
        Envelop envelop = new Envelop(WebSocketMessageType.MESSAGE, message);
        sendEnvelopToUser(receiver, envelop);
    }

    private void sendEnvelopToUser(String receiver, Envelop envelop) {
        if (userSessionMap.containsKey(receiver)) {
            sendEnvelopToUser(userSessionMap.get(receiver), envelop);
        }
    }

    private void sendEnvelopToUser(Session receiver, Envelop envelop) {
        try {
            if (receiver.isOpen()) {
                receiver.getBasicRemote().sendObject(envelop);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
