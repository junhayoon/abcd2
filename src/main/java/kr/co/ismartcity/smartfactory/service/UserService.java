package kr.co.ismartcity.smartfactory.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import kr.co.ismartcity.smartfactory.entity.QUser;
import kr.co.ismartcity.smartfactory.entity.User;
import kr.co.ismartcity.smartfactory.entity.UserRole;
import kr.co.ismartcity.smartfactory.repository.UserRepository;
import kr.co.ismartcity.smartfactory.repository.UserRoleRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserRoleRepository userRoleRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	public JPAQueryFactory jpaQueryFactory;
	
	public User addUser(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepository.save(user);
	}
	
	public User findEnabledUserByUsername(String username) {
		BooleanExpression booleanExpression = QUser.user.enabled.eq(true).and(QUser.user.username.eq(username));
		
		Optional<User> users = userRepository.findOne(booleanExpression);
		if(users.isPresent()) return users.get();
		return null;
	}
	
	public User findUserByUsername(String username) {
		BooleanExpression booleanExpression = QUser.user.username.eq(username);
		
		Optional<User> users = userRepository.findOne(booleanExpression);
		if(users.isPresent()) return users.get();
		return null;
	}
	
	public String encodePassword(String password) {
		return passwordEncoder.encode(password);
	}
	
	public boolean passwordMatches(CharSequence rawPassword, String encodedPassword) { 
		return passwordEncoder.matches(rawPassword, encodedPassword); 
	}
	
	public Iterable<User> findAll() {
		return userRepository.findAll();
	}
	
	public long countAll() {
		return userRepository.count();
	}
	
	public Iterable<UserRole> getRoles() {
		return userRoleRepository.findAll();
	}
	
	public long getRolesCount() {
		return userRoleRepository.count();
	}
	
	// insert new user or update user info by admin
	public void updateUser(User user) {
		//log.debug(String.format("updateUser(User) 1... user(%s)", user));
		
		if(user != null) {
			User existUser = null;
			Optional<User> o = userRepository.findById(user.getId());
			if(o.isPresent()) {
				existUser = o.get();	
			}
			
			if(user.getPassword() == null || user.getPassword().length() <= 0) {
				if(existUser != null) {
					user.setPassword(existUser.getPassword());
				}
			} else {
				user.setPassword(passwordEncoder.encode(user.getPassword()));
			}
			userRepository.save(user);
		}
	}
	
	// update my info or change my password
	public long updateMyInfo(User newInfo)
	{
		//log.debug(String.format("updateMyInfo(User) 1... newInfo(%s)", newInfo));
		
		long nRows = -1;
		try
		{			
			if (newInfo == null)
			{	
				nRows = -1;
			}
			else
			{
				QUser qUser =  QUser.user;
				String stPassword = newInfo.getPassword();
				if (stPassword == null || stPassword.trim().length() <= 0)
				{			
					nRows = jpaQueryFactory.update(qUser).where(qUser.id.eq(newInfo.getId()))
							.set(qUser.name, newInfo.getName())
							.set(qUser.email, newInfo.getEmail())
							.set(qUser.mobilePhone, newInfo.getMobilePhone())
							.execute();
				}
				else
				{
			        nRows = jpaQueryFactory.update(qUser).where(qUser.id.eq(newInfo.getId()))
			        		.set(qUser.password, encodePassword(stPassword))
			        		.execute();			
				}
			}				
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		
        return nRows;
	}
	
	public void deleteUser(Long id) {
		Optional<User> optional = userRepository.findById(id);
		if(optional != null && optional.isPresent()) {
			User user = optional.get();
			userRepository.delete(user);
		}
	}
		
	/*
	@PostConstruct
	private void setupDefaultUser() {
		if (userRepository.count() == 0) {
			userRepository.save(new User("admin", 
									passwordEncoder.encode("admin"), 
									Arrays.asList(new UserRole("USER"), new UserRole("ADMIN"))));
		}		
	}
	*/
}