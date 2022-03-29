package kr.co.ismartcity.smartfactory.controller;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import kr.co.ismartcity.smartfactory.entity.AirSensorWorkplace;
import kr.co.ismartcity.smartfactory.service.AirSensorWorkplaceService;
import kr.co.ismartcity.smartfactory.service.MobiusService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Data
@RestController
@EnableConfigurationProperties
public class AirSensorWorkplaceController {

	@Autowired
	AirSensorWorkplaceService airService;

	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/airsensor/symbol/{fileName:.+}")
	public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
		Resource resource = airService.loadFileAsResource(fileName);

		return ResponseEntity.ok().contentType(MediaType.parseMediaType("application/octet-stream"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
	}

	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/airsensor/status/{facilityFcode}")
	public AirSensorWorkplace getLastInfo(Principal principal, @PathVariable String facilityFcode) {
		//log.debug("getLastInfo(facilityId) 1..." + facilityId);

		AirSensorWorkplace air = airService.getLastAirInfo(facilityFcode);

		return air;
	}

	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/airsensor/status")
	public List<AirSensorWorkplace> getLastInfo(Principal principal) {
		//log.debug("getLastInfo() 1...");

		List<AirSensorWorkplace> list = airService.getLastAirInfo();

		//log.debug("getLastInfo() end..." + list);

		return list;
	}

	// for airsensor dashbord popup
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/airsensor/log/{facilityFcode:.+}")
	public List<AirSensorWorkplace> getAirInfoLogs(Principal principal, @PathVariable String facilityFcode,
													@RequestParam(required=false, value="offset", defaultValue="0") int offset,
													@RequestParam(required=false, value="limit", defaultValue="10") int limit) {
		//log.debug(String.format("getAirInfoLogs() 1... facilityId(%d) offset(%d) limit(%d)", facilityId, offset, limit));

		List<AirSensorWorkplace> list = airService.getAirInfoLogs(facilityFcode, offset, limit);

		return list;
	}

	// for airsensor dashbord popup
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/airsensor/logByGroup/{facilityFcode:.+}")
	public List<AirSensorWorkplace> getAirInfoLogsByGroup(Principal principal, @PathVariable String facilityFcode,
													@RequestParam(required=false, value="offset", defaultValue="0") int offset,
													@RequestParam(required=false, value="limit", defaultValue="10") int limit) {
		//log.debug(String.format("getAirInfoLogs() 1... facilityId(%d) offset(%d) limit(%d)", facilityId, offset, limit));

		List<AirSensorWorkplace> list = airService.getAirInfoLogsByGroup(facilityFcode, offset, limit);

		return list;
	}

	// for airsensor history menu
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/airsensor/logs")
	public Page<AirSensorWorkplace> getAirSensorLogs(Principal principal,
												@RequestParam("size") int size,
												@RequestParam("page") int page,
												@RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
												@RequestParam("endDate")  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
												@RequestParam(required=false, value="orderByDesc", defaultValue="true") boolean orderByDesc,
												@RequestParam(required=false, value="facilityFcode", defaultValue="-1") String id) {
		//log.debug(String.format("getAirInfoLogs() 1... ### facilityId(%d) size(%d) page(%d) startDate(%s) endDate(%s) orderByDesc(%b)", id, size, page, startDate, endDate, orderByDesc));

		Page<AirSensorWorkplace> list = null;
		if (principal != null) {
			PageRequest pageRequest = null;
			if (orderByDesc)
				pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "create_date"));
			else
				pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "create_date"));

			if (id == null)
				list = airService.findAirSensorLogBetweenDate(pageRequest, startDate, endDate);
			else
				list = airService.findAirSensorLogBetweenDateAndId(pageRequest, startDate, endDate, id);
		}

		//log.debug(String.format("getAirInfoLogs() end... list.getTotalElements(%d)", list.getTotalElements()));


		return list;
	}



	/*********************** 모비우스(게이트웨이) 제어 테스트 **********************/

	@Autowired
	MobiusService mobiusService;

	@PostMapping("/api/test11")
	public void test11(Principal principal, @RequestBody JSONObject msg) {

		try {
			String mobiusId = "/AirSensor/TasGateway";

			String tempId = String.valueOf(mobiusId).replace("/AirSensor/", "AirSensor/");

			mobiusService.requestControl(tempId, msg.toString());


		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@PostMapping("/api/test22")
	public void test22(Principal principal, @RequestBody JSONObject msg) {

		String mobiusId = "/AirSensor/TasGateway_tmp";

		String tempId = String.valueOf(mobiusId).replace("/AirSensor/", "AirSensor/");

		mobiusService.requestControl(tempId, msg.toString());


	}
}
