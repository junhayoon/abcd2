package kr.co.ismartcity.smartfactory.service;

import java.util.List;

import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import kr.co.ismartcity.smartfactory.entity.DashboardEvent;
import kr.co.ismartcity.smartfactory.repository.DashboardEventRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class DashboardEventService {

	@Autowired
	private DashboardEventRepository dashboardEventRepository;

	public List<String> getUnsolvedEvents() {
		return dashboardEventRepository.getUnsolvedEvents();
	}

	public List<DashboardEvent> getRecentDashboardEvents() {
		return dashboardEventRepository.getRecentDashboardEvents();
	}

	public List<DashboardEvent> getTodayDashboardEvents() {
		List<DashboardEvent> dashboardEventList = dashboardEventRepository.getTodayDashboardEvents();
		return dashboardEventList;
	}
	
	public List<String> getDashboardEventCounterByMonth() {
		return dashboardEventRepository.getDashboardEventCounterByMonth();
	}

	public List<DashboardEvent> getRecentDashboardEventsByWorkplaceName(String dash_facility) {
		return dashboardEventRepository.getRecentDashboardEventsByWorkplaceName(dash_facility);
	}

	public List<DashboardEvent> getDashboardEventsByEventCd(String event_cd) {
		return dashboardEventRepository.getDashboardEventsByEventCd(event_cd);
	}

	public void updateDashboardEventChecking(String id, String user_name, String user_id, String confirm_message) {
		dashboardEventRepository.updateDashboardEventChecking(id, user_name, user_id, confirm_message);
	}

	public DashboardEvent findById(String id) {
		return dashboardEventRepository.findById(id);
	}
}