package kr.co.ismartcity.smartfactory.service;

import javax.transaction.Transactional;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import kr.co.ismartcity.smartfactory.entity.UticImsOpen;
import kr.co.ismartcity.smartfactory.repository.UticImsOpenRepository;
import kr.co.ismartcity.smartfactory.util.RequestAPI;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class UticImsOpenService extends RequestAPI {

	@Value("${spring.profiles.active}")
	private String server_active_mode;

	@Autowired
	private UticImsOpenRepository iticImsOpenRepository;

	protected static String serviceKey = "89m6Hz1zkJDw6NC76srCmg18SY9KBMt1OFjdBHLcE2jvRTVfmrP3xCojNVILjtk5";

	public UticImsOpenService() {
		super.url = "http://www.utic.go.kr";
		super.port = 0;
	}

	@Scheduled(fixedDelayString = "3600000")
	public void callUticImsOpenApi() throws Exception {

		if ("prod".equals(server_active_mode) || "stage".equals(server_active_mode)) {
			JSONObject param = new JSONObject();

			Object rtn = callGetAPI("guide/imsOpenData.do", param, String.class);

			JSONObject xmlJSONObj = XML.toJSONObject(rtn.toString());

			JSONObject result = (JSONObject) xmlJSONObj.get("result");

			saveUticImsOpen(result);

		}
	}

	@Override
	public String makeGetParams(Object bodyData) {
		return (super.makeGetParams(bodyData) + "&key=" + serviceKey);
	}

	public void saveUticImsOpen(JSONObject responseBody) {

		iticImsOpenRepository.deleteAll();

		JSONArray items = (JSONArray) responseBody.get("record");

		for (int i = 0; i < items.length(); i++) {
			JSONObject jsonInfo = (JSONObject) items.get(i);

			UticImsOpen saveVo = new UticImsOpen();
			saveVo.setIncident_id(jsonInfo.get("incidentId").toString());
			saveVo.setIncidente_type_cd(jsonInfo.get("incidenteTypeCd").toString());
			saveVo.setIncidente_sub_type_cd(jsonInfo.get("incidenteSubTypeCd").toString());
			saveVo.setAddress_jibun(jsonInfo.get("addressJibun").toString());
			saveVo.setAddress_jibun_cd(jsonInfo.get("addressJibunCd").toString());
			saveVo.setAddress_new(jsonInfo.get("addressNew").toString());
			saveVo.setLink_id(jsonInfo.get("linkId").toString());
			saveVo.setLocation_dataX(Double.valueOf(jsonInfo.get("locationDataX").toString()));
			saveVo.setLocation_dataY(Double.valueOf(jsonInfo.get("locationDataY").toString()));
			saveVo.setLocation_type_cd(jsonInfo.get("locationTypeCd").toString());
			saveVo.setIncidente_traffic_cd(jsonInfo.get("incidenteTrafficCd").toString());
			saveVo.setIncidente_grade_cd(jsonInfo.get("incidenteGradeCd").toString());
			saveVo.setIncident_title(jsonInfo.get("incidentTitle").toString());
			saveVo.setIncident_region_cd(jsonInfo.get("incidentRegionCd").toString());
			saveVo.setStart_date(jsonInfo.get("startDate").toString());
			saveVo.setEnd_date(jsonInfo.get("endDate").toString());
			saveVo.setLane(jsonInfo.get("lane").toString());
			saveVo.setRoad_name(jsonInfo.get("roadName").toString());
			saveVo.setSource_code(jsonInfo.get("sourceCode").toString());

			iticImsOpenRepository.save(saveVo);
		}
	}

}