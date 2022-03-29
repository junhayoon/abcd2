package kr.co.ismartcity.smartfactory.controller;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.ismartcity.smartfactory.entity.FreeSetLine;
import kr.co.ismartcity.smartfactory.service.FreeSetLineService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
@RestController
@EnableConfigurationProperties
public class FreeSetLineController {

	@Autowired
	FreeSetLineService freeSetLineService;
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/freeSetInfo")
	public List<FreeSetLine> getFreeSetInfo(Principal principal, @RequestParam(required=true, value="freeSetNo") String freeSetNo,
																 @RequestParam(required=true, value="freeSetArea") String freeSetArea, 
																 HttpServletResponse response) {
		if(principal != null) {
			return freeSetLineService.getAllFreeSetLine(freeSetNo, freeSetArea);
		}
		return null;
	}
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/freeSetInfoGrade")
	public List<FreeSetLine> getFreeSetInfoGroup(Principal principal, @RequestParam(required=true, value="freeSetNo") String freeSetNo,
			@RequestParam(required=true, value="freeSetArea") String freeSetArea, 
			HttpServletResponse response) {
		if(principal != null) {
			return freeSetLineService.getAllFreeSetLineGroup(freeSetNo, freeSetArea);
		}
		return null;
	}
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/mapFreeSetInfo")
	public List<FreeSetLine> getMapFreeSetInfo(Principal principal, HttpServletResponse response) {
		if(principal != null) {
			return freeSetLineService.getAllMapFreeSet();
		}
		return null;
	}
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/trafficFreeSetInfo")
	public List<FreeSetLine> getTrafficFreeSetInfo(Principal principal, HttpServletResponse response) {
		if(principal != null) {
			return freeSetLineService.findMapTrafficFreeSet();
		}
		return null;
	}
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/trafficGroupFreeSetInfo")
	public List<FreeSetLine> getTrafficGroupFreeSetInfo(Principal principal, HttpServletResponse response) {
		if(principal != null) {
			return freeSetLineService.findMapTrafficGroupFreeSet();
		}
		return null;
	}
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/CCTVGradeGroupInfo")
	public List<FreeSetLine> getfindFreeSetGradeGroup(Principal principal, @RequestParam(required=true, value="freeSetNo") String freeSetNo,
																 HttpServletResponse response) {
		if(principal != null) {
			return freeSetLineService.getfindFreeSetGradeGroup(freeSetNo);
		}
		return null;
	}
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/CCTVGradeInfo")
	public List<FreeSetLine> getfindFreeSetGrade(Principal principal, @RequestParam(required=true, value="freeSetNo") String freeSetNo,
																 HttpServletResponse response) {
		if(principal != null) {
			return freeSetLineService.getfindFreeSetGrade(freeSetNo);
		}
		return null;
	}
}
