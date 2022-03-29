package kr.co.ismartcity.smartIsland.repository;

import static org.junit.Assert.assertEquals;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import org.junit.After;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import kr.co.ismartcity.smartfactory.Application;
import kr.co.ismartcity.smartfactory.entity.User;
import kr.co.ismartcity.smartfactory.entity.UserRole;
import kr.co.ismartcity.smartfactory.repository.UserRepository;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@Slf4j
@Data
//@RunWith(JUnit4.class)
//@RunWith(SpringRunner.class) 
//@RunWith(JUnitPlatform.class)`
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@Service
@ExtendWith(SpringExtension.class)  // 
//@SpringBootTest
//@ContextConfiguration
@SpringBootTest(classes = Application.class)
@ActiveProfiles("dev")
public class UserRepositoryTest {
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Before
	void setUp() throws Exception {
	}

	@After
	void tearDown() throws Exception {
	}
	
//	@Test
//	public void testAdd() {
////		System.out.println("testAdd");
////	    assertEquals(42, Integer.sum(19, 23));
//	}
//	
//	@Test
//	void insertTest() {
//		//log.debug(String.format("insertTest() 1... userRepository(%s)", userRepository));
//		//String password = passwordEncoder.encode("test");
////		UserRole userRole = new UserRole("USER");
////		Set<UserRole> userRoleSet = new HashSet<UserRole>(Arrays.asList(userRole));
////		User user = new User("test", "test" , userRoleSet);
////
////		System.out.println(String.format("insertTest() 1... user(%s)", user.toString()));
//		
//		//assertNotNull(userRepository.save(user));
////        assertNotNull(userRepository.save(new User("test", 
////                passwordEncoder.encode("test"), 
////                Arrays.asList(new UserRole("USER")))));
//	}
//
//	@Test
//	void deleteTest() {
////		userRepository.delete(userRepository.findByUsername("test"));
////		assertNull(userRepository.findByUsername("test"));
//	}
}
