package kr.co.ismartcity.smartfactory.service;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@ConfigurationProperties("mobius")
@PropertySource(value = {
		"classpath:/application.yaml",
		"classpath:/application-common.yaml", "classpath:/application-sub.yaml" //"classpath:/application-${spring.profiles.active}.yaml"
})
public class MobiusService {

	@Autowired
	@Qualifier("mobiusRestTemplate")
	RestTemplate restTemplate;
	
	@Value("${orgin}")
	private String orgin;
	
	@Value("${address}")
	private String address;
	
	@Value("${mp_url}")
	private String mp_url;
	
	@Value("${cb}")
	private String cb;
	
	@Value("${rn}")
	private String rn;
	
	@Value("${nu}")
	private String nu;
	
	@Value("${aeid}")
	private String aeid;
	
	private HttpHeaders createHttpHeaders() {
		HttpHeaders headers = new HttpHeaders();   
	    headers.set("Accept", "application/json"); 
	    headers.set("X-M2M-RI", "REQ12345");
	    
	    return headers;
	}
	
	private String mobiusUrl(String targetPath) {
		return mp_url+"/"+cb+"/"+targetPath;
	}
	
	public int createSubscribe(String targetPath) {
		HttpHeaders headers = createHttpHeaders();
		headers.set("X-M2M-Origin", orgin);
	    headers.set("Content-Type", "application/vnd.onem2m-res+json; ty=23");
	    
	    int[] net = {1};
	    String[] nuObj = {nu};
	    
	    JSONObject encJsonObject = new JSONObject();
	    encJsonObject.put("net", net);
	    
	    JSONObject subJsonObject = new JSONObject();
	    subJsonObject.put("rn", rn);
	    subJsonObject.put("enc", encJsonObject);
	    subJsonObject.put("nu", nuObj);
	    subJsonObject.put("exc", 0);
	    
	    JSONObject bodyJsonObject = new JSONObject();
	    bodyJsonObject.put("m2m:sub", subJsonObject);
	    HttpEntity<String> request = new HttpEntity<String>(bodyJsonObject.toString(), headers);
	    
	    try {
	    	restTemplate.postForObject(mobiusUrl(targetPath), request, String.class);
	    } catch(RestClientException e) {
	    	if(e instanceof HttpClientErrorException) {
				HttpClientErrorException ce = ((HttpClientErrorException)e);
				HttpStatus status = ce.getStatusCode();
				return status.value();
			}
	    	return 400;
	    }
	    
	    return 201;
	}
	
	public int deleteSubscribe(String targetPath) {
		HttpHeaders headers = createHttpHeaders();
		headers.set("X-M2M-Origin", orgin);
		HttpEntity<HttpHeaders> entity = new HttpEntity<HttpHeaders>(headers);
		
		targetPath += "/";
		targetPath += rn;
		
		try {
	    	restTemplate.exchange(mobiusUrl(targetPath), HttpMethod.DELETE, entity, String.class);
	    } catch(RestClientException e) {
	    	if(e instanceof HttpClientErrorException) {
				HttpClientErrorException ce = ((HttpClientErrorException)e);
				HttpStatus status = ce.getStatusCode();
				return status.value();
			}
	    	return 400;
	    }
		
		return 200;
	}
	
	public int requestControl(String targetPath, String con) {
		HttpHeaders headers = createHttpHeaders();
		headers.set("X-M2M-Origin", aeid);
		headers.set("Content-Type", "application/vnd.onem2m-res+json; ty=4");
	    
	    JSONObject cinJsonObject = new JSONObject();
	    cinJsonObject.put("con", con);
	    
	    JSONObject bodyJsonObject = new JSONObject();
	    bodyJsonObject.put("m2m:cin", cinJsonObject);
	    
	    HttpEntity<String> request = new HttpEntity<String>(bodyJsonObject.toString(), headers);
	    
	    try {
	    	Object ob = restTemplate.postForObject(mobiusUrl(targetPath), request, String.class);
	    	System.out.println("Send");
	    } catch(RestClientException e) {
	    	if(e instanceof HttpClientErrorException) {
				HttpClientErrorException ce = ((HttpClientErrorException)e);
				HttpStatus status = ce.getStatusCode();
				return status.value();
			}
	    	return 400;
	    }
	    
	    return 201;
	}
	
	public int requestControl(String targetPath, JSONObject cinJson) {
		HttpHeaders headers = createHttpHeaders();
		headers.set("X-M2M-Origin", aeid);
		headers.set("Content-Type", "application/vnd.onem2m-res+json; ty=4");
	    
//	    JSONObject cinJsonObject = new JSONObject();
//	    cinJsonObject.put("con", con);
	    
	    JSONObject bodyJsonObject = new JSONObject();
	    bodyJsonObject.put("m2m:cin", cinJson);
	    
	    HttpEntity<String> request = new HttpEntity<String>(bodyJsonObject.toString(), headers);
	    
	    try {
	    	restTemplate.postForObject(mobiusUrl(targetPath), request, String.class);
	    } catch(RestClientException e) {
	    	if(e instanceof HttpClientErrorException) {
				HttpClientErrorException ce = ((HttpClientErrorException)e);
				HttpStatus status = ce.getStatusCode();
				return status.value();
			}
	    	return 400;
	    }
	    
	    return 201;
	}
	
}
