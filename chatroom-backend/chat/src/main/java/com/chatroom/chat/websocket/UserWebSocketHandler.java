package com.chatroom.chat.websocket;

import com.chatroom.chat.model.ChatMessage;
import com.chatroom.chat.model.Envelop;
import com.chatroom.chat.service.ChatroomService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/chatroom-ws")
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
    }

    @OnClose
    public void onClose() {
        System.out.println("close");
    }

    @OnMessage
    public void onMessage(String message) throws JsonProcessingException {
        Envelop envelop = objectMapper.readValue(message, Envelop.class);
        chatroomService.receiveChatMessageFromUser(new ChatMessage());

    }

    @OnError
    public void onError(Session session, Throwable error) {
        System.out.println(error);
    }
}
