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
import kr.co.ismartcity.smartfactory.entity.Workplace;
import kr.co.ismartcity.smartfactory.model.FacilityStatus;
import kr.co.ismartcity.smartfactory.service.FacilityService;
import kr.co.ismartcity.smartfactory.service.MessageSourceService;
import kr.co.ismartcity.smartfactory.service.UserService;
import kr.co.ismartcity.smartfactory.service.WorkplaceService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Data
@RestController
@EnableConfigurationProperties
public class WorkplaceController {
	
	@Autowired
	WorkplaceService workplaceService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	MessageSourceService messageSourceService;
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/workplace/paging")
	public Page<Workplace> getWorkplaceEx(Principal principal,
										@RequestParam("size") int size, 
										@RequestParam("page") int page,
										@RequestParam(required=false, value="orders") List<Sort.Order> orders) {		
		//log.debug(String.format("getFacilityEx() 1... ^^ principal(%s) size(%d) page(%d) enabled(%b) orders(%s)", principal, size, page, enabled, orders));

		Page<Workplace> list = null;
		
		if(principal != null) {
			if (size < 1)
				size = 50;
			if (page < 0)
				page = 1;
			if (orders == null) {
				orders = new ArrayList<Sort.Order>();
				orders.add(new Sort.Order(Sort.Direction.ASC, "id"));
				
			}

			PageRequest pageRequest = PageRequest.of(page, size, Sort.by(orders));


			list =  workplaceService.getAllWorkplace(pageRequest);
		
		}
		
		//log.debug(String.format("getFacilityEx() end... Page(%s)", list));
		
		return list;
	}
	
	@PreAuthorize("isAuthenticated()")
	@PutMapping("/api/workplace")
	public void updateWorkplace(Principal principal, @RequestBody Workplace workplace, HttpServletResponse response) {
		//log.debug(String.format("updateFacility() 1... principal(%s) facility(%s)", principal, facility));
		
		if(principal != null && workplace != null) {
			workplace.setUpdateUser(userService.findUserByUsername(principal.getName()));
			int ret = workplaceService.updateWorkplace(workplace);
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
	@PostMapping("/api/workplace")
	public void createWorkplace(Principal principal, @RequestBody Workplace workplace, HttpServletResponse response) {
		//log.debug(String.format("createFacility() 1... principal(%s) facility(%s)", principal, facility));
		
		if(principal != null && workplace != null) {
			workplace.setCreateUser(userService.findUserByUsername(principal.getName()));
			workplace.setUpdateUser(userService.findUserByUsername(principal.getName()));
			int ret = workplaceService.addWorkplace(workplace);
			
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
	@DeleteMapping(value = "/api/workplace/{workplaceId}")
	public void deleteWorkplace(@PathVariable Long workplaceId, HttpServletResponse response) {
		int ret = workplaceService.removeWorkplace(workplaceId);
		if(ret != 0) {
			try {
				if(ret == -1) {
					response.sendError(ret, messageSourceService.getMessage("error.database.notfound"));
				} else {
					response.sendError(ret, messageSourceService.getMessage("error.request.fail"));
				}
			} catch (Exception e) {
				e.printStackTrace();
				response.setStatus(ret);
			}
		}
	}
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/AirSensorFilter")
	public List<Workplace>  airSenosorFilter(Principal principal, HttpServletResponse response) {
		if(principal != null) {
			return workplaceService.getAirSensorFilter();
		}
		return null;
	}
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/AirCleanerFilter")
	public List<Workplace>  airCleanerFilter(Principal principal, HttpServletResponse response) {
		if(principal != null) {
			return workplaceService.getAirCleanerFilter();
		}
		return null;
	}
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/FireSensorFilter")
	public List<Workplace>  fireSensorFilter(Principal principal, HttpServletResponse response) {
		if(principal != null) {
			return workplaceService.getFireSensorFilter();
		}
		return null;
	}
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/GasSensorFilter")
	public List<Workplace>  gasSensorFilter(Principal principal, HttpServletResponse response) {
		if(principal != null) {
			return workplaceService.getGasSensorFilter();
		}
		return null;
	}

}
