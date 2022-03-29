package kr.co.ismartcity.smartfactory.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.Principal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonProperty;

import kr.co.ismartcity.smartfactory.config.ServiceLinkUrlConfig;
import kr.co.ismartcity.smartfactory.entity.AirSensorStation;
import kr.co.ismartcity.smartfactory.entity.WeatherStation;
import kr.co.ismartcity.smartfactory.service.FacilityService;
import kr.co.ismartcity.smartfactory.service.WeatherStationService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
@Controller
@RestController
@ConfigurationProperties
@PropertySource(value = {
		"classpath:/application.yaml",
		"classpath:/application-common.yaml", "classpath:/application-sub.yaml" //"classpath:/application-${spring.profiles.active}.yaml"
	})
public class AirSensorStationController {

	@Autowired
	WeatherStationService weatherStationService;

	@JsonProperty("airPredictRestUrl")
	@Value("${ai.airPredictRestUrl}")
	public String airPredictRestUrl;

	@JsonProperty("airRestUrl")
	@Value("${ai.airRestUrl}")
	public String airRestUrl;
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/airstation/station")
	public List<WeatherStation> getStationList() {
		return weatherStationService.getAllWeatherStations();
	}
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/airstation/today")
	public List<AirSensorStation> getTodayAirQuality() {	
		log.debug("getTodayAirQuality() 1...");
	
		LocalDateTime curTime = LocalDateTime.now();
		List<AirSensorStation> listAirQuality = getAirQuality(0, true, curTime, curTime);
	
		return listAirQuality;
	}
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/airstation/prediction")
	public JSONObject getPredictiveAirQuality() {
		
		log.debug("getPredictiveAirQuality() 1...");

		LocalDateTime curTime = LocalDateTime.now();
		JSONObject listAirQuality = getPredictiveAirQuality(0, true, curTime, curTime);

		return listAirQuality;
	}

	// 실시간 로그
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/airstation/curlogs")
	public List<AirSensorStation> getAirQualityCurLogs(
			Principal principal, 
			@RequestParam("station") long station,
			@RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
			@RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate
			) {
		
		log.debug(String.format("getAirQualityLogs() 1... station(%d) startDate(%s) endDate(%s)", station, startDate, endDate));
		
		List<AirSensorStation> listAirQuality = getAirQuality(station, false, startDate, endDate);
		
		return listAirQuality;
	}

	// 일 평균값
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/airstation/logs")
	public List<AirSensorStation> getAirQualityLogs(
			Principal principal, 
			@RequestParam("station") long station,
			@RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
			@RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate
			) {
		
		log.debug(String.format("getAirQualityLogs() 1... station(%d) startDate(%s) endDate(%s)", station, startDate, endDate));
		
		List<AirSensorStation> listAirQuality = getAirQuality(station, true, startDate, endDate);
		
		return listAirQuality;
	}

