package com.chatroom.chat.websocket;

import com.chatroom.chat.model.Envelop;
import com.chatroom.chat.service.ChatroomService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

@Component
public class WebSocketMessageDecoder implements Decoder.Text<Envelop> {
    private static ObjectMapper objectMapper;

    @Autowired
    private void setObjectMapper(ObjectMapper objectMapper) {
        WebSocketMessageDecoder.objectMapper = objectMapper;
    }

    @SneakyThrows
    @Override
    public Envelop decode(String s) throws DecodeException {
        return objectMapper.readValue(s, Envelop.class);
    }

    @Override
    public boolean willDecode(String s) {
        return true;
    }

    @Override
    public void init(EndpointConfig endpointConfig) {

    }

    @Override
    public void destroy() {

    }
}
