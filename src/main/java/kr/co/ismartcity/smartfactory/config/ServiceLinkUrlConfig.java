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
public class ServiceLinkUrlConfig {
	
	@JsonProperty("vmsServerUrl")
	@Value("${serviceLinkUrl.vmsServerUrl}")
	public String vmsServerUrl;
	
	@JsonProperty("droneCSUrl")
	@Value("${serviceLinkUrl.droneCSUrl}")
	public String droneCSUrl;

}
