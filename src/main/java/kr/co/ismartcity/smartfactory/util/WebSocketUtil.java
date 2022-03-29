package kr.co.ismartcity.smartfactory.util;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessagingException;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@ConfigurationProperties
public class WebSocketUtil {
	
	private static ObjectMapper objectMapper;
	private static SimpMessagingTemplate simpMessagingTemplate;
	private static String w2c;

	@Value("${websocket.w2c")
	public String cw2c;
	
	@Autowired
	private ObjectMapper awObjectMapper;
	
	@Autowired
    private SimpMessagingTemplate awSimpMessagingTemplate;
	
	@PostConstruct
	public void init() {
		w2c = this.cw2c;
		objectMapper = this.awObjectMapper;
		simpMessagingTemplate = this.awSimpMessagingTemplate;
	}

	public static void sendMessage(String topic, String message) {
		simpMessagingTemplate.convertAndSend("/w2c/" + topic, message);
	}
	
	public static void sendMessage(String topic, Object message) {
		try {
			simpMessagingTemplate.convertAndSend("/w2c/" + topic, objectMapper.writeValueAsString(message));
		} catch (MessagingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
