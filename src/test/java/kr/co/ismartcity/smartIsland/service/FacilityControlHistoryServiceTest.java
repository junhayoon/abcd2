package kr.co.ismartcity.smartIsland.service;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import kr.co.ismartcity.smartfactory.Application;
import kr.co.ismartcity.smartfactory.entity.FacilityControlHistory;
import kr.co.ismartcity.smartfactory.service.FacilityControlHistoryService;
import kr.co.ismartcity.smartfactory.service.MobiusService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = Application.class)
@ActiveProfiles("dev")
public class FacilityControlHistoryServiceTest {

	@Autowired
	FacilityControlHistoryService facilityControlHistoryService;

//	@Test
//	void testRepository() {
////		FacilityControlHistory facilityControlHistory = new FacilityControlHistory();
////		System.out.println("facilityControlHistory:"+facilityControlHistory.toString());
////		System.out.println("facilityControlHistory.getCreate_date_time():"+facilityControlHistory.getCreate_date_time());
////		
////		Map<String, Object> map = new HashMap<String, Object>();
////		map.put("facility_id", 86636);
////		map.put("controlType", "001");
////		map.put("autoControlled", true);
////		
////		assertTrue(facilityControlHistoryService.addFacilityControlHistory("admin", map) != null);
//	}
}
