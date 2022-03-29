package kr.co.ismartcity.smartfactory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.mobile.device.site.SitePreference;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.co.ismartcity.smartfactory.service.MessageSourceService;
import kr.co.ismartcity.smartfactory.service.MobiusService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Data
@Controller
@EnableConfigurationProperties
public class MainController {
	
	@Autowired
	MobiusService mobiusService;
	
	@Autowired
	MessageSourceService messageSourceService;
	
	@RequestMapping("/")
	public String mainPage(Model model, SitePreference sitePreference) {
		model.addAttribute("main.dialog.ok", messageSourceService.getMessage("main.dialog.ok"));
		model.addAttribute("main.dialog.cancel", messageSourceService.getMessage("main.dialog.cancel"));
		model.addAttribute("main.dialog.title", messageSourceService.getMessage("main.dialog.title"));
		
		model.addAttribute("main.title", messageSourceService.getMessage("main.title"));
		
		if(sitePreference == SitePreference.MOBILE) {
			return "mobile";
		} else {
			return "index";
		}
	}
	
	@RequestMapping("/introduce")
	public String introducePage(Model model) {
		model.addAttribute("main.title", messageSourceService.getMessage("main.title"));
		return "introduce";
	}
	
	@RequestMapping("/service")
	public String servicePage(Model model) {
		model.addAttribute("main.title", messageSourceService.getMessage("main.title"));
		return "service";
	}
}
