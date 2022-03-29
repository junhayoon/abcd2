package kr.co.ismartcity.smartfactory.util;

import java.util.List;
import java.util.Vector;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.client.WebSocketConnectionManager;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@Component
public class ClientUtilWebSocket
extends TextWebSocketHandler {	
	public final static String 	WS_PATH_VA_META_DATA 		= "/vaMetadata?api-key=%s&evtMeta";
	
	public final static String 	WS_PROTOCOL_VA_META_DATA	= "va-metadata";
	
	@Autowired
	private ObjectMapper objectMapper;

	private String 	wsIp;
	private int 	wsPort;
	private String 	wsPath;
	private String 	wsProtocol;

	private WebSocketConnectionManager 	wsManager;
	private WebSocketSession			wsSession;
	private ClientUtilWebSocketHandler	wsHandler;
	
	
	public ClientUtilWebSocket() {
	}
	
	public ClientUtilWebSocket(String stWsIp, int nWsPort, String stPath, String stProtocol, ClientUtilWebSocketHandler clHandler) {
		set(stWsIp, nWsPort, stPath, stProtocol, clHandler);
	}
	
	public void setPath(String stPath) {
		wsPath = stPath;
	}
	
	public void setProtocol(String stProtocol) {
		wsProtocol = stProtocol;
	}
	
	public void set(String stWsIp, int nWsPort, String stPath, String stProtocol, ClientUtilWebSocketHandler clHandler) {
		wsIp = stWsIp;
		wsPort = nWsPort;
		wsPath = stPath;
		wsProtocol = stProtocol;
		wsHandler = clHandler;
	}
	
	public boolean connect() {
		boolean bRet = false;

		wsManager = connectWebSocket(wsIp, wsPort, wsPath, wsProtocol);		
		if (wsManager != null)
			bRet = true;
		
		return bRet;
	}
	
	public boolean connect(String stWsIp, int nWsPort, String wsPath, String stProtocol) {
		return connect();
	}
	
	public void close() {		
		try {
			if (wsSession != null) {
				wsSession.close();
			}
			if (wsManager != null) {
				wsManager.stop();
			}			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		wsHandler = null;
		wsSession = null;
		wsManager = null;
		wsPath = null;
		wsProtocol = null;
	}
	
	public boolean isConnected() {
		boolean bRet = false;
		
		if (wsSession != null)
			bRet = true;
		
		return bRet;
	}
	
	public boolean send(String msg) {
		boolean bRet = false;		
		
		try {
			if (wsSession != null) {				
				wsSession.sendMessage(new TextMessage(msg));
				bRet = true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}		
		
		return bRet;
	}	
	
	private WebSocketConnectionManager connectWebSocket(String stWsIp, int nWsPort, String wsPath, String wsProtocol) {    	    	
		WebSocketConnectionManager clManager = null;
    	
    	log.debug(String.format("connectWebSocket() 1... stWsIp(%s) nWsPort(%d) wsPath(%s) wsProtocol(%s)", stWsIp, nWsPort, wsPath, wsProtocol));
    	

    	if (stWsIp != null) {    		
	        // WebSocket('ws://192.168.200.119:7681/vaMetadata?api-key=BEBS6WZYKEQCOIJAGAQDKUQ=&evtMeta', 'va-metadata');
	        String stUrl = String.format("ws://%s:%s%s", stWsIp, nWsPort, wsPath);	

	        log.debug(String.format("connectWebSocket() 2... stUrl(%s)", stUrl));
	        
	        try {
	        	//WebSocketHandler handler = new WebSocketHandler();
	 	        List<String> protocols = new Vector<String>();
	     		protocols.add(wsProtocol);
	     		
	     		WebSocketClient clClient = new StandardWebSocketClient();	     		
	     		clManager = new WebSocketConnectionManager(clClient, this, stUrl);	     		
	     		clManager.setSubProtocols(protocols);
	     		//clManager.setAutoStartup(true);
	     		clManager.start();
	        	
	        	log.debug(String.format("connectWebSocket() 3..."));
	        	
	        } catch (Exception e) {
	        	e.printStackTrace();
	        	clManager = null;
	        }
    	}
    	
    	log.debug(String.format("connectWebSocket() end... clManager(%s)", clManager));
    	
        return clManager;
    }
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		//log.debug(String.format("afterConnectionEstablished() 1... session(%s) ", session));
	    
		wsSession = session;
	    if (wsHandler != null)
	    	wsHandler.afterConnectionEstablished(session);
	}
	
	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
	    //log.debug(String.format("handleTextMessage() 1... message(%s) ", message.getPayload()));
	    
	    if (wsHandler != null)
	    	wsHandler.handleTextMessage(session, message);
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		super.afterConnectionClosed(session, status);
		
		//log.debug(String.format("afterConnectionClosed() 1... status(%s) ",status));
	    
	    if (wsHandler != null)
	    	wsHandler.afterConnectionClosed(session, status);
	    
	    close();
	}
}
