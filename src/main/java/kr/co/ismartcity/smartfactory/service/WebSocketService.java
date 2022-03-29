package kr.co.ismartcity.smartfactory.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessagingException;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@ConfigurationProperties
public class WebSocketService {

	@Value("${websocket.w2c")
	public String w2c;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

	public void sendMessage(String topic, String message) {
		simpMessagingTemplate.convertAndSend(w2c + "/" + topic, message);
	}
	
	public void sendMessage(String topic, Object message) throws MessagingException, JsonProcessingException {
		System.out.println("SEND SOCKET DATA");
		simpMessagingTemplate.convertAndSend("/w2c/" + topic, objectMapper.writeValueAsString(message));
	}
	
	@MessageMapping("/{topic}")
	public void recvMessage(@DestinationVariable("topic") String topic, Message message) {
		log.debug("====== websocket {}, {}", topic, message);
	}
}
