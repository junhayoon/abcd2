package kr.co.ismartcity.smartfactory.util;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;


@Component
public interface ClientUtilWebSocketHandler {	

	public void afterConnectionEstablished(WebSocketSession session);

	public void handleTextMessage(WebSocketSession session, TextMessage message);
	
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status);
}
