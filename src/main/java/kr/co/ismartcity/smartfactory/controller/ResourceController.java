package kr.co.ismartcity.smartfactory.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.ismartcity.smartfactory.entity.User;
import kr.co.ismartcity.smartfactory.service.MessageSourceService;
import kr.co.ismartcity.smartfactory.service.UserService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class ResourceController {

	@Autowired
	UserService userService;
	
	@Autowired
	MessageSourceService messageSourceService;

	@GetMapping("/oapi/userinfo")
	public User user(Principal principal) {
		if(principal != null) {
			String username = null;
			if (principal instanceof OAuth2Authentication) {
				username = ((UserDetails)((OAuth2Authentication) principal).getPrincipal()).getUsername();
			} else if (principal instanceof UserDetails) {
				username = ((UserDetails)principal).getUsername();
			} else {
				username = principal.toString();
			}
			
			User user = userService.findUserByUsername(username);
			if(user != null) {
				return user;
			}
		}
		return null;
	}
	
}
