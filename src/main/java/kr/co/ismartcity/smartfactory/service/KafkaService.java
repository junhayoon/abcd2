package kr.co.ismartcity.smartfactory.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class KafkaService {
	
	@Autowired
    private KafkaTemplate<String, String> kafkaTemplate;
	
	public void sendMessage(String topic, String message) {
		kafkaTemplate.send(topic, message);
	}
	
	@KafkaListener(topics = "Sisland", groupId = "${spring.kafka.consumer.group-id}", autoStartup = "${spring.kafka.consumer.auto.start:false}")
    public void consume(String message) throws IOException {
        log.debug(String.format("==================== {}", message));
    }
    
}
