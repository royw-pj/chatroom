package com.chatroom.chat.redis;

import com.chatroom.chat.model.User;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;

public interface UserRepository {
    void removeAllUser();
    void addUser(User user);
    void removeUser(User user);
    User getUser(String username) throws JsonProcessingException;
    boolean exist(String username);
    List<User> getUsers();
}
