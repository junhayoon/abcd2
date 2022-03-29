package kr.co.ismartcity.smartfactory.util;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@Component
public class ClientUtilRestApi {
	public final static int 	CONNECTION_TIMEOUT	 		= 3000;
	
	public final static int 	REST_SERVER_TYPE_VMS 		= 1;
	public final static int 	REST_SERVER_TYPE_VA 		= 2;
	public final static int 	REST_SERVER_TYPE_THERMAL	= 3;
	
	public final static String 	REST_URL_VMS_LOGIN 			= "/api/login";
	public final static String 	REST_URL_VMS_LOGOUT 		= "/api/logout";
	public final static String	REST_URL_VMS_KEEP_ALIVE 	= "/api/keep-alive";
	
	public final static String 	REST_URL_VA_LOGIN			= "/users/login";
	public final static String 	REST_URL_VA_LOGOUT 			= "/users/login";
	public final static String 	REST_URL_VA_KEEP_ALIVE 		= "/keepalive";	
	
	public final static String 	REST_URL_THERMAL_DIRECTION	= "/cgi-bin/fwalarmdaemon.cgi?FwCgiVer=0x0001";
	
	
	private int 	serverType;	
	private String 	restIp;
	private int 	restPort;	
	private String 	id;	
	private String 	pw;
	
	private String 	apiKey;
	
	
	public ClientUtilRestApi() {
	}
	
	public ClientUtilRestApi(int nServerType, String stRestIp, int nRestPort, String stId, String stPw) {
		set(nServerType, stRestIp, nRestPort, stId, stPw);
	}
	
	public void set(int nServerType, String stRestIp, int nRestPort, String stId, String stPw) {
		serverType = nServerType;
		restIp = stRestIp;
		restPort = nRestPort;
		id = stId;
		pw = stPw;
	}
	
	public String getApiKey() {
		return apiKey;
	}
	
	public boolean login() {
		boolean bRet = false;
		
		if (serverType == REST_SERVER_TYPE_VMS)
			apiKey = loginVMS(restIp, restPort, id, pw);
		else if (serverType == REST_SERVER_TYPE_VA)
			apiKey = loginVA(restIp, restPort, id, pw);
		
		if (apiKey != null)
			bRet = true;
		
		return bRet;
	}
	
	public boolean logout() {
		boolean bRet = false;
		
		if (serverType == REST_SERVER_TYPE_VMS)
			bRet = logoutVMS(restIp, restPort, apiKey);
		else if (serverType == REST_SERVER_TYPE_VA)
			bRet = logoutVA(restIp, restPort, apiKey);
		
		apiKey = null;
		
		return bRet;
	}
	
	public boolean isLoggedin() {
		boolean bRet = false;
		
		if (apiKey != null)
			bRet = true;
		
		return bRet;
	}
	
	public boolean keepAlive() {
		boolean bRet = false;
		
		if (serverType == REST_SERVER_TYPE_VMS)
			bRet = keepAliveVMS(restIp, restPort, apiKey);
		else if (serverType == REST_SERVER_TYPE_VA)
			bRet = keepAliveVA(restIp, restPort, apiKey);
		
		return bRet;
	}
	
	public boolean thermalDirection() {
		boolean bRet = false;
		
		if (serverType == REST_SERVER_TYPE_THERMAL)
			bRet = thermalDirection(restIp, restPort);
		
		return bRet;
	}
		
