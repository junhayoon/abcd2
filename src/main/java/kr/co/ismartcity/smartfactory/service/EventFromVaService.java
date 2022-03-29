package kr.co.ismartcity.smartfactory.service;

import java.util.HashMap;
import java.util.Locale;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.co.ismartcity.smartfactory.entity.AirSensorWorkplace;
import kr.co.ismartcity.smartfactory.entity.EventFromVa;
import kr.co.ismartcity.smartfactory.entity.Facility;
import kr.co.ismartcity.smartfactory.entity.Notification;
import kr.co.ismartcity.smartfactory.repository.EventFromVaRepository;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Service
@ConfigurationProperties
public class EventFromVaService {
	public static final int		EVENT_FROM_VA_TYPE_SMOKE		= 8;
	public static final int		EVENT_FROM_VA_TYPE_FLAME		= 9;
	
	public static final String	EVENT_FROM_VA_STAT_START		= "1";
	
	@Autowired
	private EventFromVaRepository eventFromVaRepository;
	
	@Autowired
	private FacilityService facilityService;
	
	@Autowired
	private NotificationService notiService;
	
	@Autowired
	MessageSourceService messageSourceService;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@Autowired
	private SimpMessagingTemplate messageTemplate;
	
	
	public EventFromVa addEventFromVa(EventFromVa evt) {
		return eventFromVaRepository.save(evt);
	}
	
	public void receiveEventsFromVa(JSONObject objEvt) {
		//log.debug(String.format("receiveEventsFromVa() 1... objEvt(%s)", objEvt));
		
		try {
			EventFromVa event = new EventFromVa(objEvt);
			String stEvtStat = event.getStat();
			int nEvtType = event.getType();
			
			if (EVENT_FROM_VA_STAT_START.equals(stEvtStat) && (nEvtType == EVENT_FROM_VA_TYPE_SMOKE || nEvtType == EVENT_FROM_VA_TYPE_FLAME)) {						
				addEventFromVa(event);				
				//sendFireEventToWs(event);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		//log.debug(String.format("receiveEventsFromVa() end... "));
	}
	
	private void sendFireEventToWs(EventFromVa event) {
		log.debug(String.format("sendFireEventToWs() 1... "));
		
		try {
			if (event != null) {
				Facility facil = facilityService.getFireCCTVFacility(event.getVaId());
				if (facil != null) {
					StringBuffer sbInfo = new StringBuffer();
					int nEvtType = event.getType();				
					if (nEvtType == EVENT_FROM_VA_TYPE_SMOKE) {										
						sbInfo.append(messageSourceService.getMessage("notification.fire.danger_smoke", Locale.KOREAN));
					} else {
						sbInfo.append(messageSourceService.getMessage("notification.fire.danger_flame", Locale.KOREAN));
					}
					sbInfo.append(" (시설물명: ").append(facil.getFacilityName()).append(")");
						
					log.debug(String.format("sendFireEventToWs() 3... sbInfo(%s)", sbInfo));
					
					Notification noti = new Notification();
					noti.setFacility(facil);
					noti.setFrom(noti.NOTI_FROM_VA_SYSTEM);
					noti.setLevel(noti.NOTI_LEVEL_DANGER);					// 0: success, 1: info, 2: warning, 3: danger
					noti.setInfo(sbInfo.toString());
					noti.setData(String.valueOf(nEvtType));
						
					log.debug(String.format("sendFireEventToWs() 4... noti(%s)", noti));
						
					noti = notiService.addNotification(noti);
		
					messageTemplate.convertAndSend("/w2c/notification", objectMapper.writeValueAsString(noti));	
				}		
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		log.debug(String.format("sendFireEventToWs() end..."));
	}

}
