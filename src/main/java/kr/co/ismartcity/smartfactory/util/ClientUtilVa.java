package kr.co.ismartcity.smartfactory.util;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import kr.co.ismartcity.smartfactory.service.EventFromVaService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class ClientUtilVa
implements ClientUtilWebSocketHandler {
	@Autowired
	EventFromVaService eventFromVaService;
	
	private String 	restIp;
	private int 	restPort;
	private String 	restId;
	private String 	restPw;	
	private String 	wsIp;
	private int 	wsPort;
	
	private ClientUtilRestApi 	restClient;
	private ClientUtilWebSocket wsClient;
	
	
	public ClientUtilVa() {		
	}
	
	public void set(String stRestIp, int nRestPort, String stRestId, String stRestPw, String stWsIp, int nWsPort) {
		restIp = stRestIp;
		restPort = nRestPort;
		restId = stRestId;
		restPw = stRestPw;
		
		wsIp = stWsIp;
		wsPort = nWsPort;
	}

	public boolean connect() {
		boolean bRet = false;
		disconnect();
		
		bRet = connectRest();
		if (bRet) {
			bRet = connectWebsocket();
		}
		
		if (bRet == false) {
			disconnect();
		}
		
		log.debug(String.format("connect() end...bRet(%b)", bRet));
		
		return bRet;
	}
	
	public boolean connect(String stRestIp, int nRestPort, String stRestId, String stRestPw, String stWsIp, int nWsPort) {
		set(stRestIp, nRestPort, stRestId, stRestPw, stWsIp, nWsPort);
		
		return connect();
	}
	
	private void disconnect() {
		if (wsClient != null)
			wsClient.close();
		if (restClient != null)
			restClient.logout();
		
		wsClient = null;
		restClient = null;
	}
	
	public void close() {
		disconnect();
		set(null, 0, null, null, null, 0);			
	}
	
	public boolean isConnected() {
		boolean bRet = false;
		
		log.debug(String.format("isConnected() 1... restClient(%s) wsClient(%s)", 	restClient, wsClient));
		
		log.debug(String.format("isConnected() 2... isLoggedin(%b) isConnected(%b)", 
				(restClient!=null)?restClient.isLoggedin():false, (wsClient!=null)?wsClient.isConnected():false));
		
		if (wsClient != null && wsClient.isConnected())
			bRet = true;
		
		log.debug(String.format("isConnected() end...bRet(%b)", bRet));
		
		return bRet;
	}
	
	public boolean keepAlive() {
		boolean bRet = false;
		
		if (restClient != null)
			bRet = restClient.keepAlive();
		
		return bRet;
	}
	
	private boolean connectRest() {
		boolean bRet = false;
		
		log.debug(String.format("connectRest() 1..."));
		
		ClientUtilRestApi clClient = new ClientUtilRestApi(ClientUtilRestApi.REST_SERVER_TYPE_VA, restIp, restPort, restId, restPw);
		bRet = clClient.login();
		if (bRet) {			
			restClient = clClient;
		} else {
			clClient.logout();
		}
		
		log.debug(String.format("connectRest() end... bRet(%b)", bRet));
		
		return bRet;
	}
	
	private boolean connectWebsocket() {
		boolean bRet = false;
		
		log.debug(String.format("connectWebsocket() 1..."));
		
		String stPath = String.format(ClientUtilWebSocket.WS_PATH_VA_META_DATA, restClient.getApiKey());
		
		ClientUtilWebSocket clClient = new ClientUtilWebSocket(wsIp, wsPort, stPath, ClientUtilWebSocket.WS_PROTOCOL_VA_META_DATA, this);
		bRet = clClient.connect();
		if (bRet) {					
			wsClient = clClient;
		} else {
			clClient.close();
		}
		
		log.debug(String.format("connectWebsocket() end... bRet(%b)", bRet));
		
		return bRet;
	}
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) {
		log.debug(String.format("afterConnectionEstablished() 1... session(%s) ", session));
	}
	
	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message)  {
		//log.debug(String.format("handleTextMessage() 1... message(%s) ", message.getPayload()));
		
		try {		    
		    JSONParser jsonParse = new JSONParser();
		    JSONObject obj =  (JSONObject)jsonParse.parse(message.getPayload());
		    
		    
		    //log.debug(String.format("handleTextMessage() 2... eventFromVaService(%s)", eventFromVaService));
		    
		    JSONObject evt = (JSONObject)obj.get("evt");
			log.debug(String.format("handleTextMessage() 1... session(%s) ", session));
		    if (evt != null)
		    	eventFromVaService.receiveEventsFromVa(evt);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
		log.debug(String.format("afterConnectionClosed() 1... status(%s) ",status));
		
		disconnect();
	}	
}
