package kr.co.ismartcity.smartfactory.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.ismartcity.smartfactory.entity.Facility;
import kr.co.ismartcity.smartfactory.repository.FacilityRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class TestController {

	@Autowired
	public FacilityRepository facilityRepository;
	

//	@GetMapping("/api/test")
//	public List<String> test() {
//		
//		List<String> list = facilityRepository.findFacilitySensorMap();
//		System.out.println("MAp : " + list.size());
//		
//		return list;
//		
//	}


}
