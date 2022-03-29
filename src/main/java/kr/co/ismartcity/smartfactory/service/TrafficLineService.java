package kr.co.ismartcity.smartfactory.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;

import kr.co.ismartcity.smartfactory.entity.FreeSetLine;
import kr.co.ismartcity.smartfactory.entity.TrafficLine;
import kr.co.ismartcity.smartfactory.entity.Workplace;
import kr.co.ismartcity.smartfactory.repository.FreeSetLineRepository;
import kr.co.ismartcity.smartfactory.repository.TrafficLineRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@ConfigurationProperties
public class TrafficLineService {

	@Autowired
	public TrafficLineRepository trafficLineRepository;
	
	public int addDrawLine(TrafficLine trafficLine) {
		
		int nRet = 0;

		TrafficLine entity = trafficLineRepository.save(trafficLine);
		
		return nRet;
	}
	
	public List<TrafficLine> findTraffic() {
		return (List<TrafficLine>)trafficLineRepository.findTraffic();
	}
	
	public List<TrafficLine> findTrafficGroup() {
		return (List<TrafficLine>)trafficLineRepository.findTrafficGroup();
	}
	
	public List<TrafficLine> findTrafficSpeed() {
		return (List<TrafficLine>)trafficLineRepository.findTrafficSpeed();
	}
	
	public List<TrafficLine> findTrafficSpeedGroup() {
		return (List<TrafficLine>)trafficLineRepository.findTrafficSpeedGroup();
	}
	
}
