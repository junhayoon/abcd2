package kr.co.ismartcity.smartfactory.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.RequestUpgradeStrategy;
import org.springframework.web.socket.server.standard.TomcatRequestUpgradeStrategy;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
@EnableWebSocketMessageBroker
@ConfigurationProperties
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
	
	@Value("${websocket.paths}")
	public String paths;
	
	@Value("${websocket.w2c}")
	public String w2c;
	
	@Value("${websocket.c2w}")
	public String c2w;
	
	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry.addEndpoint(paths).setAllowedOrigins("*").withSockJS();
		
		// 여러종류의 WebSocket client 접속시 참고사항
		//RequestUpgradeStrategy upgradeStrategy = new TomcatRequestUpgradeStrategy();
		//registry.addEndpoint(paths).withSockJS();
		//registry.addEndpoint(paths).setHandshakeHandler(new DefaultHandshakeHandler(upgradeStrategy)).setAllowedOrigins("*");
	}

	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {
		registry.enableSimpleBroker(w2c);
		registry.setApplicationDestinationPrefixes(c2w);
	}

}
