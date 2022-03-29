package kr.co.ismartcity.smartfactory.service;

import java.lang.reflect.Array;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

import org.apache.poi.hssf.eventusermodel.EventWorkbookBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.datetime.DateFormatter;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.thoughtworks.xstream.converters.time.LocalDateConverter;

import kr.co.ismartcity.smartfactory.entity.AirSensorWorkplace;
import kr.co.ismartcity.smartfactory.entity.Code;
import kr.co.ismartcity.smartfactory.entity.CodeMaster;
import kr.co.ismartcity.smartfactory.entity.DashboardEvent;
import kr.co.ismartcity.smartfactory.entity.DeviceEvent;
import kr.co.ismartcity.smartfactory.entity.ElectronicWorkplace;
import kr.co.ismartcity.smartfactory.entity.Facility;
import kr.co.ismartcity.smartfactory.entity.GasSensorWorkplace;
import kr.co.ismartcity.smartfactory.mapper.event.EventMapper;
import kr.co.ismartcity.smartfactory.mapper.workflow.WorkflowMapper;
import kr.co.ismartcity.smartfactory.model.WorkflowVo;
import kr.co.ismartcity.smartfactory.model.event.DashboardEventVo;
import kr.co.ismartcity.smartfactory.model.event.EventTriggerInfoVo;
import kr.co.ismartcity.smartfactory.repository.DashboardEventRepository;
import kr.co.ismartcity.smartfactory.repository.FacilityRepository;
import lombok.extern.slf4j.Slf4j;

/**
 * 위험 이벤트 감지 서비스
 * @author Incheon Smartcity
 * 
 * 작성일			작성자		내용
 * ------------------------------------------------------------------
 * 2021.01.19	이한얼		최초작성
 *
 */

@Slf4j
@Service
public class EventHandleService {
	
	@Autowired
	private WebSocketService webSocketService;
	
	@Autowired
	private EventMapper eventMapper;
	
