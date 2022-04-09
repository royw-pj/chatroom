package com.chatroom.chat.websocket;

import com.chatroom.chat.model.ChatMessage;
import com.chatroom.chat.model.Envelop;
import com.chatroom.chat.model.User;
import com.chatroom.chat.service.ChatroomService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

@ServerEndpoint(value = "/chatroom-ws", encoders =  {WebSocketMessageEncoder.class}, decoders = {WebSocketMessageDecoder.class})
@Controller
public class UserWebSocketHandler extends TextWebSocketHandler {

    private static ChatroomService chatroomService;
    private static ObjectMapper objectMapper;

    @Autowired
    private void setChatroomService(ChatroomService chatroomService) {
        UserWebSocketHandler.chatroomService = chatroomService;
    }

    @Autowired
    private void setObjectMapper(ObjectMapper objectMapper) {
        UserWebSocketHandler.objectMapper = objectMapper;
    }

    private Session session;

    @OnOpen
    public void onOpen(Session session) {
        this.session = session;
        session.setMaxIdleTimeout(TimeUnit.MINUTES.toMillis(5));
    }

    @OnClose
    public void onClose() {
        try {
            chatroomService.websocketClose(session);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    @OnMessage
    public void onMessage(Envelop envelop) throws IOException {
        // Envelop envelop = objectMapper.readValue(message, Envelop.class);

        switch (envelop.getType()) {
            case MESSAGE:
                chatroomService.receiveChatMessageFromUser(objectMapper.convertValue(envelop.getBody(), ChatMessage.class));
                break;
            case REGISTER:
                chatroomService.userRegister(session, objectMapper.convertValue(envelop.getBody(), User.class));
                break;
            case HEARTBEAT:
                break;
            default:
                throw new IllegalArgumentException("Message type not support");
        }
    }

    @OnError
    public void onError(Session session, Throwable error) {
        System.out.println(error);
    }
}
