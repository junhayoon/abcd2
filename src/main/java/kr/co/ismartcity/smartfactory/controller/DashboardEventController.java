package kr.co.ismartcity.smartfactory.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.ismartcity.smartfactory.entity.DashboardEvent;
import kr.co.ismartcity.smartfactory.entity.User;
import kr.co.ismartcity.smartfactory.entity.Workplace;
import kr.co.ismartcity.smartfactory.service.DashboardEventService;
import kr.co.ismartcity.smartfactory.service.FacilityService;
import kr.co.ismartcity.smartfactory.service.MessageSourceService;
import kr.co.ismartcity.smartfactory.service.UserService;
import kr.co.ismartcity.smartfactory.service.WorkplaceService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class DashboardEventController {
	@Autowired
	DashboardEventService dashboardEventService;
	@Autowired
	FacilityService facilityService;

	@Autowired
	UserService userService;

	@Autowired
	MessageSourceService messageSourceService;

	/*
	 * 대시보드 > 사업장안전 > 미처리 이벤트 
	 *
	 * @param 
	 * @return List<String>
	 */
	@GetMapping("/api/getUnsolvedEvents")
	public List<String> getUnsolvedEvents() {		
		return dashboardEventService.getUnsolvedEvents();		
	}

	/*
	 * 대시보드 > 사업장안전 > 실시간 장애 이벤트 
	 * info를 제외한 최신 장애이벤트 10개를 List<DashboardEvent> 형태로 반환한다.
	 *
	 * @param 
	 * @return List<DashboardEvent>
	 */
	@GetMapping("/api/getRecentDashboardEvents")
	public List<DashboardEvent> getRecentDashboardEvents() {			
		return dashboardEventService.getRecentDashboardEvents();
	}
	
	@GetMapping("/api/getTodayDashboardEvents")
	public List<DashboardEvent> getTodayDashboardEvents() {			
		return dashboardEventService.getTodayDashboardEvents();
	}
	
	/*
	 * 대시보드 > 사업장안전 > 월 누적 장애 발생 현황 
	 * 해당 월마다의 게이트웨이, 6종센서, 공기청정기, 화재감지센서, 유해물질누출센서를 카운트하여 List<DashboardEvent>로 반환한다.
	 *
	 * @param 
	 * @return List<DashboardEvent>
	 */
	@GetMapping("/api/getDashboardEventsByMonthAndCategory")
	public List<String> getDashboardEventCounterByMonth() {			
		return dashboardEventService.getDashboardEventCounterByMonth();
	}

	/*
	 * 사업장안전 > 사업장정보 > 실시간 장애 이벤트  
	 * 해당 사업장에 대한 최신 장애이벤트 10개를 info를 제외하여 List<DashboardEvent> 형태로 반환한다.
	 *
	 * @param String dash_facility 사업장명 
	 * @return List<DashboardEvent>
	 */
	@GetMapping("/api/getRecentDashboardEventsByWorkplaceName")
	public List<DashboardEvent> getRecentDashboardEventsByWorkplaceName(@RequestParam String dash_facility) {		
		return dashboardEventService.getRecentDashboardEventsByWorkplaceName(dash_facility);
	}

	/*
	 * 사업장안전 > 이벤트 현황 / 재난알림 
	 * event_cd E: 이벤트, A: 재난  
	 *
	 * @param String event_cd  
	 * @return List<DashboardEvent>
	 */
	@GetMapping("/api/getDashboardEventsByEventCd")
	public List<DashboardEvent> getDashboardEventsByEventCd(@RequestParam String event_cd) {		
 		return dashboardEventService.getDashboardEventsByEventCd(event_cd);
	}

	/*
	 * 사업장안전 > 이벤트 현황 / 재난알림 
	 * 확인 버튼 클릭시 확인자 컬럼 및 아이디, 시간 업데이트
	 * 처리현황 컬럼에 완료 표시 
	 *
	 * @param String id  
	 * @param String user_name  
	 * @param String user_id  
	 * @return DashboardEvent
	 */
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/updateDashboardEventChecking")
	public DashboardEvent updateDashboardEventChecking(Principal principal, @RequestParam String id, @RequestParam String confirm_message) {
		DashboardEvent dashboardEvent = new DashboardEvent();
		
		try {
			User user = userService.findUserByUsername(principal.getName());
			dashboardEventService.updateDashboardEventChecking(id, user.getName(), String.valueOf(user.getId()), confirm_message);
			dashboardEvent = dashboardEventService.findById(id);
		}catch(Exception e) {
            e.printStackTrace();
			messageSourceService.getMessage("error.database.update");
		}
		
		return dashboardEvent;
	}
}
