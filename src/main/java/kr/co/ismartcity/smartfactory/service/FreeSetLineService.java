package kr.co.ismartcity.smartfactory.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;

import kr.co.ismartcity.smartfactory.entity.FreeSetLine;
import kr.co.ismartcity.smartfactory.repository.FreeSetLineRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@ConfigurationProperties
public class FreeSetLineService {

	@Autowired
	public FreeSetLineRepository freeSetLineRepository;
	
	public List<FreeSetLine> getAllFreeSetLine(String freeSetNo, String freeSetArea) {
		return (List<FreeSetLine>)freeSetLineRepository.findFreeSetLine(freeSetNo, freeSetArea);
	}
	
	public List<FreeSetLine> getAllFreeSetLineGroup(String freeSetNo, String freeSetArea) {
		return (List<FreeSetLine>)freeSetLineRepository.findFreeSetLineGroup(freeSetNo, freeSetArea);
	}
	
	public List<FreeSetLine> getAllMapFreeSet() {
		return (List<FreeSetLine>)freeSetLineRepository.findMapFreeSet();
	}
	
	public List<FreeSetLine> findMapTrafficFreeSet() {
		return (List<FreeSetLine>)freeSetLineRepository.findMapTrafficFreeSet();
	}
	
	public List<FreeSetLine> findMapTrafficGroupFreeSet() {
		return (List<FreeSetLine>)freeSetLineRepository.findMapTrafficGroupFreeSet();
	}
	
	public List<FreeSetLine> getfindFreeSetGradeGroup(String freeSetNo) {
		return (List<FreeSetLine>)freeSetLineRepository.findFreeSetGradeGroup(freeSetNo);
	}
	
	public List<FreeSetLine> getfindFreeSetGrade(String freeSetNo) {
		return (List<FreeSetLine>)freeSetLineRepository.findFreeSetGrade(freeSetNo);
	}
}
