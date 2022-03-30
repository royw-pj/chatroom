package com.chatroom.chat.model;

import lombok.Data;

import java.util.Date;

@Data
public class Envelop {
    private final String type;
    private final Object body;
    private final long ts;

    public Envelop(String type, Object body) {
        this.type = type;
        this.body = body;
        this.ts = new Date().getTime();
    }

}
