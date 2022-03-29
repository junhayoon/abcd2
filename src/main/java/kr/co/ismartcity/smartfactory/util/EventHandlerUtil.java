package kr.co.ismartcity.smartfactory.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.co.ismartcity.smartfactory.entity.Facility;
import kr.co.ismartcity.smartfactory.mapper.code.CodeMapper;
import kr.co.ismartcity.smartfactory.mapper.event.EventMapper;
import kr.co.ismartcity.smartfactory.model.code.CodeVo;
import kr.co.ismartcity.smartfactory.model.event.DashboardEventVo;
import kr.co.ismartcity.smartfactory.model.event.EventInfoVo;
import kr.co.ismartcity.smartfactory.model.event.EventPlaceVo;
import lombok.extern.slf4j.Slf4j;

/**
 * 이벤트 핸들러 Utility 
 * @author 인천 스마트 시티
 * 
 * 작성일				작성자		작성내용
 * -------------------------------------------------------------------------------
 * 2022-02-25		이한얼		최초작성
 *
 *
 *
 *
 *
 */

@Slf4j
@Component
public class EventHandlerUtil {
	
	public static Map<String, CodeVo> CODE_MAP = new HashMap<>();
	private static ArrayList<CodeVo> CODE_LIST = new ArrayList<>();
	
	private static CodeMapper codeMapper;
	private static EventMapper eventMapper;
	private static ObjectMapper objectMapper;
	
	@Autowired
	private CodeMapper awCodeMapper;
	
	@Autowired
	private EventMapper awEventMapper;
	
	@Autowired
	private ObjectMapper awObjectMapper;
	
	@PostConstruct
	private void init() {
		// ObjectMapper 활용을 위한 Autowired 주입
		objectMapper = this.awObjectMapper;

		// Mapper 활용을 위한 Autowired 주입
		codeMapper = this.awCodeMapper;
		eventMapper = this.awEventMapper;
		
		// 컴포넌트 등록시점에 코드 데이터 조회
		CODE_LIST = codeMapper.getCodeAll();
		if(CODE_LIST.size() > 0) {
			for(CodeVo codeVo : CODE_LIST) {
				String cd = codeVo.getCd();
				if(!CODE_MAP.containsKey(cd)) {
					CODE_MAP.put(cd, codeVo);
				}
			}
		}
	}
	
