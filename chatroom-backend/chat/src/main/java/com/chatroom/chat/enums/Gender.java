package com.chatroom.chat.enums;

public enum Gender {
    MALE("M", "Male"),
    FEMALE("F", "Female");

    private final String code;
    private final String description;

    Gender(String code, String description) {
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
