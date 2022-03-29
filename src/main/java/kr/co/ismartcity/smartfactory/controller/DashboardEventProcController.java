package kr.co.ismartcity.smartfactory.controller;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.ismartcity.smartfactory.entity.Code;
import kr.co.ismartcity.smartfactory.entity.CodeMaster;
import kr.co.ismartcity.smartfactory.entity.DashboardEvent;
import kr.co.ismartcity.smartfactory.entity.DashboardEventProc;
import kr.co.ismartcity.smartfactory.entity.Facility;
import kr.co.ismartcity.smartfactory.service.DashboardEventProcService;
import kr.co.ismartcity.smartfactory.service.DashboardEventService;
import kr.co.ismartcity.smartfactory.service.FacilityService;
import kr.co.ismartcity.smartfactory.service.MessageSourceService;
import kr.co.ismartcity.smartfactory.service.UserService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class DashboardEventProcController {

	@Autowired
	DashboardEventService dashboardEventService;
	
	@Autowired
	DashboardEventProcService dashboardEventProcService;

	@Autowired
	UserService userService;

	@Autowired
	MessageSourceService messageSourceService;

	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/getDashboardEventProc")
	public List<DashboardEventProc> getDashboardEventProc(Long proc_id) {			
		return dashboardEventProcService.getDashboardEventProc(proc_id);
	}

	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/insertDashboardEventProc")
	public DashboardEventProc insert(Principal principal, @RequestParam String event_id, @RequestParam String process_cd, @RequestParam String procDesc) {

		DashboardEventProc dashboardEventProc = new DashboardEventProc();
		DashboardEvent ev = dashboardEventService.findById(event_id);
		Code process = new Code();
		CodeMaster master = new CodeMaster();
		master.setCd("0005");
		process.setCodeMaster(master);
		process.setCd(process_cd);
				
		dashboardEventProc.setEvent(ev);
		dashboardEventProc.setProcess(process);
		dashboardEventProc.setProcDesc(procDesc);
		dashboardEventProc.setCreateUser(userService.findUserByUsername(principal.getName()));
		
		return dashboardEventProcService.insert(dashboardEventProc);
	}

}
