package com.chatroom.chat.enums;

public enum WebSocketMessageType {
    USER("USER", "User info update (offline or online)"),
    MESSAGE("MESSAGE", "Chat message"),
    REGISTER("REGISTER", "User register"),
    CONTACT_LIST("CONTACT_LIST", "A list of all the users"),
    HEARTBEAT("HEARTBEAT", "Heartbeat");

    private final String code;
    private final String description;

    WebSocketMessageType(String code, String description) {
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

