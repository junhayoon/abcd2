package kr.co.ismartcity.smartfactory.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;

import kr.co.ismartcity.smartfactory.entity.FreeSetLine;
import kr.co.ismartcity.smartfactory.entity.TrafficLine;
import kr.co.ismartcity.smartfactory.entity.TrafficLineTmp;
import kr.co.ismartcity.smartfactory.entity.Workplace;
import kr.co.ismartcity.smartfactory.repository.FreeSetLineRepository;
import kr.co.ismartcity.smartfactory.repository.TrafficLineRepository;
import kr.co.ismartcity.smartfactory.repository.TrafficLineTmpRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@ConfigurationProperties
public class TrafficLineTmpService {

	@Autowired
	public TrafficLineTmpRepository trafficLineTmpRepository;
	
	public int addDrawLineTmp(TrafficLineTmp trafficLineTmp) {
		
		int nRet = 0;

		TrafficLineTmp entity = trafficLineTmpRepository.save(trafficLineTmp);
		
		return nRet;
	}
	
	public List<TrafficLineTmp> findTrafficTmp() {
		return (List<TrafficLineTmp>)trafficLineTmpRepository.findTrafficTmp();
	}
	
	public List<TrafficLineTmp> findTrafficGroupTmp() {
		return (List<TrafficLineTmp>)trafficLineTmpRepository.findTrafficGroupTmp();
	}
	
}