	private String loginVA(String stRestIp, int nRestPort, String stId, String stPw) {
    	log.debug(String.format("loginVA() 1... stRestIp(%s) nRestPort(%d) stId(%s) stPw(%s)", stRestIp, nRestPort, stId, stPw));
		
    	String stApiKey = null;
    	HttpURLConnection conn = null;
		try {
			String stUrl = String.format("http://%s:%d%s", stRestIp, nRestPort, REST_URL_VA_LOGIN);
			
			log.debug(String.format("loginVA() 2... stUrl(%s)", stUrl));
			
			JSONObject jsonParam = new JSONObject();
			jsonParam.put("id", stId);			
			jsonParam.put("pw", stPw);
			//jsonParam.put("keepAliveTimeOut", 120);
			
			URL urlVa = new URL(stUrl); 
			conn = (HttpURLConnection) urlVa.openConnection();
			conn.setConnectTimeout(CONNECTION_TIMEOUT);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("Content-Length", String.valueOf(jsonParam.toString().getBytes().length));
			
			conn.setDoOutput(true);
			conn.setDoInput(true);
			conn.getOutputStream().write(jsonParam.toString().getBytes());
			conn.getOutputStream().flush();
			
			if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
				StringBuffer sbResponse = new StringBuffer();
				BufferedReader brIn = new BufferedReader(new InputStreamReader(conn.getInputStream()));
				
				String stReadLine = null;
				while ((stReadLine = brIn.readLine()) != null) {
					sbResponse.append(stReadLine);
				}				
				brIn.close();
				
				JSONParser jsonParser = new JSONParser();
				JSONObject json = (JSONObject)jsonParser.parse(sbResponse.toString());				
				stApiKey = json.get("api-key").toString();
			}	
			
			conn.disconnect();
			conn = null;			
		} catch (Exception e) {
			e.printStackTrace();			
		} finally {
			if (conn != null) {
				conn.disconnect();
				conn = null;
			}
		}
		
		log.debug(String.format("loginVA() end... stApiKey(%s)", stApiKey));
		
