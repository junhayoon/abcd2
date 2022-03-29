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
import kr.co.ismartcity.smartfactory.entity.TrafficLineTmp;
import kr.co.ismartcity.smartfactory.entity.Workplace;
import kr.co.ismartcity.smartfactory.service.FreeSetLineService;
import kr.co.ismartcity.smartfactory.service.MessageSourceService;
import kr.co.ismartcity.smartfactory.service.TrafficLineService;
import kr.co.ismartcity.smartfactory.service.TrafficLineTmpService;
import kr.co.ismartcity.smartfactory.service.UserService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
@RestController
@EnableConfigurationProperties
public class TrafficLineTmpController {

	@Autowired
	TrafficLineTmpService trafficLineTmpService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	MessageSourceService messageSourceService;
	
	@PreAuthorize("isAuthenticated()")
	@PostMapping("/api/drawLineTmp")
	public void createDrawlineTmp(Principal principal, @RequestBody TrafficLineTmp trafficLineTmp, HttpServletResponse response) {
		//log.debug(String.format("createFacility() 1... principal(%s) facility(%s)", principal, facility));
		
		if(principal != null && trafficLineTmp != null) {

			int ret = trafficLineTmpService.addDrawLineTmp(trafficLineTmp);
			
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
	@GetMapping("/api/trafficLineTmp")
	public List<TrafficLineTmp> getTrafficFreeSetInfo(Principal principal, HttpServletResponse response) {
		if(principal != null) {
			return trafficLineTmpService.findTrafficTmp();
		}
		return null;
	}
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/trafficLineGroupTmp")
	public List<TrafficLineTmp> getTrafficGroupFreeSetInfo(Principal principal, HttpServletResponse response) {
		if(principal != null) {
			return trafficLineTmpService.findTrafficGroupTmp();
		}
		return null;
	}
}
