package com.chatroom.chat.redis;

import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;

import java.util.ArrayList;
import java.util.List;
import java.util.function.BiConsumer;

public abstract class AbstractRedisSubscriber implements MessageListener {

    private final List<BiConsumer<Message, String>> listeners;

    public AbstractRedisSubscriber() {
        listeners = new ArrayList<>();
    }

    public void addListener(BiConsumer<Message, String> listener) {
        if (listener == null) {
            throw new IllegalArgumentException();
        }
        listeners.add(listener);
    }

    public void removeListener(BiConsumer<Message, String> listener) {
        listeners.remove(listener);
    }

    @Override
    public void onMessage(Message message, byte[] pattern) {
        for (BiConsumer<Message, String> listener : listeners) {
            listener.accept(message, String.valueOf(pattern));
        }
    }
}
