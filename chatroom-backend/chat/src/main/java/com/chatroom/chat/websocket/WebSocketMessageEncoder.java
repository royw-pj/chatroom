package com.chatroom.chat.websocket;

import com.chatroom.chat.model.Envelop;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

@Component
public class WebSocketMessageEncoder implements Encoder.Text<Envelop> {

    private static ObjectMapper objectMapper;

    @Autowired
    private void setObjectMapper(ObjectMapper objectMapper) {
        WebSocketMessageEncoder.objectMapper = objectMapper;
    }

    @SneakyThrows
    @Override
    public String encode(Envelop envelop) throws EncodeException {
        return objectMapper.writeValueAsString(envelop);
    }

    @Override
    public void init(EndpointConfig endpointConfig) {

    }

    @Override
    public void destroy() {

    }
}