	@SuppressWarnings("unchecked")
	public static void analysisEvent(String sid, Object dataObj) {
		
		if(sid != null && dataObj != null) {
			
			try {
				
				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
				Map<String, Object> dataMap = objectMapper.convertValue(dataObj, Map.class);
				Map<String, Object> facility = (Map<String, Object>) dataMap.get("facility");
				Map<String, Object> facilityCategory = (Map<String, Object>) facility.get("facilityCategory");
				Map<String, Object> workplace = (Map<String, Object>) facility.get("workplace");
				
				String facCategoryNm = (String) facilityCategory.get("categoryName");
				String workplaceNm = (String) workplace.get("workplaceName");
				
				// 센서 구분 값을 통한 코드 정보 조회
				CodeVo codeVo = codeMapper.getCodeByCodeNm(sid);
				
				// 해당 센서의 코드가 존재할 경우
				if(codeVo != null) {
					
					log.debug("CODE VI NOT NULL");
					
					// 발생된 이벤트를 담기 위한 Map 생성
					ArrayList<EventInfoVo> eventList = new ArrayList<>();
					
					// 이벤트 구분 코드 확인
					String eventGbCode = codeVo.getCd();
					// 이벤트 구분(센서구분) 코드 이름 조회
					String eventGbCodeNm = codeVo.getCdNm();
					
					// 화재 감시 카메라 데이터일 경우
					if("FIRE_CAMERA".equals(eventGbCodeNm)) {
						String eventType = (String) dataMap.get("eventType");
						log.debug("EVENT TYPE : {}", eventType);
					}
					else {
						// 이벤트 데이터 Map 에 저장된 이벤트 조회
						Iterator<String> mapKeys = dataMap.keySet().iterator();
						while(mapKeys.hasNext()) {
							// 이벤트 키(이벤트 코드) 값 조회
							String dataField = mapKeys.next();
							for(CodeVo vo : CODE_LIST) {
								String codeNm = vo.getCdNm();
								if(dataField.equals(codeNm)) {
									String eventCode = vo.getCd();
									Double dataValue = Double.parseDouble(dataMap.get(dataField).toString());
									EventInfoVo eventInfoVo = eventMapper.getWarningEventInfo(eventGbCode, eventCode, dataValue);
									if(eventInfoVo != null) {
										String eventMsg = eventInfoVo.getEventMsg();
										// 이벤트 메시지 포맷부분에 센서 데이터 값 삽입(치환)
										String convertedMsg = String.format(eventMsg, dataValue);
										// 치환된 이벤트 메시지 저장
										eventInfoVo.setEventMsg(convertedMsg);
										eventList.add(eventInfoVo);
									}
								}
							}
						}
					}
					
					// 발생된 이벤트가 존재 할 경우
					if(eventList.size() > 0) {
						String occuredTime = LocalDateTime.now().format(formatter);
						// 발생된 이벤트 목록 for 문 조회
						for(EventInfoVo eventVo : eventList) {
							
							insertDashboardEvent("E", eventVo, facility, occuredTime);
							
							// 이벤트 팝업 노출 대상 여부 확인
							if("y".equals(eventVo.getPopupYn().toLowerCase())) {
								
								String fCode = (String) facility.get("fcode");
								EventPlaceVo eventPlaceVo = eventMapper.getEventPlaceByFcode(fCode);
								
								Map<String, Object> popupMap = new HashMap<>();
								popupMap.put("place", eventPlaceVo);
								popupMap.put("event_msg", eventVo.getEventMsg());
								popupMap.put("event_dt", occuredTime);
							
								// 데이터 소켓으로 발송
								WebSocketUtil.sendMessage("event", popupMap);
								
							}
						
						}
						
					}
					
				}
				
			} catch (Exception e) {
				
				e.printStackTrace();
			
			}

		}
		
	}
	
	
	/**
	 * 발생 이벤트 저장 함수
	 * @param evtCode: 이벤트 코드
	 * @param catgryCode: 이벤트 카테고리 코드
	 * @param gradeCode: 이벤트 등급 코드
	 * @param message: 이벤트 메시지
	 * @param facilityMap: 시설물 정보 데이터
	 */
	private static void insertDashboardEvent(String warningGrade, EventInfoVo eventInfoVo, Map<String, Object> facilityMap, String occuredTime) {
		
		Facility facility = objectMapper.convertValue(facilityMap, Facility.class);
		
		Integer eventTriggerSeq = eventInfoVo.getSeq();
		String eventCategoryCd = eventInfoVo.getEventGb();
		String eventGradeCd = eventInfoVo.getEventGradeCd();
		String eventCodeMaster = "0002";
		String categoryCodeMasterCd = CODE_MAP.get(eventCategoryCd).getCodeMasterCd();
		String gradeCodeMasterCd = CODE_MAP.get(eventGradeCd).getCodeMasterCd();
		String message = eventInfoVo.getEventMsg();
		
		/*
		log.debug("EVENT CODE : {}", warningGrade);
		log.debug("CATEGORY CODE : {}", eventCategoryCd);
		log.debug("GRADE CODE : {}", eventGradeCd);
		log.debug("FACILITY CODE : {}", facility.getFcode());
		log.debug("WORKPLACE NAME : {}", facility.getWorkplace().getWorkplaceName());
		*/
		
		DashboardEventVo dashboardEventVo = new DashboardEventVo();
		dashboardEventVo.setEventCd(warningGrade);
		dashboardEventVo.setEventTriggerSeq(eventTriggerSeq);
		dashboardEventVo.setCategoryCd(eventCategoryCd);
		dashboardEventVo.setGradeCd(eventGradeCd);
		dashboardEventVo.setEventCodeMasterCd(eventCodeMaster);
		dashboardEventVo.setCategoryCodeMasterCd(categoryCodeMasterCd);
		dashboardEventVo.setGradeCodeMasterCd(gradeCodeMasterCd);
		dashboardEventVo.setChecking(false);
		dashboardEventVo.setConfirmMessage(message);
		dashboardEventVo.setFacilityFcode(facility.getFcode());
		dashboardEventVo.setDashFacility(facility.getWorkplace().getWorkplaceName());
		dashboardEventVo.setCreateDateTime(occuredTime);
		
		eventMapper.insertDashboardEvent(dashboardEventVo);
		
	}
	
}
