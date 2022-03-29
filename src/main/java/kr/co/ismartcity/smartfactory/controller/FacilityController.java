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
import kr.co.ismartcity.smartfactory.model.FacilityStatus;
import kr.co.ismartcity.smartfactory.service.FacilityService;
import kr.co.ismartcity.smartfactory.service.MessageSourceService;
import kr.co.ismartcity.smartfactory.service.UserService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Data
@RestController
@EnableConfigurationProperties
public class FacilityController {
	
	@Autowired
	FacilityService facilityService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	MessageSourceService messageSourceService;
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/facility/basic/symbols")
	public List<String> getStaticSymbols(Principal principal) {
		if(principal != null) {
			return facilityService.getStaticSymbolList();
		}
		return null;
	}
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/facility/custom/symbols")
	public List<String> getUploadSymbols(Principal principal) {
		if(principal != null) {
			return facilityService.getUploadSymbolList();
		}
		return null;
	}
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/facility/symbol/{fileName:.+}")
	public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, @RequestParam(required=false, value="removable") String removable) {
		int isRemovable = 0;
		if(removable != null) {
			isRemovable = Integer.valueOf(removable);
		}
		Resource resource = facilityService.loadFileAsResource(fileName, isRemovable);
		
		return ResponseEntity.ok().contentType(MediaType.parseMediaType("application/octet-stream"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);		
	}
	
	@PreAuthorize("isAuthenticated()")
	@PostMapping("/api/facility/symbol")
    public List<String> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
		List<String> fileNames = new ArrayList<String>();
		if(files != null) {
			for(MultipartFile file : files) {
				String filename = facilityService.saveFile(file);
				if(filename != null) {
					fileNames.add(filename);
				}
			}
		}
		return fileNames;
    }
	
	@PreAuthorize("isAuthenticated()")
	@DeleteMapping(value = "/api/facility/symbol/{fileName}")
	public String deleteFile(@PathVariable String fileName) {
		return facilityService.deleteFile(fileName);
	}
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/facility/symbol/status/{fileName}")
	public ResponseEntity<Resource> downloadFacilityStatusFile(@PathVariable String fileName) {
		Resource resource = facilityService.loadFacilityStatusFileAsResource(fileName);
		
		return ResponseEntity.ok().contentType(MediaType.parseMediaType("application/octet-stream"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);		
	}

	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/facility/category")
	public List<FacilityCategory> getCagetory(Principal principal, @RequestParam(required=false, value="enabled") String enabled) {
		if(principal != null) {
			if(enabled != null) {
				return facilityService.getCategorysByEnabled(Boolean.parseBoolean(enabled));
			} else {
				return facilityService.getAllCategorys();
			}
		}
		return null;
	}
	
	@PreAuthorize("isAuthenticated()")
	@PostMapping("/api/facility/category")
	public void createCagetory(Principal principal, @RequestBody FacilityCategory facilityCategory) {
		if(principal != null && facilityCategory != null) {
			facilityCategory.setCreateUser(userService.findUserByUsername(principal.getName()));
			facilityCategory.setUpdateUser(userService.findUserByUsername(principal.getName()));
			facilityService.addCategory(facilityCategory);
		}
	}
	
	@PreAuthorize("isAuthenticated()")
	@PutMapping("/api/facility/category")
	public void updateCagetory(Principal principal, @RequestBody FacilityCategory facilityCategory) {
		//log.debug(String.format("updateCategory() 1... principal(%s) facilityCategory(%s)", principal, facilityCategory));
		
		if(principal != null && facilityCategory != null) {
			facilityCategory.setUpdateUser(userService.findUserByUsername(principal.getName()));
			facilityService.updateCategory(facilityCategory);
		}
	}
	
	@PreAuthorize("isAuthenticated()")
	@DeleteMapping(value = "/api/facility/category/{categoryCcode}")
	public void deleteFacilityCategory(@PathVariable String categoryCcode, HttpServletResponse response) {
		int ret = facilityService.removeCategory(categoryCcode);
		if(ret != 0) {
			try {
				if(ret == -1) {
					response.sendError(ret, messageSourceService.getMessage("error.database.notfound"));
				} else if(ret == -2) {
					response.sendError(ret, messageSourceService.getMessage("error.database.hasChildren"));
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
	@GetMapping("/api/facility/status")
	public List<HashMap<String, String>> getStatus(Principal principal) {
		if(principal != null) {
			List<HashMap<String, String>> status = new ArrayList<HashMap<String, String>>();
			List<FacilityStatus> facilityStatus = new ArrayList<FacilityStatus>(Arrays.asList(FacilityStatus.values()));
			facilityStatus.forEach(s -> {
				String code = s.name();
				String name = messageSourceService.getMessage(s);
				
				HashMap<String, String> m = new HashMap<String, String>();
				m.put("value", code);
				m.put("label", name);
				
				status.add(m);
			});
			return status;
		}
		return null;
	}
	
	@PreAuthorize("isAuthenticated()")
	@PostMapping("/api/facility")
	public void createFacility(Principal principal, @RequestBody Facility facility, HttpServletResponse response) {
		//log.debug(String.format("createFacility() 1... principal(%s) facility(%s)", principal, facility));
		
		if(principal != null && facility != null) {
			facility.setCreateUser(userService.findUserByUsername(principal.getName()));
			facility.setUpdateUser(userService.findUserByUsername(principal.getName()));
			int ret = facilityService.addFacility(facility);
			
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
	@PutMapping("/api/facility")
	public void updateFacility(Principal principal, @RequestBody Facility facility, HttpServletResponse response) {
		//log.debug(String.format("updateFacility() 1... principal(%s) facility(%s)", principal, facility));
		
		if(principal != null && facility != null) {
			facility.setUpdateUser(userService.findUserByUsername(principal.getName()));
			int ret = facilityService.updateFacility(facility);
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
	@DeleteMapping(value = "/api/facility/{facilityFcode}")
	public void deleteFacility(@PathVariable String facilityFcode, HttpServletResponse response) {
		int ret = facilityService.removeFacility(facilityFcode);
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
	@GetMapping("/api/facility")
	public List<Facility> getFacility(Principal principal, @RequestParam(required=false, value="enabled") boolean enabled) {
		if(principal != null) {
			if(enabled) {
				return facilityService.getEnabledFacilitys();
			} else {
				return facilityService.getAllFacility();
			}
		}
		return null;
	}
	
	//paging 구현
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/facility/paging")
	public Page<Facility> getFacilityEx(Principal principal,
										@RequestParam(required=false, value="enabled", defaultValue="true") boolean enabled,
										@RequestParam("size") int size, 
										@RequestParam("page") int page,
										@RequestParam(required=false, value="orders") List<Sort.Order> orders) {		
		//log.debug(String.format("getFacilityEx() 1... ^^ principal(%s) size(%d) page(%d) enabled(%b) orders(%s)", principal, size, page, enabled, orders));

		Page<Facility> list = null;
		
		if(principal != null) {
			if (size < 1)
				size = 50;
			if (page < 0)
				page = 1;
			if (orders == null) {
				orders = new ArrayList<Sort.Order>();
				orders.add(new Sort.Order(Sort.Direction.ASC, "facilityCategory"));
				orders.add(new Sort.Order(Sort.Direction.ASC, "facilityName"));
			}

			PageRequest pageRequest = PageRequest.of(page, size, Sort.by(orders));

			if(enabled) {
				list =  facilityService.getEnabledFacilitys(pageRequest);
			} else {
				list =  facilityService.getAllFacility(pageRequest);
			}
		}
		
		//log.debug(String.format("getFacilityEx() end... Page(%s)", list));
		
		return list;
	}
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/facility/airsensor")
	public List<Facility> getAirSensorFacility(Principal principal, @RequestParam(required=false, value="enabled") boolean enabled) {
		if(principal != null) {
			if(enabled) {
				return facilityService.getEnabledAirSensorFacility();
			} else {
				return facilityService.getAirSensorFacility();
			}
		}
		return null;
	}
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/facility/notification")
	public List<Facility> getNotiFacility(Principal principal, @RequestParam(required=false, value="enabled", defaultValue="true") boolean enabled) {
		if(principal != null) {
			if(enabled) {
				return facilityService.getEnabledNotiFacility();
			} else {
				return facilityService.getNotiFacility();
			}
		}
		return null;
	}
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/HavingFacility")
	public List<Facility>  havingFacility(Principal principal, @RequestParam(required=true, value="workplaceId") Long id, HttpServletResponse response) {
		if(principal != null) {
			return facilityService.getHavingFacility(id);
		}
		return null;
	}
}