	@Autowired
	private WorkflowMapper workflowMapper;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@SuppressWarnings("unchecked")
	public void analysisEvent(String sensorType, Object dataObj) {
		
		if(sensorType != null && dataObj != null) {
			
			try {
				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
				Map<String, Object> dataMap = objectMapper.convertValue(dataObj, Map.class);
				Map<String, Object> facility = (Map<String, Object>) dataMap.get("facility");
				Map<String, Object> facilityCategory = (Map<String, Object>) facility.get("facilityCategory");
				Map<String, Object> workplace = (Map<String, Object>) facility.get("workplace");
				Map<String, Object> resMap = new HashMap<>();
				
				String fCode = (String) facility.get("fcode");
				String facCategoryNm = (String) facilityCategory.get("categoryName");
				String workplaceNm = (String) workplace.get("workplaceName");
				String eventCd = null;
				String eventGrade = "CT";
				String eventKeys = null;
				String eventNm = null;
				List<String> eventMsgArr = new ArrayList<>();
				
				switch(sensorType) {
					case "AIR_SENSOR":
						eventCd = "AS";
						eventMsgArr = getEventTriggerByValue(eventCd, "co2,tvoc", dataMap);
						break;
					case "GAS_SENSOR":
						eventCd = "GS";
						eventKeys = "mesure,gas_mesure";
						eventMsgArr = getGasErrorStatus(dataMap);
						if(eventMsgArr.size() <= 0) {
							eventMsgArr = getEventTriggerByValue("GS", "mesure,gas_mesure", dataMap);
						}
						break;
					case "ELECTRONIC_BREAKER":
						eventCd = "FS";
						eventMsgArr = getElectronicEventMessage(dataMap);
						if(eventMsgArr.size() <= 0) {
							eventMsgArr = getEventTriggerByValue(eventCd, "igo,igr", dataMap);
						} else {
						}
						break;
					case "FIRE_CAMERA": 
						break;
				}
				
				if(eventMsgArr.size() > 0) {
					
					// 이벤트 문자 리스트를 콤마 구분자 문자열로 변경
					String eventMsg = String.join(",", eventMsgArr);
					
					// 이벤트 발생 시간 저장
					String event_datetime = LocalDateTime.now().format(formatter);
					
					// 이벤트 로그 추가
					insertDashboardEvent("E", eventCd, eventGrade, eventMsg, facility, event_datetime);
					
					// 이벤트 팝업을 위한 데이터 생성
					resMap.put("sensor_type", sensorType);
					resMap.put("sensor_type_str", facCategoryNm);
					resMap.put("facility_name", workplaceNm);
					resMap.put("facility", facility);
					resMap.put("workplace", workplace);
					resMap.put("event_msg", eventMsg);
					resMap.put("event_dt", event_datetime);
				
					// 소켓을 통한 통합관제페이지로 이벤트 데이터 전송
					webSocketService.sendMessage("event", resMap);
				
				}
				
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	
	/**
	 * 뉴액/누출 센서 에러 이벤트 감지 함수
	 * @param Map dataMap: 모비우스로 부터 전달 받은 데이터
	 * @return
	 */
	private List<String> getGasErrorStatus(Map<String, Object> dataMap) {
		Integer errorStatus = (Integer) dataMap.get("error_status");
		Integer mesure = (Integer) dataMap.get("mesure");
		Integer gasErrorStatus = (Integer) dataMap.get("gas_error_status");
		Float gasMesure = (Float) dataMap.get("gas_mesure");
		List<String> gasErrEventMsgArr = new ArrayList<>();
		
		// 누액센서 이벤트가 존재할 경우
		if(errorStatus > 0) {
		
			// 에러 메세지 형식
			String errMsgStr = "누액센서 %s 에러 발생";
			// 경고 설정값 
			Integer highSetData = (Integer) dataMap.get("high_set_data");
			
			// WET ERROR
			if(errorStatus == 1) {
				if(highSetData < mesure) {
					errMsgStr = String.format(errMsgStr, "누액") + "(" + mesure +")";
				} else {
					errMsgStr = String.format(errMsgStr, "침수", null);
				}
			}
			// LEAK ERROR
			else if(errorStatus == 2) {
				errMsgStr = String.format(errMsgStr, "누액") + "(" + mesure +")";
			}
			// OPEN ERROR
			else if(errorStatus == 3) {
				errMsgStr = String.format(errMsgStr, "단선", mesure);
			}
			
			gasErrEventMsgArr.add(errMsgStr);
		
		}
		
		// 가스 누출 센서 이벤트가 존재할 경우
		if(gasErrorStatus > 0) {
	
			// 에러이벤트 메시지 형식
			String errMsgStr = "누출센서 %s 에러 발생";
			
			// 1차 경고 ERROR
			if(gasErrorStatus == 1) {
				errMsgStr = String.format(errMsgStr, "1차 에러") + "(" + gasMesure +")";
			}
			// 2차 경고 ERROR
			else if(gasErrorStatus == 2) {
				errMsgStr = String.format(errMsgStr, "2차 에러") + "(" + gasMesure +")";
			}
			// OPEN ERROR
			else if(gasErrorStatus == 3) {
				errMsgStr = String.format(errMsgStr, "단선");
			}
			
			gasErrEventMsgArr.add(errMsgStr);
		
		}
		
		return gasErrEventMsgArr;
	
	}
	
	/**
	 * 전기 이벤트 내 이벤트 감지 함수
	 * @param Map dataMap: 모비우스로 부터 전달 받은 데이터
	 * @return
	 */
	private List<String> getElectronicEventMessage(Map<String, Object> dataMap) {
		List<String> electricEventMsgArr = new ArrayList<>();
		Integer eventAlert = (Integer) dataMap.get("eventAlert");
		Integer leakAlert = (Integer) dataMap.get("leakAlert");
		
		// 이벤트 및 과전류 이벤트가 존재할 경우
		if(eventAlert > 0) {
			String eventBinaryStr = String.format("%08d", Integer.parseInt(Integer.toBinaryString(eventAlert)));
			StringBuffer sb = new StringBuffer(eventBinaryStr);
			String reverseStr = sb.reverse().toString();
			String[] eventStrArr = reverseStr.split("");
			Double ampair = (Double) dataMap.get("a");
			String overflowEvtMsg = "과전류 %s 경보 (%d)";
			
			if("1".equals(eventStrArr[0])) {
				String evtMsg = "과전류 1차 경보 (" + ampair + "A)" ;
				electricEventMsgArr.add(evtMsg);
			}
			if("1".equals(eventStrArr[1])) {
				String evtMsg = "과전류 2차 경보 (" + ampair + "A)" ;
				electricEventMsgArr.add(evtMsg);
			}
			/*
			if("1".equals(eventStrArr[3])) {
				evtMsg = "내부에러";
				log.debug(evtMsg);
				evtMsgArr.add(evtMsg);
			}
			if("1".equals(eventStrArr[4])) {
				evtMsg = "확장센서에러 경보";
				log.debug(evtMsg);
				evtMsgArr.add(evtMsg);
			}
			*/
		}
		
		// 누전전류 이벤트가 존재 시
		if(leakAlert > 0) {
			String leakBinaryStr = String.format("%08d", Integer.parseInt(Integer.toBinaryString(leakAlert)));
			StringBuffer sb = new StringBuffer(leakBinaryStr);
			String reverseStr = sb.reverse().toString();
			String[] leakStrArr = reverseStr.split("");
			Double igr = Math.round((Double) dataMap.get("igr") * 100) / 100.0;
			Double igo = Math.round((Double) dataMap.get("igo") * 100) / 100.0;
			
			if("1".equals(leakStrArr[0])) {
				String evtMsg = "누설전류(IGR) 1차 경보 (" + igr + "mA)";
				electricEventMsgArr.add(evtMsg);
			}
			if("1".equals(leakStrArr[1])) {
				String evtMsg = "누설전류(IGR) 2차 경보 (" + igr + "mA)";
				electricEventMsgArr.add(evtMsg);
			}
			if("1".equals(leakStrArr[4])) {
				String evtMsg = "누설전류(IGO) 1차 경보 (" + igo + "mA)";
				electricEventMsgArr.add(evtMsg);
			}
			if("1".equals(leakStrArr[5])) {
				String evtMsg = "누설전류(IGO) 2차 경보 (" + igo+ "mA)";;
				electricEventMsgArr.add(evtMsg);
			}
		}
		
		return electricEventMsgArr;
	}

	/**
	 * 기본 설정된 값을 통한 이벤트 검증 함수
	 * @param String eventCd: 이벤트 코드
	 * @param String eventKeys: 콤마 구분자로 이뤄진 이벤트 키 값 문자열
	 * @return List<String> eventMsgArr: 이벤트 메시지 LIST
	 */
	@SuppressWarnings("unchecked")
	private List<String> getEventTriggerByValue(String eventCd, String eventKeys, Map<String, Object> dataMap) {
		List<String> eventMsgArr = new ArrayList<>();
		Map<String, Object> facility = (Map<String, Object>) dataMap.get("facility");
		if(eventKeys != null) {
			String[] keys = eventKeys.split(",");
			for(String key : keys) {
				EventTriggerInfoVo eventTrgInfoVo = new EventTriggerInfoVo();
				Double value = Double.parseDouble(dataMap.get(key).toString());
				eventTrgInfoVo.setEventCd(eventCd);
				eventTrgInfoVo.setEventKey(key);
				eventTrgInfoVo.setValue(value);
				eventTrgInfoVo = eventMapper.getEventTriggerByValue(eventTrgInfoVo);
				if(eventTrgInfoVo != null) {
					String convEventMsg = String.format(eventTrgInfoVo.getEventMsg(), value);
					String eventGrade = eventTrgInfoVo.getEventGrade();
					eventMsgArr.add(convEventMsg);
				}
			}
		}
		return eventMsgArr;
	}
	
	private EventTriggerInfoVo getEventTriggerInfo(EventTriggerInfoVo eventTriggerInfoVo) {
		return null;
	}
	
	/**
	 * 해당 이벤트에 대한 워크플로우 조회 함수
	 * @param triggerVo: 이벤트 감지 데이터 객체
	 * @return
	 */
	private void callWorkflowProcess(Integer eventTriggerSeq) {
		
		List<WorkflowVo> workflows = workflowMapper.getEventWorkflow(eventTriggerSeq);
		
	}

	/**
	 * 발생 이벤트 저장 함수
	 * @param evtCode: 이벤트 코드
	 * @param catgryCode: 이벤트 카테고리 코드
	 * @param gradeCode: 이벤트 등급 코드
	 * @param message: 이벤트 메시지
	 * @param facilityMap: 시설물 정보 데이터
	 */
	@SuppressWarnings("unchecked")
	private void insertDashboardEvent(String evtCode, String catgryCode, String gradeCode, String message, Map<String, Object> facilityMap, String event_datetime) {
		
		Facility facility = objectMapper.convertValue(facilityMap, Facility.class);
		
		/*
		log.debug("EVENT CODE : {}", evtCode);
		log.debug("CATEGORY CODE : {}", catgryCode);
		log.debug("GRADE CODE : {}", gradeCode);
		log.debug("FACILITY MAP DATA : " + facilityMap);
		log.debug("FACILITY CODE : {}", facility.getFcode());
		log.debug("WORKPLACE NAME : {}", facility.getWorkplace().getWorkplaceName());
		*/
		
		DashboardEventVo dashboardEventVo = new DashboardEventVo();
		dashboardEventVo.setEventCd(evtCode);
		dashboardEventVo.setCategoryCd(catgryCode);
		dashboardEventVo.setGradeCd(gradeCode);
		dashboardEventVo.setEventCodeMasterCd("0002");
		dashboardEventVo.setCategoryCodeMasterCd("0001");
		dashboardEventVo.setGradeCodeMasterCd("0003");
		dashboardEventVo.setChecking(false);
		dashboardEventVo.setConfirmMessage(message);
		dashboardEventVo.setFacilityFcode(facility.getFcode());
		dashboardEventVo.setDashFacility(facility.getWorkplace().getWorkplaceName());
		dashboardEventVo.setCreateDateTime(event_datetime);
		
		eventMapper.insertDashboardEvent(dashboardEventVo);
		
	}
	
}
