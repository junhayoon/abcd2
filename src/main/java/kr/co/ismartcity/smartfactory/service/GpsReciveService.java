package kr.co.ismartcity.smartfactory.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.co.ismartcity.smartfactory.mapper.bus.BusMapper;
import kr.co.ismartcity.smartfactory.model.bus.GpsInfoVo;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Slf4j
@Component
public class GpsReciveService {

	private String uvisUrl = "https://s1.u-vis.com";
	private String gpsInfoUri = "/uvisc/SSOAction.do";
	private String getAccessKeyMethod = "GetAccessKeyWithValues";
	private String getDeviceMethod = "getDeviceAPI";

	private String serialKey = "S1404-BA89-E7CE--882";
	private String accessKey = null;
	
	private String[] busList = {"인천78바1369", "인천78바1388", "인천71바1193", "인천73바9354", "인천73바9222", "인천78바1361", "인천71바3667", "인천75아2282", "인천75아2281", "인천78바1396", "인천78바1357", "인천78바1384"};

	@Autowired
	private ObjectMapper objectMapper;
	
	@Autowired
	private BusMapper busMapper;

	private WebClient webClient;
	
	@PostConstruct
	public void init() {
		this.webClient = setWebClient(uvisUrl);
	}

	@Scheduled(fixedDelay = 10000)
	private void scheduleGetGpsInfo() {
		if (accessKey == null) {
			getAccessKey();
		} else {
			getGpsInfo();
		}
	}

	/**
	 * 인증키 발급 Method
	 */
	private void getAccessKey() {

		// Query 파라미터 설정
		MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
		queryParams.add("method", getAccessKeyMethod);
		queryParams.add("SerialKey", serialKey);

		// 인증키 요청
		Object[] result = callMonoGet(gpsInfoUri, queryParams, Object[].class);

		try {
			
			Map<String, String> authMap = objectMapper.convertValue(result[0], Map.class);
			accessKey = authMap.get("AccessKey");
			getGpsInfo();
			
		}catch (Exception e) {
			
		 	log.debug("getAccessKey ERROR: {}", e.getMessage().toString());
		
		}

	}
	
	/**
	 * 버스 현재 위치(GPS) 정보 조회 Method
	 */
	private void getGpsInfo() {
		
		// Query 파라미터 설정
		MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
		queryParams.add("method", getDeviceMethod);
		queryParams.add("AccessKey", accessKey);
		queryParams.add("GUBUN", "00");
		
		try {
			// 버스 위치정보 목록 조회
			Object[] results = callMonoGet(gpsInfoUri, queryParams, Object[].class);
			
			// 버스 위치정보를 담을 리스트 생성
			List<Map<String, Object>> gpsInfoList = new ArrayList<>();
			
			// JSONArray to List<Map>
			for(Object obj : results) {
				Map<String, Object> resMap = objectMapper.convertValue(obj, Map.class);
				String biDate = (String) resMap.get("BI_DATE");
				String biTime = (String) resMap.get("BI_TIME");
				String cmNumber = (String) resMap.get("CM_NUMBER");
				String xPosition = (String) resMap.get("BI_X_POSITION");
				String yPosition = (String) resMap.get("BI_Y_POSITION");
				String dayDistance = (String) resMap.get("DAY_DISTNCE");
				resMap.replace("DAY_DISTNCE", Integer.parseInt(dayDistance));
				
				// 사업장에 등록된 버스정보 일치 여부 확인
				for(String busNum : busList) {
					if(cmNumber.equals(busNum)) {
						gpsInfoList.add(resMap);
					}
				}
				
			}
			
			if(gpsInfoList.size() > 0) {
				busMapper.insertBusGpsInfo(gpsInfoList);
				busMapper.insertBusGpsInfoLog(gpsInfoList);
			}
			
		} catch (Exception e) {
			
			log.debug("getGpsInfo ERROR: {}", e.getMessage().toString());
			
			getAccessKey();
			
		}
		
	}

	/**
	 * WebClient 생성 Method
	 * @param baseUrl: http 요청 주소
	 * @return WebClient
	 */
	private WebClient setWebClient(String baseUrl) {
		WebClient webClient = WebClient.builder()
									   .baseUrl(baseUrl)
									   .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
									   .build();
		return webClient;
	}
	
	/**
	 * WebClient(Http) 요청 Method
	 * @param <T> : 응답 받을 데이터 객체 형식
	 * @param uri : 요청 URI - 전체 URL(X)
	 * @param params
	 * @param clazz
	 * @return
	 */
	private <T> T callMonoGet(String uri, MultiValueMap<String, String> params, Class<T> clazz) {
		
		Mono<T> response = webClient
								.get()
							   	.uri(uriBuilder -> 
							   		uriBuilder
							   			.path(uri)
							   			.queryParams(params)
							   			.build()
							   		)
							   	.accept(MediaType.APPLICATION_JSON)
							   	.retrieve()
							   	.bodyToMono(clazz);

		return response.block();
	}
	
}
