package com.chatroom.chat.redis.impl;

import com.chatroom.chat.constants.RedisKeys;
import com.chatroom.chat.model.User;
import com.chatroom.chat.redis.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class RedisUserRepository implements UserRepository {
    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Value("${chatroom.create-testing-user}")
    private boolean createTestingUserOnStartup;

    @PostConstruct
    private void postContruct() {
        if (createTestingUserOnStartup) {
            User testingUser = new User();
            testingUser.setUsername("SystemUser");
            testingUser.setCountry("System Country");
            testingUser.setGender("M");
            testingUser.setAge(30);
            addUser(testingUser);
        }
    }

    @Override
    public void removeAllUser() {
        redisTemplate.delete(RedisKeys.USER_LIST);
    }

    @Override
    public void addUser(User user) {
        redisTemplate.opsForHash().put(RedisKeys.USER_LIST, user.getUsername(), user);
    }

    @Override
    public void removeUser(User user) {
        redisTemplate.opsForHash().delete(RedisKeys.USER_LIST, user.getUsername());
    }

    @Override
    public User getUser(String username) {
        Object res = redisTemplate.opsForHash().get(RedisKeys.USER_LIST, username);
        return res == null ? null : objectMapper.convertValue(res, User.class);
    }

    @Override
    public boolean exist(String username) {
        return redisTemplate.opsForHash().hasKey(RedisKeys.USER_LIST, username);
    }

    @Override
    public List<User> getUsers() {
        List<Object> users = redisTemplate.boundHashOps(RedisKeys.USER_LIST).values();
        if (users != null) {
            return users.stream().map(user -> objectMapper.convertValue(user, User.class)).collect(Collectors.toList());
        } else {
            return new ArrayList<>();
        }
    }
}
