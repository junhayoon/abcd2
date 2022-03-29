package kr.co.ismartcity.smartfactory.config;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;

import kr.co.ismartcity.smartfactory.controller.WebSocketController;
import kr.co.ismartcity.smartfactory.entity.Facility;
import kr.co.ismartcity.smartfactory.entity.Notification;
import kr.co.ismartcity.smartfactory.service.NotificationService;
import kr.co.ismartcity.smartfactory.util.ClientUtilVa;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
@EnableWebSocketMessageBroker
@ConfigurationProperties
@PropertySource(value = {
	"classpath:/application.yaml",
	"classpath:/application-common.yaml", "classpath:/application-sub.yaml" //"classpath:/application-${spring.profiles.active}.yaml"
})
public class WebSocketClientConfig {
	@Value("${va-system.restIp}")
	private String vaRestIp;
	
	@Value("${va-system.restPort}")
	private int vaRestPort;
	
	@Value("${va-system.restId}")
	private String vaRestId;
	
	@Value("${va-system.restPw}")
	private String vaRestPw;
	
	@Value("${va-system.wsIp}")
	private String vaWsIp;
	
	@Value("${va-system.wsPort}")
	private int vaWsPort;
	
	@Autowired
	public NotificationService serviceNoti;
	
	@Autowired
	public WebSocketController webSocketController;
	
	@Autowired
	private ClientUtilVa clientVa;
	
	private int count;

	
	@Scheduled(fixedDelayString = "${va-system.keep-alive}")
	public void sendKeepAlive() {
		log.debug(String.format("sendKeepAlive() 1... count(%d) clientVa(%s)", count, clientVa));
		
		boolean bIsConnected = clientVa.isConnected();
		if (bIsConnected == false) {
			bIsConnected = clientVa.connect(vaRestIp, vaRestPort, vaRestId, vaRestPw, vaWsIp, vaWsPort);
		} else {				
			bIsConnected = clientVa.keepAlive();
			if (bIsConnected == false)
				clientVa.close();				
		}
		
		count++;
		
		log.debug(String.format("sendKeepAlive() end... "));
	}   
}
