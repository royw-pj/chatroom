package com.chatroom.chat.service;

import com.chatroom.chat.model.ChatMessage;
import com.chatroom.chat.model.User;
import com.fasterxml.jackson.core.JsonProcessingException;

import javax.websocket.Session;
import java.io.IOException;
import java.util.List;

public interface ChatroomService {

    // void userLogin(Session session, User user);

    void websocketClose(Session session) throws JsonProcessingException;

    void userRegister(Session session, User user) throws IOException;

    void receiveChatMessageFromUser(ChatMessage message);
}
