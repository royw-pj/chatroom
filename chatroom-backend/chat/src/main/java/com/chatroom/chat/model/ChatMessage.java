package com.chatroom.chat.model;

import lombok.Data;

@Data
public class ChatMessage {
    private String sender;
    private String receiver;
    private String body;
    private long timestamp;
}
