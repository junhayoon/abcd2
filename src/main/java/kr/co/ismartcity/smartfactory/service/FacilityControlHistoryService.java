package kr.co.ismartcity.smartfactory.service;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.querydsl.jpa.impl.JPAQueryFactory;

import kr.co.ismartcity.smartfactory.entity.Facility;
import kr.co.ismartcity.smartfactory.entity.FacilityControlHistory;
import kr.co.ismartcity.smartfactory.repository.FacilityControlHistoryRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FacilityControlHistoryService {

	@Autowired
	public FacilityControlHistoryRepository facilityControlHistoryRepository;

	@Autowired
	UserService userService;
	
	@Autowired
	public JPAQueryFactory jpaQueryFactory;
	
	public FacilityControlHistory addFacilityControlHistory(String principalName, Map<String, Object> map) {
    	
    	FacilityControlHistory facilityControlHistory = new FacilityControlHistory();
    	facilityControlHistory.setCreateUser(userService.findUserByUsername(principalName));
    	
    	Facility facility = new Facility();

    	facility.setFcode(((String) map.get("facility_fcode")).toString());
    	
    	facilityControlHistory.setFacility(facility);
    	facilityControlHistory.setControlType((String) map.get("controlType"));
    	facilityControlHistory.setAutoControlled((boolean) map.get("autoControlled"));
    	
    	log.debug("addFacilityControlHistory save:"+facilityControlHistory.toString());
    	
		return facilityControlHistoryRepository.save(facilityControlHistory);
	}
}