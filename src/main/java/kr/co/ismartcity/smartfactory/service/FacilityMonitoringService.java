package kr.co.ismartcity.smartfactory.service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FacilityMonitoringService {

	@Autowired
	FacilityService facilityService;
	
	@Autowired
	MobiusService mobiusService;
	
	@Autowired
	private SimpMessagingTemplate messageTemplate;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	//@Scheduled(cron = "0 0/5 * * * *")   
	@Scheduled(cron = "*/30 * * * * *")
	public void run() {
		LocalDateTime expiredDatetime = LocalDateTime.now(ZoneOffset.UTC).minusMinutes(5);
		
	}
	
}
