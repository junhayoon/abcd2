package kr.co.ismartcity.smartfactory.service;

import java.io.StringReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.annotation.PostConstruct;

import org.kie.api.KieServices;
import org.kie.api.builder.KieBuilder;
import org.kie.api.builder.KieFileSystem;
import org.kie.api.builder.KieModule;
import org.kie.api.builder.ReleaseId;
import org.kie.api.runtime.Globals;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;

import com.querydsl.core.types.dsl.BooleanExpression;

import kr.co.ismartcity.smartfactory.entity.QRuleSet;
import kr.co.ismartcity.smartfactory.entity.RuleSet;
import kr.co.ismartcity.smartfactory.repository.RuleSetRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@ConfigurationProperties
public class RuleSetService {
	
	@Value("${ruleset.path}")
	public String path;
	
	@Value("${ruleset.namespace}")
	public String namespace;
	
	@Autowired
	private RuleSetRepository ruleSetRepository;
	
	@Autowired
	private FireRuleService fireRuleService;
	
	private KieServices kieServices;
	
	private Map<String, KieContainer> kieContainers;
	
	@PostConstruct
    public void init() {
		kieServices = KieServices.Factory.get();
		
		kieContainers = new HashMap<String, KieContainer>();
		
		Iterable<RuleSet> rules = ruleSetRepository.findAll();
		for(RuleSet rule : rules) {
			
			if(rule.getRuleContent() != null && rule.getRuleContent().length() > 0) {
				ReleaseId releaseId = kieServices.newReleaseId(namespace, rule.getArtifactId(), rule.getVersion());
				KieFileSystem kfs = kieServices.newKieFileSystem();
				kfs.generateAndWritePomXML( releaseId );
				
				kfs.write(path + rule.getRuleId().replaceAll("/", "") + rule.getArtifactId() + ".drl", kieServices.getResources().newReaderResource(new StringReader(rule.getRuleContent())));
				
				KieBuilder kieBuilder = kieServices.newKieBuilder(kfs);
				kieBuilder.buildAll();
				KieModule kieModule = kieBuilder.getKieModule();
				
				KieContainer kieContainer = kieServices.newKieContainer(kieModule.getReleaseId());
				
				kieContainers.put(rule.getRuleId(), kieContainer);
			}
			
		}
	}
	
	public KieContainer getKieContainer(String ruleId) {
		return kieContainers.get(ruleId);
	}
	
	public KieContainer updateKieContainer(String ruleId, String artifactId, String version, String ruleContent) {
		KieContainer kieContainer = getKieContainer(ruleId);
		if(kieContainer != null) {
			
			ReleaseId releaseId = kieServices.newReleaseId(namespace, artifactId, version);
			KieFileSystem kfs = kieServices.newKieFileSystem();
			kfs.generateAndWritePomXML( releaseId );
			
			kfs.write(path + ruleId.replaceAll("/", "") + artifactId + ".drl", kieServices.getResources().newReaderResource(new StringReader(ruleContent)));
			
			KieBuilder kieBuilder = kieServices.newKieBuilder(kfs);
			kieBuilder.buildAll();
			
			kieContainer.updateToVersion(releaseId);
			
			return kieContainer;
		}
		
		return null;
	}
	
	public void addKieContainer(String ruleId, String artifactId, String version, String ruleContent) {
		ReleaseId releaseId = kieServices.newReleaseId(namespace, artifactId, version);
		KieFileSystem kfs = kieServices.newKieFileSystem();
		kfs.generateAndWritePomXML( releaseId );
		
		kfs.write(path + ruleId.replaceAll("/", "") + artifactId + ".drl", kieServices.getResources().newReaderResource(new StringReader(ruleContent)));
		
		KieBuilder kieBuilder = kieServices.newKieBuilder(kfs);
		kieBuilder.buildAll();
		KieModule kieModule = kieBuilder.getKieModule();
		
		KieContainer kieContainer = kieServices.newKieContainer(kieModule.getReleaseId());
		
		kieContainers.put(ruleId, kieContainer);
	}
	
	public void addRuleSet(RuleSet ruleSet) {
		ruleSetRepository.save(ruleSet);
		if(getKieContainer(ruleSet.getRuleId()) != null) {
			updateKieContainer(ruleSet.getRuleId(), ruleSet.getArtifactId(), ruleSet.getVersion(), ruleSet.getRuleContent());
		} else {
			addKieContainer(ruleSet.getRuleId(), ruleSet.getArtifactId(), ruleSet.getVersion(), ruleSet.getRuleContent());
		}
	}
	
	public void updateRuleSet(RuleSet ruleSet) {
		ruleSetRepository.save(ruleSet);		
		if(getKieContainer(ruleSet.getRuleId()) != null) {
			updateKieContainer(ruleSet.getRuleId(), ruleSet.getArtifactId(), ruleSet.getVersion(), ruleSet.getRuleContent());
		} else {
			addKieContainer(ruleSet.getRuleId(), ruleSet.getArtifactId(), ruleSet.getVersion(), ruleSet.getRuleContent());
		}
	}
	
	public void deleteRuleSet(RuleSet ruleSet) {
		ruleSetRepository.delete(ruleSet);
		kieContainers.remove(ruleSet.getRuleId());
	}
	
	public List<RuleSet> getRuleSets() {
		return (List<RuleSet>)ruleSetRepository.findAll();
	}
	
	public RuleSet getRuleSetByRuleId(String ruleId) {
		BooleanExpression booleanExpression = QRuleSet.ruleSet.ruleId.eq(ruleId);
		Optional<RuleSet> ruleSets = ruleSetRepository.findOne(booleanExpression);
		if(ruleSets.isPresent()) return ruleSets.get();
		return new RuleSet();
	}
	
	public void handleRuleSet(String mobiusId, Object...params) {
		KieContainer kieContainer = getKieContainer(mobiusId);
		if(kieContainer != null) {
			KieSession kieSession = kieContainer.newKieSession();
			kieSession.setGlobal("fireRuleService", fireRuleService);
			for(Object obj : params) {
				kieSession.insert(obj);
			}
			kieSession.fireAllRules();
	        kieSession.dispose();
		}
	}
}
