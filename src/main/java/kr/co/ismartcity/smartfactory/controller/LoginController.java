package kr.co.ismartcity.smartfactory.controller;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mobile.device.site.SitePreference;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import kr.co.ismartcity.smartfactory.service.MessageSourceService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class LoginController {
	
	@Autowired
	MessageSourceService messageSourceService;

	
	@GetMapping(value = "/login")
	public String login(String error, String logout, String force, Model model, Principal principal, SitePreference sitePreference, HttpServletRequest request) {

		
		if(sitePreference == SitePreference.MOBILE && force == null) {
			return "redirect:/open/report";
		} else {
			if (principal != null) {
				String redirect_uri = request.getParameter("redirect_uri"); 
				if(redirect_uri == null) {
					redirect_uri = "/";
				}
				return "redirect:" + redirect_uri;
			}
			
			model.addAttribute("login.title", messageSourceService.getMessage("login.title"));
			model.addAttribute("main.title", messageSourceService.getMessage("main.title"));
			model.addAttribute("login.label.message", messageSourceService.getMessage("login.label.message"));
			if ( error != null ) {
				model.addAttribute("login.error.message", messageSourceService.getMessage("login.error.message"));
			}
			if ( logout != null ) {
				model.addAttribute("logout.success.message", messageSourceService.getMessage("logout.success.message"));
			}
			
			return "login";
		}
		
	}
	
}
