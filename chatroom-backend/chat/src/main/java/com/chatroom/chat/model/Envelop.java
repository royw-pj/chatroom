package com.chatroom.chat.model;

import com.chatroom.chat.enums.WebSocketMessageType;
import lombok.Data;

import java.util.Date;

@Data
public class Envelop {
    private final WebSocketMessageType type;
    private final Object body;
    private final long ts;

    public Envelop(WebSocketMessageType type, Object body) {
        this.type = type;
        this.body = body;
        this.ts = new Date().getTime();
    }

}
