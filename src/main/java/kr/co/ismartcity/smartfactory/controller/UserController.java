package kr.co.ismartcity.smartfactory.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.ismartcity.smartfactory.config.ServiceLinkUrlConfig;
import kr.co.ismartcity.smartfactory.config.VmsConfig;
import kr.co.ismartcity.smartfactory.entity.User;
import kr.co.ismartcity.smartfactory.entity.UserRole;
import kr.co.ismartcity.smartfactory.service.MessageSourceService;
import kr.co.ismartcity.smartfactory.service.UserService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class UserController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	MessageSourceService messageSourceService;
	
	@Autowired
	ServiceLinkUrlConfig linkUrl;
	
	@Autowired
	VmsConfig vmsconfig;

	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/myinfo")
	public User getMyInfo(Principal principal) {		
		if(principal != null) {
			return userService.findUserByUsername(principal.getName());
		}
		return null;
	}

	@PreAuthorize("isAuthenticated()")
	@PutMapping("/api/myinfo")
	public void updateMyInfo(Principal principal, @RequestBody User user, HttpServletResponse response) {
		//log.debug(String.format("updateMyInfo(l) 1... principal(%s) user(%s)", principal, user));
		
		int nRows = -1;
        try
        {
        	nRows = (int)userService.updateMyInfo(user);        	
        	if (nRows >= 1)
        	{
        		// success...
        	}
        	else
        	{
	            if (nRows == 0)
	            {
	                response.sendError(nRows, messageSourceService.getMessage("error.database.update"));
	            }
	            else if (nRows == -1)
	            {
	                response.sendError(nRows, messageSourceService.getMessage("error.request.invalid"));
	            }
	            else
	            {
	                response.sendError(nRows, messageSourceService.getMessage("error.request.unknown"));
	            }
        	}
        }
        catch (Exception e)
        {
            e.printStackTrace();
            response.setStatus(nRows);
        }        
	}
	
	@PreAuthorize("isAuthenticated()")
	@PostMapping("/api/mypassword")
	public String checkPassword(Principal principal, @RequestBody String password) {
		if(principal != null) {
			String username = principal.getName();
			User user = userService.findEnabledUserByUsername(username);
			if(user != null) {
				if(userService.passwordMatches(password, user.getPassword())) {
					return "OK";
				} else {
					return messageSourceService.getMessage("error.password.mismatch");
				}
			}
		}
		
		return messageSourceService.getMessage("error.request.invalid");
	}
	
	@Secured("ROLE_ADMIN")
	@GetMapping("/api/userinfo")
	public User getUserInfo(Principal principal) {
		if(principal != null) {
			return userService.findUserByUsername(principal.getName());
		}
		return null;
	}
	
	@Secured("ROLE_ADMIN")
	@GetMapping("/api/users")
	public Map<String, Object> getUsers(Principal principal, @RequestParam(required=false, value="page") int page, @RequestParam(required=false, value="perPage") int perPage) {
		if(principal != null) {
			Map<String, Object> result = new HashMap<String, Object>();
			
			Map<String, Object> paginationObj = new HashMap<String, Object>();
			paginationObj.put("page", page);
			paginationObj.put("totalCount", userService.countAll());
			
			Map<String, Object> dataObj = new HashMap<String, Object>();
			dataObj.put("contents", userService.findAll());
			dataObj.put("pagination", paginationObj);
			
			result.put("result", true);
			result.put("data", dataObj);
			return result;
		}
		return null;
	}
	
	@Secured("ROLE_ADMIN")
	@PostMapping("/api/users")
	public void createUsers(Principal principal, @RequestBody User user) {
		if(principal != null && user != null) {
			userService.addUser(user);
		}
	}
	
	@Secured("ROLE_ADMIN")
	@PutMapping("/api/users")
	public void updateUsers(Principal principal, @RequestBody User user) {
		if(principal != null && user != null) {
			userService.updateUser(user);
		}
	}
	
	@Secured("ROLE_ADMIN")
	@DeleteMapping("/api/users/{id:.+}")
	public void updateUsers(Principal principal, @PathVariable Long id) {
		userService.deleteUser(id);
	}

	@Secured("ROLE_ADMIN")
	@GetMapping("/api/roles")
	public Iterable<UserRole> getRoles(Principal principal) {
		if(principal != null) {
			return userService.getRoles();
		}
		return null;
	}
	
	@Secured("ROLE_ADMIN")
	@GetMapping("/api/linkurl")
	public ServiceLinkUrlConfig getLinkUrl(Principal principal) {
		if(principal != null) {
			return linkUrl;
		}
		return null;
	}	
	
	@Secured("ROLE_ADMIN")
	@GetMapping("/api/vmsconfig")
	public VmsConfig getVmsConfig(Principal principal) {
		if(principal != null) {
			return vmsconfig;
		}
		return null;
	}
}
