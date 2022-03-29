package kr.co.ismartcity.smartfactory.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;

import com.querydsl.jpa.impl.JPAQueryFactory;

import kr.co.ismartcity.smartfactory.entity.FacilityCategory;
import kr.co.ismartcity.smartfactory.entity.WeatherStation;
import kr.co.ismartcity.smartfactory.repository.FacilityRepository;
import kr.co.ismartcity.smartfactory.repository.WeatherStationRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@ConfigurationProperties
public class WeatherStationService {

	@Autowired
	public WeatherStationRepository weatherStationRepository;
	
	@Autowired
	public JPAQueryFactory jpaQueryFactory;

	public List<WeatherStation> getAllWeatherStations() {
		
		return (List<WeatherStation>)weatherStationRepository.findAll();
	}
}