	public List<AirSensorStation> getAirQuality(long station, boolean daily, LocalDateTime startDate, LocalDateTime endDate)  {
		
		log.debug(String.format("getAirQuality() 1... station(%d) daily(%b) startDate(%s) endDate(%s)", station, daily, startDate, endDate));
		
		List<AirSensorStation> result = new ArrayList<>();

		String start = null;
		String end = null;
		if (startDate != null)
			start = startDate.format(DateTimeFormatter.ofPattern("yyyyMMddHH"));
		if (endDate != null)
			end = endDate.format(DateTimeFormatter.ofPattern("yyyyMMddHH"));
		
		try {
			JSONObject jsonParam = new JSONObject();
			jsonParam.put("command", "data");
			if (station > 0)
				jsonParam.put("station", station);// 0 이면 5개 평균
			if (daily)
				jsonParam.put("period", "daily"); // 
			if (start != null)
				jsonParam.put("begin", Integer.parseInt(start));
			jsonParam.put("end", Integer.parseInt(end)); // null 가능
			
			//log.debug(String.format("getAirQuality() 2... start(%s) end(%s) param(%s)", start, end, jsonParam));
			
			URL url = new URL(airRestUrl);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("Content-Length", String.valueOf(jsonParam.toString().getBytes().length));
			conn.setDoOutput(true);
			conn.setDoInput(true);
			conn.getOutputStream().write(jsonParam.toString().getBytes());
			conn.getOutputStream().flush();

			BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			StringBuffer responseString = new StringBuffer();
			
			String inputLine = "";
			while ((inputLine = in.readLine()) != null) {
				responseString.append(inputLine);
			}
			conn.getInputStream().close();
			conn.disconnect();
			
			//log.debug("getAirQuality() 3..." + responseString);

			JSONParser parser = new JSONParser();
			JSONObject json = (JSONObject)parser.parse(responseString.toString());				
			JSONArray jarr = (JSONArray)json.get("data");
			
			//log.debug("getAirQuality() 4..." + jarr.size() + ", " + jarr);
			
			for (int i = 0; i < jarr.size(); i++) {
				JSONObject item = (JSONObject) jarr.get(i);				
				AirSensorStation air = new AirSensorStation(item);

				result.add(air);
			}
			responseString.delete(0, responseString.length());			

		} catch (IOException e) {
			e.printStackTrace();			
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		//log.debug("getAirQuality() end..." + result);

		return result;
	}
	
	//public List<AirSensorStation> getPredictiveAirQuality(long station, boolean daily, LocalDateTime startDate, LocalDateTime endDate)  {
	public JSONObject getPredictiveAirQuality(long station, boolean daily, LocalDateTime startDate, LocalDateTime endDate)  {
		log.debug(String.format("getPredictiveAirQuality() 1... station(%d) daily(%b) startDate(%s) endDate(%s)", station, daily, startDate, endDate));
		
		//List<AirSensorStation> result = new ArrayList<>();
		JSONObject result = null;
		
		try {			
			URL url = new URL(airPredictRestUrl);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
//			conn.setRequestProperty("Content-Length", String.valueOf(jsonParam.toString().getBytes().length));
			conn.setDoOutput(true);
			conn.setDoInput(true);
//			conn.getOutputStream().write(jsonParam.toString().getBytes());
			conn.getOutputStream().flush();

			BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			StringBuffer responseString = new StringBuffer();
			
			String inputLine = "";
			while ((inputLine = in.readLine()) != null) {
				responseString.append(inputLine);
			}
			conn.getInputStream().close();
			conn.disconnect();
			
			log.debug("getAirQuality() 3..." + responseString);

			JSONParser parser = new JSONParser();
			JSONObject json = (JSONObject)parser.parse(responseString.toString());				
			JSONObject jsonData = (JSONObject)json.get("data");
			
			log.debug("getAirQuality() 4..." + jsonData);
			
			result = jsonData;
			responseString.delete(0, responseString.length());			

		} catch (IOException e) {
			e.printStackTrace();			
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		//log.debug("getAirQuality() end..." + result);

		return result;
	}

//	@GetMapping("/api/airstation/station")
//	public List<Long> getStationList() {
//		
//		List<Long> station = new ArrayList<Long>();
//
//		URL url = null;
//		try {
//			url = new URL(KSB_URL);
//
//			JSONObject jsonParam = new JSONObject();
//			jsonParam.put("command", "station");
//
//			HttpURLConnection conn;
//			try {
//				conn = (HttpURLConnection) url.openConnection();
//				conn.setRequestMethod("POST");
//				conn.setRequestProperty("Content-Type", "application/json");
//				conn.setRequestProperty("Content-Length", String.valueOf(jsonParam.toString().getBytes().length));
//				conn.setDoOutput(true);
//				conn.setDoInput(true);
//				conn.getOutputStream().write(jsonParam.toString().getBytes());
//				conn.getOutputStream().flush();
//
//				BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
//				StringBuffer responseString = new StringBuffer();
//				
//				String inputLine = "";
//				while ((inputLine = in.readLine()) != null) {
//					responseString.append(inputLine);
//				}
//				conn.getInputStream().close();
//				conn.disconnect();		
//
//				JSONParser parser = new JSONParser();
//				JSONObject json = (JSONObject)parser.parse(responseString.toString());				
//				JSONArray jarr = (JSONArray)json.get("data");
//				
//				for (int i = 0; i < jarr.size(); i++) {
//					JSONObject item = (JSONObject) jarr.get(i);
//					
//					JSONObject codeInfo = (JSONObject)item.get("_id");
//					long code = (long)codeInfo.get("code");
//					
//					station.add(code);		
//				}
//				responseString.delete(0, responseString.length());
//				
//
//			} catch (IOException e) {
//				e.printStackTrace();
//				
//			} catch (ParseException e) {
//				e.printStackTrace();
//			}
//
//		} catch (MalformedURLException e) {
//			e.printStackTrace();
//		}
//
//		return station;
//	}
}


