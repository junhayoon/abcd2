package kr.co.ismartcity.smartfactory.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.co.ismartcity.smartfactory.entity.Facility;
import kr.co.ismartcity.smartfactory.entity.FacilityCategory;
import kr.co.ismartcity.smartfactory.entity.FreeSetLine;
import kr.co.ismartcity.smartfactory.entity.VmsTokens;
import kr.co.ismartcity.smartfactory.entity.Workplace;
import kr.co.ismartcity.smartfactory.model.FacilityStatus;
import kr.co.ismartcity.smartfactory.service.FacilityService;
import kr.co.ismartcity.smartfactory.service.MessageSourceService;
import kr.co.ismartcity.smartfactory.service.UserService;
import kr.co.ismartcity.smartfactory.service.VmsTokensService;
import kr.co.ismartcity.smartfactory.service.WorkplaceService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Data
@RestController
@EnableConfigurationProperties
public class VmsTokensController {
	
	@Autowired
	VmsTokensService vmsTokensService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	MessageSourceService messageSourceService;

	
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/vmsTokens")
	public VmsTokens getVmsTokens(Principal principal, @RequestParam String vmsId) {
		if(principal != null) {
			return vmsTokensService.getVmsTokens(vmsId);
		}
		return null;
	}
	
	
	
	@PreAuthorize("isAuthenticated()")
	@PostMapping("/api/vmsTokens")
	public void updateVmsTokens(Principal principal, @RequestBody VmsTokens vmsTokens) {
		
		if(principal != null && vmsTokens != null) {
			vmsTokens.setUpdateUser(userService.findUserByUsername(principal.getName()));
			int ret = vmsTokensService.addVmsTokens(vmsTokens);

			}
		}
	


}
