package kr.co.ismartcity.smartfactory.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.provider.approval.ApprovalStore;
import org.springframework.security.oauth2.provider.approval.JdbcApprovalStore;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JdbcTokenStore;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import kr.co.ismartcity.smartfactory.security.FactoryUserDetailsService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	@Qualifier("masterDataSource")
	private DataSource dataSource;

	@Autowired
	private FactoryUserDetailsService userDetailsService;
	
	@Bean
	public PasswordEncoder passwordEncoder() {
	    return new BCryptPasswordEncoder();
	}
 
    @Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    	auth.userDetailsService(userDetailsService)
    		.passwordEncoder(passwordEncoder());
	}
    
    @Override
	public void configure(WebSecurity web) {
    	web.ignoring().antMatchers("/resources/**").antMatchers("/static/**");
	}
 
    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	http
    		.csrf()
    			.disable()
    		.cors()
    			.disable()
        	.authorizeRequests()
        		.antMatchers("/introduce").permitAll()
        		.antMatchers("/service").permitAll()
        		.antMatchers("/wamp/**").permitAll()
        		.antMatchers("/error").permitAll()
        		.antMatchers("/cameraDataInpnr.wd").permitAll()
        		.anyRequest().authenticated()
            	.and()
            .formLogin()
            	.loginPage("/login")
            	.loginProcessingUrl("/login")
            	.permitAll()
            	.and()
            .logout()
            	.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
            	.permitAll();
    }
 
	@Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
 
    @Bean
	public JdbcTokenStore tokenStore() {
		return new JdbcTokenStore(dataSource);
	}
	
	@Bean
	@Autowired
	public ApprovalStore approvalStore(TokenStore tokenStore) throws Exception {
		return new JdbcApprovalStore(dataSource);
	}

}