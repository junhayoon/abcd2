package kr.co.ismartcity.smartfactory.controller;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.ismartcity.smartfactory.entity.FreeSetLine;
import kr.co.ismartcity.smartfactory.entity.TrafficLine;
import kr.co.ismartcity.smartfactory.entity.Workplace;
import kr.co.ismartcity.smartfactory.service.FreeSetLineService;
import kr.co.ismartcity.smartfactory.service.MessageSourceService;
import kr.co.ismartcity.smartfactory.service.TrafficLineService;
import kr.co.ismartcity.smartfactory.service.UserService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
@RestController
@EnableConfigurationProperties
public class TrafficLineController {

	@Autowired
	TrafficLineService trafficLineService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	MessageSourceService messageSourceService;
	
	@PreAuthorize("isAuthenticated()")
	@PostMapping("/api/drawLine")
	public void createDrawline(Principal principal, @RequestBody TrafficLine trafficLine, HttpServletResponse response) {
		//log.debug(String.format("createFacility() 1... principal(%s) facility(%s)", principal, facility));
		
		if(principal != null && trafficLine != null) {
			trafficLine.setCreateUser(userService.findUserByUsername(principal.getName()));
			trafficLine.setUpdateUser(userService.findUserByUsername(principal.getName()));
			int ret = trafficLineService.addDrawLine(trafficLine);
			
			//log.debug(String.format("createFacility() 2... ret(%d)", ret));
			
			if(ret != 0) {
				try {
					if(ret == -3) {
						response.sendError(ret, messageSourceService.getMessage("error.database.duplicate"));
					} else if(ret == -2) {
						response.sendError(ret, messageSourceService.getMessage("error.unreal.fail"));
					} else {
						response.sendError(ret, messageSourceService.getMessage("error.request.fail"));
					}
				} catch (Exception e) {
					e.printStackTrace();
					response.setStatus(ret);
				}
			}
		}
	}
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/trafficLine")
	public List<TrafficLine> getTrafficFreeSetInfo(Principal principal, HttpServletResponse response) {
		if(principal != null) {
			return trafficLineService.findTraffic();
		}
		return null;
	}
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/trafficLineGroup")
	public List<TrafficLine> getTrafficGroupFreeSetInfo(Principal principal, HttpServletResponse response) {
		if(principal != null) {
			return trafficLineService.findTrafficGroup();
		}
		return null;
	}
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/trafficLineSpeed")
	public List<TrafficLine> getTrafficSpeed(Principal principal, HttpServletResponse response) {
		if(principal != null) {
			return trafficLineService.findTrafficSpeed();
		}
		return null;
	}
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/trafficLineSpeedGroup")
	public List<TrafficLine> getTrafficSpeedGroup(Principal principal, HttpServletResponse response) {
		if(principal != null) {
			return trafficLineService.findTrafficSpeedGroup();
		}
		return null;
	}
}
