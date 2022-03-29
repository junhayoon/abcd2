package kr.co.ismartcity.smartfactory.controller;

import java.security.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.ismartcity.smartfactory.entity.PollutionStandard;
import kr.co.ismartcity.smartfactory.service.PollutionStandardService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Data
@RestController
@EnableConfigurationProperties
public class PollutionStandardController {

	@Autowired
	PollutionStandardService pollutionStandardService;
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/pollutionStandard")
	public PollutionStandard getPollutionStandardInfo(Principal principal) {
		
		PollutionStandard pollutionStandard = null;;
		try {
			pollutionStandard = pollutionStandardService.getPollutionStandardInfo();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return pollutionStandard;
	}
	
}
