package kr.co.ismartcity.smartIsland.service;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import kr.co.ismartcity.smartfactory.Application;
import kr.co.ismartcity.smartfactory.service.MobiusService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import static org.junit.jupiter.api.Assertions.*;

@Slf4j
@Data
@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = Application.class)
@ActiveProfiles("dev")
class MobiusServiceTest {
	
	@Autowired
	MobiusService mobiusService;

	@BeforeEach
	void setUp() throws Exception {
	}

	@AfterEach
	void tearDown() throws Exception {
	}

//	@Test
//	void testCreateSubscribe() {
//		//assertTrue(mobiusService.createSubscribe("/sandbox") == 200);
//	}
//	
//	@Test
//	void testDeleteSubscribe() {
//		//assertTrue(mobiusService.deleteSubscribe("/sandbox") == 200);
//	}

}
