package com.chatroom.chat.service.impl;

import com.chatroom.chat.enums.RedisTopic;
import com.chatroom.chat.enums.WebSocketMessageType;
import com.chatroom.chat.model.*;
import com.chatroom.chat.redis.ChatMessageReceiver;
import com.chatroom.chat.redis.UserMessageReceiver;
import com.chatroom.chat.redis.UserRepository;
import com.chatroom.chat.service.ChatroomService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.websocket.EncodeException;
import javax.websocket.Session;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ChatroomServiceImpl implements ChatroomService {
    private final ConcurrentHashMap<String, Session> userSessionMap = new ConcurrentHashMap<>();

    @Autowired
    private ChatMessageReceiver chatMessageReceiver;

    @Autowired
    private UserMessageReceiver userMessageReceiver;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @PostConstruct
    private void addTopicListener() {
        chatMessageReceiver.addListener((Message msg, String topic) -> {
            try {
                ChatMessage chatMessage = objectMapper.readValue(msg.getBody(), ChatMessage.class);
                sendChatMessageToUser(chatMessage);
            } catch (IOException e) {
                e.printStackTrace();
            }
        });

        userMessageReceiver.addListener((Message msg, String topic) -> {
            try {
                UserUpdateMessage userUpdateMessage = objectMapper.readValue(msg.getBody(), UserUpdateMessage.class);
                if (userUpdateMessage.isOnline()) {
                    userLogin(userUpdateMessage.getUser());
                } else {
                    userLogout(userUpdateMessage.getUser());
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    private void userLogin(User user) {

    }

    @Override
    public void userLogin(Session session, User user) {
        userSessionMap.put(user.getUsername(), session);
        userRepository.addUser(user);
        UserUpdateMessage userUpdateMessage = new UserUpdateMessage();
        userUpdateMessage.setUser(user);
        userUpdateMessage.setOnline(true);
        redisTemplate.convertAndSend(RedisTopic.USER.getCode(), userUpdateMessage);
    }

    @Override
    public void userLogout(User user) {
        userSessionMap.remove(user.getUsername());
        userRepository.removeUser(user);
        UserUpdateMessage userUpdateMessage = new UserUpdateMessage();
        userUpdateMessage.setUser(user);
        userUpdateMessage.setOnline(false);
        redisTemplate.convertAndSend(RedisTopic.USER.getCode(), userUpdateMessage);
    }

    @Override
    public void receiveChatMessageFromUser(ChatMessage message) {
        redisTemplate.convertAndSend(RedisTopic.MESSAGE.getCode(), message);
    }

    @Override
    public void sendChatMessageToUser(ChatMessage message) {
        String receiver = message.getReceiver();
        if (userSessionMap.containsKey(receiver)) {
            Envelop envelop = new Envelop(WebSocketMessageType.MESSAGE.getCode(), message);
            try {
                userSessionMap.get(receiver).getBasicRemote().sendObject(envelop);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void sendContactList(Session session) {
        ContactListMessage message = new ContactListMessage();
        message.setUsers(userRepository.getUsers());
        Envelop envelop = new Envelop(WebSocketMessageType.CONTACT_LIST.getCode(), message);
        try {
            session.getBasicRemote().sendObject(envelop);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<User> getUsers() {
        return null;
    }
}
