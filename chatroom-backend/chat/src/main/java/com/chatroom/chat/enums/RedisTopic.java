package com.chatroom.chat.enums;

public enum RedisTopic {
    USER("user", "User info update (offline or online)"),
    MESSAGE("msg", "Chat message");

    private final String code;
    private final String description;

    RedisTopic(String code, String description) {
        this.code = code;
        this.description = description;
    }

    public String getCode() {
        return this.code;
    }

    public String getDescription() {
        return this.description;
    }
}
