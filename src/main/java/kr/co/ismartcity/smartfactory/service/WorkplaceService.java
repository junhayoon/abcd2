package kr.co.ismartcity.smartfactory.service;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import kr.co.ismartcity.smartfactory.entity.Facility;
import kr.co.ismartcity.smartfactory.entity.FacilityCategory;
import kr.co.ismartcity.smartfactory.entity.QFacility;
import kr.co.ismartcity.smartfactory.entity.QFacilityCategory;
import kr.co.ismartcity.smartfactory.entity.Workplace;
import kr.co.ismartcity.smartfactory.model.FacilityStatus;
import kr.co.ismartcity.smartfactory.repository.FacilityCategoryRepository;
import kr.co.ismartcity.smartfactory.repository.FacilityRepository;
import kr.co.ismartcity.smartfactory.repository.WorkplaceRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@ConfigurationProperties
public class WorkplaceService {

	final static public String defaultSymbolPath 			= "static/symbol";
	final static public String defaultFacilityStatusPath 	= "static/symbol/facility";
	
	@Value("${facility.filepath.symbol}")
	public String symbolUploadPath;
	
	@Autowired
	public FacilityCategoryRepository facilityCategoryRepository;
	
	@Autowired
	public FacilityRepository facilityRepository;
	
	@Autowired
	public WorkplaceRepository workplaceRepository;
	
	@Autowired
	public JPAQueryFactory jpaQueryFactory;
	
	public int addWorkplace(Workplace workplace) {
		
		int nRet = 0;

		Workplace entity = workplaceRepository.save(workplace);
		
		return nRet;
	}
	

	
	public int updateWorkplace(Workplace workplace) {
		int nRet = 0;

		Workplace oldWorkplace = null;
		Optional<Workplace> optional = workplaceRepository.findById(workplace.getId());

		Workplace entity = workplaceRepository.save(workplace);

		
		return nRet;
	}	
	
	
	public int removeWorkplace(Long workplaceId) {
		Optional<Workplace> optional = workplaceRepository.findById(workplaceId);
		if(optional.isPresent()) {
			try {
				workplaceRepository.delete(optional.get());
				return 0;
			} catch(Exception e) {
				return -2;
			}
		}
		return -1;
	}
	
	public List<Workplace> getAllWorkplace() {
		return (List<Workplace>)workplaceRepository.findAll(); 
	}
	
	public List<Workplace> getAirSensorFilter() {
		return (List<Workplace>)workplaceRepository.getAirSensorFilter(); 
	}
	public List<Workplace> getAirCleanerFilter() {
		return (List<Workplace>)workplaceRepository.getAirCleanerFilter(); 
	}
	public List<Workplace> getFireSensorFilter() {
		return (List<Workplace>)workplaceRepository.getFireSensorFilter(); 
	}
	public List<Workplace> getGasSensorFilter() {
		return (List<Workplace>)workplaceRepository.getGasSensorFilter(); 
	}

	public Page<Workplace> getAllWorkplace(Pageable pageable) {
		return workplaceRepository.findAll(pageable);
	}
	
	public Page<Workplace> getAirFilter(Pageable pageable) {
		return workplaceRepository.findAir(pageable); 
	}
	
	

	
}