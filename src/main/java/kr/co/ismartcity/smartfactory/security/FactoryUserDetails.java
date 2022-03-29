package kr.co.ismartcity.smartfactory.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import kr.co.ismartcity.smartfactory.entity.User;
import kr.co.ismartcity.smartfactory.entity.UserRole;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
public class FactoryUserDetails implements UserDetails {

	private static final long serialVersionUID = 1L;
	
	private Collection<? extends GrantedAuthority> authorities;
	
	private String password;
	
	private String username; 
	
	public FactoryUserDetails(User user) { 
		this.username = user.getUsername(); 
		this.password = user.getPassword(); 
		this.authorities = translate(user.getRoles()); 
	} 
	
	private Collection<? extends GrantedAuthority> translate(Set<UserRole> roles) { 
		List<GrantedAuthority> authorities = new ArrayList<>(); 
		for (UserRole role : roles) { 
			String name = role.getRoleId().toUpperCase(); 
			if (!name.startsWith("ROLE_")) { 
				name = "ROLE_" + name; 
			} 
			authorities.add(new SimpleGrantedAuthority(name)); 
		} 
		return authorities; 
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
