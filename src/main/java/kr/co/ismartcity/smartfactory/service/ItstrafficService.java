package kr.co.ismartcity.smartfactory.service;

import java.time.LocalDateTime;

import javax.transaction.Transactional;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import kr.co.ismartcity.smartfactory.entity.Itstraffic;
import kr.co.ismartcity.smartfactory.repository.ItstrafficRepository;
import kr.co.ismartcity.smartfactory.util.RequestAPI;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class ItstrafficService extends RequestAPI{

	@Value("${spring.profiles.active}")
	private String server_active_mode;

	@Autowired
	private ItstrafficRepository itstrafficRepository;

	protected static String serviceKey = "bbe41496ceff4802bb997bbcc2eee87b";

	public ItstrafficService()
	{
		super.url = "https://openapi.its.go.kr";
		super.port = 9443;
	}


	@Scheduled(fixedDelayString = "300000")
	public void callItsTrafficApi() throws Exception {

		if ("prod".equals(server_active_mode) || "stage".equals(server_active_mode)) {
			JSONObject param = new JSONObject();
			param.put("type", "all");
			param.put("minX", "126.662906");
			param.put("maxX", "126.721306");
			param.put("minY", "37.381008");
			param.put("maxY", "37.433860");
			param.put("getType", "json");

			//Object rtn = callGetAPI("trafficInfo", makeHeader(), param, String.class);

			Object rtn = callGetAPI("trafficInfo", param, String.class);
			
			JSONObject rtnJson = new JSONObject(rtn.toString());
			JSONObject responseHeader = (JSONObject) rtnJson.get("header");
			JSONObject responseBody = (JSONObject) rtnJson.get("body");

			if("0".equals(responseHeader.get("resultCode").toString())) {
				// 교통정보 정장
				saveItsTraffic(responseBody);

			}else {
				log.error("callItsTrafficApi(): " + responseHeader);
			}
		}
	}

	@Override
	public String makeGetParams(Object bodyData)
	{
		return (super.makeGetParams(bodyData) + "&apiKey="+serviceKey);
	}


	public void saveItsTraffic(JSONObject responseBody) {

		JSONArray items = (JSONArray) responseBody.get("items");
		
		for (int i = 0; i < items.length(); i++) {
			JSONObject jsonInfo = (JSONObject) items.get(i);

			Itstraffic saveVo = new Itstraffic();
			saveVo.setLink_id(Integer.valueOf(jsonInfo.get("linkId").toString()));
			saveVo.setRoad_name(jsonInfo.get("roadName").toString());
			saveVo.setRoad_drc_type(jsonInfo.get("roadDrcType").toString());
			saveVo.setLink_no(jsonInfo.get("linkNo").toString());
			saveVo.setF_node_id(Long.valueOf(jsonInfo.get("startNodeId").toString()));
			saveVo.setT_node_id(Long.valueOf(jsonInfo.get("endNodeId").toString()));
			saveVo.setSpeed(Double.valueOf(jsonInfo.get("speed").toString()));
			saveVo.setTravel_time(jsonInfo.get("travelTime").toString());
			saveVo.setReg_date(LocalDateTime.now());
			saveVo.setCreated_date(jsonInfo.get("createdDate").toString());

			itstrafficRepository.save(saveVo);
			itstrafficRepository.saveTrafficHistory(saveVo);
		}
	}


}