		return stApiKey;
    }
    
    private boolean logoutVA(String stRestIp, int nRestPort, String stApiKey) {
    	log.debug(String.format("logoutVA() 1... stRestIp(%s) nRestPort(%d) stApiKey(%s)", stRestIp, nRestPort, stApiKey));
		
    	boolean bRet = false;
    	HttpURLConnection conn = null;
		try {
			if (stApiKey != null) {
				String stUrl = String.format("http://%s:%d%s", stRestIp, nRestPort, REST_URL_VA_LOGOUT);
				
				log.debug(String.format("logoutVA() 2... stUrl(%s)", stUrl));
				
				URL urlVa = new URL(stUrl); 
				conn = (HttpURLConnection) urlVa.openConnection();
				conn.setConnectTimeout(CONNECTION_TIMEOUT);
				conn.setRequestMethod("DELETE");
				conn.setRequestProperty("api-key", stApiKey);
				
				log.debug(String.format("logoutVA() 3... responseCode(%d)", conn.getResponseCode()));
				
				if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
					bRet = true;
				}
				
				conn.disconnect();
				conn = null;
			}
		} catch (Exception e) {
			e.printStackTrace();			
		} finally {
			if (conn != null) {
				conn.disconnect();
				conn = null;
			}
		}
		
		log.debug(String.format("logoutVA() end...bRet(%b)", bRet));

		return bRet;
    }
    
    private boolean keepAliveVA(String stRestIp, int nRestPort, String stApiKey) {
    	log.debug(String.format("keepAliveVA() 1... stRestIp(%s) nRestPort(%d) stApiKey(%s)", stRestIp, nRestPort, stApiKey));
		
    	boolean bRet = false;
    	HttpURLConnection conn = null;
		try {
			if (stApiKey != null) {
				String stUrl = String.format("http://%s:%d%s", stRestIp, nRestPort, REST_URL_VA_KEEP_ALIVE);
				
				log.debug(String.format("keepAliveVA() 2... stUrl(%s)", stUrl));
				
				JSONObject jsonParam = new JSONObject();
				jsonParam.put("id", id);			
				jsonParam.put("pw", pw);
				
				URL urlVa = new URL(stUrl); 
				conn = (HttpURLConnection) urlVa.openConnection();
				conn.setConnectTimeout(CONNECTION_TIMEOUT);
				conn.setRequestMethod("PUT");
				conn.setRequestProperty("Content-Type", "text/plain");
				conn.setRequestProperty("Accept", "*/*");
				conn.setRequestProperty("api-key", stApiKey);
				conn.setDoOutput(true);
				conn.setDoInput(true);
				conn.getOutputStream().write(jsonParam.toString().getBytes());
				conn.getOutputStream().flush();
				
				log.debug(String.format("keepAlive() 3... responseCode(%d)", conn.getResponseCode()));
				
				if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
					bRet = true;
				}
				
				conn.disconnect();
				conn = null;
			}
		} catch (Exception e) {
			e.printStackTrace();			
		} finally {
			if (conn != null) {
				conn.disconnect();
				conn = null;
			}
		}
		
		log.debug(String.format("keepAliveVA() end... bRet(%b)", bRet));
		
		return bRet;
    }
    
    private String loginVMS(String stRestIp, int nRestPort, String stId, String stPw) {
    	log.debug(String.format("loginVMS() 1... stRestIp(%s) nRestPort(%d) stId(%s) stPw(%s)", stRestIp, nRestPort, stId, stPw));
		
    	String stApiKey = null;
    	HttpURLConnection conn = null;
		try {
			String stUrl = String.format("http://%s:%d%s", stRestIp, nRestPort, REST_URL_VMS_LOGIN);
			
			log.debug(String.format("loginVMS() 2... stUrl(%s)", stUrl));
			
			URL urlVa = new URL(stUrl); 
			conn = (HttpURLConnection) urlVa.openConnection();
			conn.setConnectTimeout(CONNECTION_TIMEOUT);
			conn.setRequestMethod("GET");
			conn.setRequestProperty("x-account-id", stId);
			conn.setRequestProperty("x-account-pass", stPw);
			conn.setRequestProperty("x-account-group", "group1");
			conn.setRequestProperty("x-license", "licNormalClient");
			conn.setRequestProperty("x-account-id", stId);
			//conn.setRequestProperty("Accept", "*/*");
			//conn.setRequestProperty("User-Agent", "PostmanRuntime/7.26.8");
			

			log.debug(String.format("loginVMS() 3... conn.getResponseCode(%d)", conn.getResponseCode()));
			
			if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
				StringBuffer sbResponse = new StringBuffer();
				BufferedReader brIn = new BufferedReader(new InputStreamReader(conn.getInputStream()));
				
				String stReadLine = null;
				while ((stReadLine = brIn.readLine()) != null) {
					sbResponse.append(stReadLine);
				}				
				brIn.close();
				
				JSONParser jsonParser = new JSONParser();
				JSONObject json = (JSONObject)jsonParser.parse(sbResponse.toString());
				
				JSONObject jsonResults = (JSONObject)json.get("results");
				
				log.debug(String.format("loginVMS() 3... jsonResults(%s)", jsonResults));
				
				stApiKey = jsonResults.get("auth_token").toString();
			}	
			
			conn.disconnect();
			conn = null;			
		} catch (Exception e) {
			e.printStackTrace();			
		} finally {
			if (conn != null) {
				conn.disconnect();
				conn = null;
			}
		}
		
		log.debug(String.format("loginVMS() end... stApiKey(%s)", stApiKey));
		
		return stApiKey;
    }
    
    private boolean logoutVMS(String stRestIp, int nRestPort, String stApiKey) {
    	log.debug(String.format("logoutVMS() 1... stRestIp(%s) nRestPort(%d) stApiKey(%s)", stRestIp, nRestPort, stApiKey));
		
    	boolean bRet = false;
    	HttpURLConnection conn = null;
		try {
			if (stApiKey != null) {
				String stUrl = String.format("http://%s:%d%s", stRestIp, nRestPort, REST_URL_VMS_LOGOUT);
				
				log.debug(String.format("logoutVMS() 2... stUrl(%s)", stUrl));
				
				URL urlVa = new URL(stUrl); 
				conn = (HttpURLConnection) urlVa.openConnection();
				conn.setConnectTimeout(CONNECTION_TIMEOUT);
				conn.setRequestMethod("DELETE");
				conn.setRequestProperty("x-auth-token", stApiKey);
				
				log.debug(String.format("logoutVA() 3... responseCode(%d)", conn.getResponseCode()));
				
				if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
					bRet = true;
				}
				
				conn.disconnect();
				conn = null;
			}
		} catch (Exception e) {
			e.printStackTrace();			
		} finally {
			if (conn != null) {
				conn.disconnect();
				conn = null;
			}
		}
		
		log.debug(String.format("logoutVMS() end... bRet(%b)", bRet));
		
		return bRet;
    }
    
    private boolean keepAliveVMS(String stRestIp, int nRestPort, String stApiKey) {
    	log.debug(String.format("keepAliveVMS() 1... stRestIp(%s) nRestPort(%d) stApiKey(%s)", stRestIp, nRestPort, stApiKey));
		
    	boolean bRet = false;
    	HttpURLConnection conn = null;
		try {
			if (stApiKey != null) {
				String stUrl = String.format("http://%s:%d%s", stRestIp, nRestPort, REST_URL_VMS_KEEP_ALIVE);
				
				log.debug(String.format("keepAliveVMS() 2... stUrl(%s)", stUrl));
				
				URL urlVa = new URL(stUrl); 
				conn = (HttpURLConnection) urlVa.openConnection();
				conn.setConnectTimeout(CONNECTION_TIMEOUT);
				conn.setRequestMethod("GET");
				conn.setRequestProperty("x-auth-token", stApiKey);
				
				log.debug(String.format("keepAliveVMS() 3... responseCode(%d)", conn.getResponseCode()));
				
				if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
					bRet = true;
				}
				
				conn.disconnect();
				conn = null;
			}
		} catch (Exception e) {
			e.printStackTrace();			
		} finally {
			if (conn != null) {
				conn.disconnect();
				conn = null;
			}
		}
		
		log.debug(String.format("keepAliveVMS() end...bRet(%b)", bRet));
		
		return bRet;
    }
    
    private boolean thermalDirection(String stRestIp, int nRestPort) {
    	log.debug(String.format("thermalDirection() 1... stRestIp(%s) nRestPort(%d) stApiKey(%s)", stRestIp, nRestPort));
		
    	boolean bRet = false;
    	HttpURLConnection conn = null;
		try {
			if (stRestIp != null) {
				String stUrl = String.format("http://%s:%d%s", stRestIp, nRestPort, REST_URL_THERMAL_DIRECTION);
				
				log.debug(String.format("thermalDirection() 2... stUrl(%s)", stUrl));
				
//				JSONObject jsonParam = new JSONObject();
//				jsonParam.put("id", id);			
//				jsonParam.put("pw", pw);
				
				URL urlVa = new URL(stUrl); 
				conn = (HttpURLConnection) urlVa.openConnection();
				conn.setConnectTimeout(CONNECTION_TIMEOUT);
				conn.setRequestMethod("GET");
				conn.setRequestProperty("Content-Type", "text/plain");
				conn.setRequestProperty("Accept", "*/*");
//				conn.setDoOutput(true);
				conn.setDoInput(true);
//				conn.getOutputStream().write(jsonParam.toString().getBytes());
//				conn.getOutputStream().flush();
				
				log.debug(String.format("thermalDirection() 3... responseCode(%d)", conn.getResponseCode()));
				
				if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
					bRet = true;
				}
				
				conn.disconnect();
				conn = null;
			}
		} catch (Exception e) {
			e.printStackTrace();			
		} finally {
			if (conn != null) {
				conn.disconnect();
				conn = null;
			}
		}
		
		log.debug(String.format("thermalDirection() end... bRet(%b)", bRet));
		
		return bRet;
    }
   
}
