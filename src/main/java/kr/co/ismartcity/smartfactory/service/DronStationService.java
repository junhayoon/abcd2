package kr.co.ismartcity.smartfactory.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;

import kr.co.ismartcity.smartfactory.entity.DronStation;
import kr.co.ismartcity.smartfactory.repository.DronStationRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@ConfigurationProperties
public class DronStationService {

	@Autowired
	DronStationRepository dronStationRepository;

	public void addDronStation(DronStation dronStation) {		
		dronStationRepository.save(dronStation);
	}
}
