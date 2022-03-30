package com.chatroom.chat.model;

import lombok.Data;

import java.util.List;

@Data
public class ContactListMessage {
    private List<User> users;
}
