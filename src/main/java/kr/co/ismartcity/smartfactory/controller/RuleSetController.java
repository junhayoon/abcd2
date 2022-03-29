package kr.co.ismartcity.smartfactory.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import kr.co.ismartcity.smartfactory.entity.RuleLevel;
import kr.co.ismartcity.smartfactory.entity.RuleSet;
import kr.co.ismartcity.smartfactory.repository.RuleLevelRepository;
import kr.co.ismartcity.smartfactory.service.MessageSourceService;
import kr.co.ismartcity.smartfactory.service.RuleSetService;
import kr.co.ismartcity.smartfactory.service.UserService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
@RestController
@EnableConfigurationProperties
public class RuleSetController {

	@Autowired
	MessageSourceService messageSourceService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	RuleSetService ruleSetService;
	
	@Autowired
	RuleLevelRepository ruleLevelRepository;
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/ruleset")
	public List<RuleSet> getRuleSets(Principal principal) {
		return ruleSetService.getRuleSets();
	}
	
	@PreAuthorize("isAuthenticated()")
	@PostMapping("/api/ruleset")
	public void createRuleSet(Principal principal, @RequestBody RuleSet ruleSet) {
		if(principal != null && ruleSet != null) {
			ruleSet.setCreateUser(userService.findUserByUsername(principal.getName()));
			ruleSet.setUpdateUser(userService.findUserByUsername(principal.getName()));
			ruleSetService.addRuleSet(ruleSet);
		}
	}
	
	@PreAuthorize("isAuthenticated()")
	@PutMapping("/api/ruleset")
	public void updateRuleSet(Principal principal, @RequestBody RuleSet ruleSet) {
		if(principal != null && ruleSet != null) {
			if(ruleSet.getId() <= 0) {
				ruleSet.setCreateUser(userService.findUserByUsername(principal.getName()));
			}
			ruleSet.setUpdateUser(userService.findUserByUsername(principal.getName()));
			ruleSetService.updateRuleSet(ruleSet);
		}
	}
	
	@PreAuthorize("isAuthenticated()")
	@DeleteMapping("/api/ruleset/{ruleId}")
	public void deleteRuleSet(Principal principal, @PathVariable String ruleId) {
		if(principal != null) {
			RuleSet ruleSet = ruleSetService.getRuleSetByRuleId(ruleId);
			if(ruleSet != null) {
				ruleSetService.deleteRuleSet(ruleSet);
			}
		}
	}
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/ruleset/level")
	public List<RuleLevel> getRuleSetLevels(Principal principal) {
		return (List<RuleLevel>) ruleLevelRepository.findAll();
	}
}
