package com.chatroom.chat.model;

import lombok.Data;

@Data
public class UserUpdateMessage {
    private User user;
    private boolean isOnline;
}
