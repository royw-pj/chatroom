package com.chatroom.chat.model;

import lombok.Data;

import java.util.Map;

@Data
public class Registration {
    private User user;
    private Map<String, String> errors;
}
