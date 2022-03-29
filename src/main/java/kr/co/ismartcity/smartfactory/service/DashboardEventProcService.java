package kr.co.ismartcity.smartfactory.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.ismartcity.smartfactory.entity.DashboardEventProc;
import kr.co.ismartcity.smartfactory.repository.DashboardEventProcRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class DashboardEventProcService {

	@Autowired
	private DashboardEventProcRepository dashboardEventProcRepository;

	public List<DashboardEventProc> getDashboardEventProc(Long proc_id) {
		
		return dashboardEventProcRepository.findByEventId(proc_id);
	}

	public DashboardEventProc insert(DashboardEventProc dashboardEventProc) {
		// TODO Auto-generated method stub
		return dashboardEventProcRepository.save(dashboardEventProc);
	}
}
