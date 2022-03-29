package kr.co.ismartcity.smartfactory.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.Socket;
import java.security.Principal;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64.Encoder;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import kr.co.ismartcity.smartfactory.entity.AirSensorWorkplace;
import kr.co.ismartcity.smartfactory.entity.Facility;
import kr.co.ismartcity.smartfactory.entity.FacilityCategory;
import kr.co.ismartcity.smartfactory.entity.FacilityControlHistory;
import kr.co.ismartcity.smartfactory.entity.Notification;
import kr.co.ismartcity.smartfactory.service.AirSensorWorkplaceService;
import kr.co.ismartcity.smartfactory.service.FacilityControlHistoryService;
import kr.co.ismartcity.smartfactory.service.MobiusService;
import kr.co.ismartcity.smartfactory.service.NotificationService;
import kr.co.ismartcity.smartfactory.service.UserService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
@RestController
@EnableConfigurationProperties
public class WebSocketController {

	@Autowired
	private ObjectMapper objectMapper;
	
	@Autowired
	MobiusService mobiusService;
	
	@Autowired
	AirSensorWorkplaceService airService;
	
	@Autowired
	NotificationService notiService;
	
	@Autowired
	FacilityControlHistoryService facilityControlHistoryService;
	
	@Autowired
	private SimpMessagingTemplate messageTemplate;
	
	private static long tempSequence = 1;

	
	@PreAuthorize("isAuthenticated()")
	@MessageMapping("/request/workplace")
	public void onRequestWorkplace(Principal principal, String message) {
		log.info(String.format("onRequestWorkplace() 1... message(%s)", message));
		
		try {
			Map<String, Object> map = objectMapper.readValue(message, Map.class);
			if(map != null) {
				
				String mobiusId = (String) String.valueOf(map.get("MOBIUSID"));
				log.info(String.format("onRequestWorkplace() 2... mobiusId(%s)", mobiusId));
				
				if (mobiusId == null) { 
					//all : not supported yet
				} else {
					JSONObject ctrlJson =  new JSONObject(map);
					ctrlJson.remove("MOBIUSID");
					ctrlJson.put("SEQ", tempSequence++);					
					
					JSONObject conJsonObject = new JSONObject();
					conJsonObject.put("con", ctrlJson);
					
					log.info(String.format("onRequestWorkplace() 3... conJsonObject(%s)", conJsonObject));
				    				    
					String tempId = String.valueOf(mobiusId).replace("/AirSensor/", "AirSensor/");				    	
			    	mobiusService.requestControl(tempId, conJsonObject);
			    	
			    	//facilityControlHistoryService.addFacilityControlHistory(principal.getName(), map);			    
				}
			}			
		} catch (Exception e) {
			e.printStackTrace();
		}

		log.info("onRequestWorkplace() end...");
	}	
	
	// for Test
	public void sendTestAirAndNoti(AirSensorWorkplace air, Notification noti) {
		log.debug(String.format("sendTestAirAndNoti() 1... air(%s)", air));
		log.debug(String.format("sendTestAirAndNoti() 2... noti(%s)", noti));
		
		try {
			if (air != null)
				messageTemplate.convertAndSend("/w2c/airsensor", objectMapper.writeValueAsString(air));
			if (noti != null)
				messageTemplate.convertAndSend("/w2c/notification", objectMapper.writeValueAsString(noti));			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		log.debug("sendTestAirAndNoti() end...");
	}
	
	@GetMapping("/ws/test")
	public void myTest() {
		Notification noti = new Notification();
		noti.setSeq((long)1348);
		noti.setCreate_date(LocalDateTime.now());
		noti.setInfo("Test ### fire cctv...2021-01-25 05:20:56");
		noti.setLevel(new SecureRandom().nextInt(4));
		noti.setRead(false);
		noti.setRemoved(false);
		noti.setUpdate_date(LocalDateTime.now());
		noti.setFrom(Notification.NOTI_FROM_VA_SYSTEM);
		
		FacilityCategory facilCate = new FacilityCategory();
		facilCate.setCcode("CCTV_FIRE");
		
		String faciId = null;	// dev
		Map<String, Object> map = new HashMap<>();
		map.put("vaId", 1);
		map.put("mediaIp", "112.219.69.210");
		map.put("mediaPort", "16852");
		map.put("mediaDevIp", "119.112.123.0");
		map.put("mediaVurixUrl", "100869/51/0/0");
		map.put("mediaStreamPort", "16852");
		
		Facility facil = new Facility();
		facil.setFcode(faciId);
		facil.setFacilityCategory(facilCate);
		facil.setProperties(map);
		facil.setFacilityName("TEST");
		
		noti.setFacility(facil);
		
		sendTestAirAndNoti(null, noti);
	}
	
	@GetMapping("/vms/event")
	public void vmsEvent(@RequestParam(required=true, value="authToken") String authToken, @RequestParam(required=true, value="apiSerial") String apiSerial) throws Exception 
	{
		// 소켓 및 입출력 스트림 준비
		Socket socket = new Socket("172.16.1.24", 8080);
		BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
		PrintStream out = new PrintStream(socket.getOutputStream());
		
		// 요청라인
		out.println("GET / HTTP/1.1");
		
		// 헤더정보
		out.println("x-auth-token: " + authToken
				+ " x-api-serial : " + apiSerial);
		// 공백라인
		out.println();
		
        // 응답 내용
		String line = null;
		while((line = in.readLine()) != null) {
			System.out.println(line);
		}
		
		in.close();
		out.close();
		socket.close();
		//sendTestAirAndNoti(null, "");
	}
}
