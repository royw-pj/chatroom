package com.chatroom.chat.config;

import com.chatroom.chat.enums.RedisTopic;
import com.chatroom.chat.redis.RedisSubscriber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.util.concurrent.Executors;

@Configuration
public class RedisConfig {

    @Bean
    public Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer() {
        return new Jackson2JsonRedisSerializer<>(Object.class);
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate(JedisConnectionFactory connectionFactory, Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);

        // set the serializer of key and hashKey
        template.setDefaultSerializer(jackson2JsonRedisSerializer);
        template.setKeySerializer(new StringRedisSerializer());

        //set the serializer of value and hashValue
        template.setHashKeySerializer(jackson2JsonRedisSerializer);
        template.setValueSerializer(jackson2JsonRedisSerializer);

        // to initialize redisTemplate object
        template.afterPropertiesSet();

        return template;
    }

    private MessageListenerAdapter messageListenerAdapter(RedisSubscriber messageReceiver, Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer) {
        MessageListenerAdapter adapter = new MessageListenerAdapter(messageReceiver, "onMessage");
        adapter.setSerializer(jackson2JsonRedisSerializer);
        adapter.afterPropertiesSet();
        return adapter;
    }

    @Bean(name="messageTopicSubscriber")
    public RedisSubscriber messageTopicSubscriber() {
        return new RedisSubscriber(RedisTopic.MESSAGE);
    }

    @Bean(name="userTopicSubscriber")
    public RedisSubscriber userTopicSubscriber() {
        return new RedisSubscriber(RedisTopic.USER);
    }

    @Bean
    public RedisMessageListenerContainer redisContainer(JedisConnectionFactory connectionFactory, Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer) {
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        container.addMessageListener(messageListenerAdapter(messageTopicSubscriber(), jackson2JsonRedisSerializer), new ChannelTopic(RedisTopic.MESSAGE.getCode()));
        container.addMessageListener(messageListenerAdapter(userTopicSubscriber(), jackson2JsonRedisSerializer), new ChannelTopic(RedisTopic.USER.getCode()));
        container.setTaskExecutor(Executors.newFixedThreadPool(4));

        // to initialize redisTemplate object
        container.afterPropertiesSet();
        return container;
    }


}
