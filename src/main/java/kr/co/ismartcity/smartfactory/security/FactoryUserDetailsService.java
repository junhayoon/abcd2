package kr.co.ismartcity.smartfactory.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import kr.co.ismartcity.smartfactory.entity.User;
import kr.co.ismartcity.smartfactory.service.UserService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FactoryUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UserService userServie;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userServie.findEnabledUserByUsername(username);
		if(user == null){
            throw new UsernameNotFoundException("UserName "+username+" not found");
        }
		return new FactoryUserDetails(user);
	}

}
