package kr.co.ismartcity.smartfactory.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@ConfigurationProperties
@PropertySource(value = {
		"classpath:/application.yaml",
		"classpath:/application-common.yaml", "classpath:/application-sub.yaml" //"classpath:/application-${spring.profiles.active}.yaml"
	})
public class VmsConfig {
	
	@JsonProperty("vmsRestIp")
	@Value("${vms.restip}")
	public String vmsRestIp;
	
	@JsonProperty("vmsUser")
	@Value("${vms.id}")
	public String vmsUser;
	
	@JsonProperty("vmsPw")
	@Value("${vms.pw}")
	public String vmsPw;
	
	@JsonProperty("vmsRestPort")
	@Value("${vms.restport}")
	public String vmsRestPort;
	
	@JsonProperty("mediaIp")
	@Value("${vms.streamip}")
	public String mediaIp;
	
	@JsonProperty("mediaPort")
	@Value("${vms.streamport}")
	public String mediaPort;
	
}
