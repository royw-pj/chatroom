package com.chatroom.chat.service;

import com.chatroom.chat.model.ChatMessage;
import com.chatroom.chat.model.User;

import javax.websocket.Session;
import java.util.List;

public interface ChatroomService {

    void userLogin(Session session, User user);

    void userLogout(User user);

    void receiveChatMessageFromUser(ChatMessage message);

    void sendChatMessageToUser(ChatMessage message);

    void sendContactList(Session session);

    List<User> getUsers();
}
