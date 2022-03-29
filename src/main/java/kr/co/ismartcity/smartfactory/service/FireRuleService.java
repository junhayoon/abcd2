package kr.co.ismartcity.smartfactory.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.co.ismartcity.smartfactory.entity.QRuleLevel;
import kr.co.ismartcity.smartfactory.entity.RuleLevel;
import kr.co.ismartcity.smartfactory.repository.RuleLevelRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@ConfigurationProperties
public class FireRuleService {
	
	@Autowired
	private SimpMessagingTemplate messageTemplate;
	
	@Autowired
	private RuleLevelRepository ruleLevelRepository;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	private LocalDateTime lastTime = LocalDateTime.now();
	
	private Map<String, Map<String, Object>> ruleLevel = new HashMap<String, Map<String, Object>>();
	
	public Logger logger() {
		return log;
	}
	
	public Map<String, Map<String, Object>> getRuleLevel() {
		return ruleLevel;
	}
	
	public void notifyMessage(Map<String, Object> params) {
		try {
			params.forEach((key, obj) -> {
				if(obj instanceof LocalDateTime) {
					params.put(key, ((LocalDateTime) obj).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
				}
			});
			messageTemplate.convertAndSend("/w2c/notify", objectMapper.writeValueAsString(params));
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public void setLevel(String ruleId, String levelId, float value) {
		Optional<RuleLevel> options = ruleLevelRepository.findOne(QRuleLevel.ruleLevel.ruleId.eq(ruleId).and(QRuleLevel.ruleLevel.levelId.eq(levelId)));
		if(options.isPresent()) {
			RuleLevel u = options.get();
			if(u.getValue() != value) {
				u.setValue(value);
				ruleLevelRepository.save(u);
			}
		} else {
			RuleLevel n = new RuleLevel();
			n.setRuleId(ruleId);
			n.setLevelId(levelId);
			n.setValue(value);
			ruleLevelRepository.save(n);
		}		
	}
}
