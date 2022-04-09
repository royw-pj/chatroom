package com.chatroom.chat;

import com.chatroom.chat.enums.Gender;
import com.chatroom.chat.model.User;
import com.chatroom.chat.redis.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserRepoTests {
    @Autowired
    private UserRepository userRepository;

    private User userObject() {
        String username = "TEST_username";
        User user = new User();
        user.setAge(20);
        user.setUsername(username);
        user.setCountry("Hong Kong");
        user.setGender(Gender.MALE.getCode());
        return user;
    }

    @Test
    void testGetUser() throws JsonProcessingException {
        User user = userObject();
        userRepository.addUser(user);
        User target = userRepository.getUser(user.getUsername());
        Assertions.assertEquals(user.getUsername(), target.getUsername());
        Assertions.assertEquals(user.getCountry(), target.getCountry());
        Assertions.assertEquals(user.getGender(), target.getGender());
        Assertions.assertEquals(user.getAge(), target.getAge());
    }

    @Test
    void testGetAllUser() {

        // empty users
        userRepository.removeAllUser();
        Assertions.assertEquals(userRepository.getUsers().size(), 0);

        // has exactly 1 user
        User user = userObject();
        userRepository.addUser(user);
        List<User> result = userRepository.getUsers();
        Assertions.assertEquals(1, result.size());
    }

    @Test
    void testExistsUser() {
        String randomUsername = System.nanoTime() + "random";
        boolean exist = userRepository.exist(randomUsername);
        Assertions.assertFalse(exist);
    }

}
