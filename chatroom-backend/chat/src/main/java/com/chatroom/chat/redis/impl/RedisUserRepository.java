package com.chatroom.chat.redis.impl;

import com.chatroom.chat.model.User;
import com.chatroom.chat.redis.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class RedisUserRepository implements UserRepository {
    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Override
    public void addUser(User user) {
        redisTemplate.opsForHash().put("userList", user.getUsername(), user);
    }

    @Override
    public void removeUser(User user) {
        redisTemplate.opsForHash().delete("userList", user.getUsername());
    }

    @Override
    public User getUser(String username) {
        Object res = redisTemplate.opsForHash().get("userList", username);
        if (res != null) {
            try {
                return objectMapper.readValue(res.toString(), User.class);
            } catch (JsonProcessingException e) {
                return null;
            }
        } else {
            return null;
        }
    }

    @Override
    public boolean exist(String username) {
        return false;
    }

    @Override
    public List<User> getUsers() {
        List<User> output = new ArrayList<>();
        return null;
    }
}
