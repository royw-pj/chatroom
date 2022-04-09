package com.chatroom.chat.redis;

import com.chatroom.chat.enums.RedisTopic;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;

import java.util.ArrayList;
import java.util.List;
import java.util.function.BiConsumer;

public class RedisSubscriber implements MessageListener {

    private List<BiConsumer<Message, RedisTopic>> listeners;
    private RedisTopic redisTopic;

    public RedisSubscriber(RedisTopic redisTopic) {
        listeners = new ArrayList<>();
        this.redisTopic = redisTopic;
    }

    public void addListener(BiConsumer<Message, RedisTopic> listener) {
        if (listener == null) {
            throw new IllegalArgumentException();
        }
        listeners.add(listener);
    }

    public void removeListener(BiConsumer<Message, RedisTopic> listener) {
        listeners.remove(listener);
    }

    @Override
    public void onMessage(Message message, byte[] pattern) {
        for (BiConsumer<Message, RedisTopic> listener : listeners) {
            listener.accept(message, redisTopic);
        }
    }
}
