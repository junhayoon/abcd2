package kr.co.ismartcity.smartfactory.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import antlr.collections.List;
import kr.co.ismartcity.smartfactory.entity.AirCleanerWorkplace;
import kr.co.ismartcity.smartfactory.entity.AirSensorWorkplace;
import kr.co.ismartcity.smartfactory.entity.ElectronicWorkplace;
import kr.co.ismartcity.smartfactory.entity.Facility;
import kr.co.ismartcity.smartfactory.entity.FireSensorWorkplace;
import kr.co.ismartcity.smartfactory.entity.GasSensorWorkplace;
import kr.co.ismartcity.smartfactory.entity.Notification;
import kr.co.ismartcity.smartfactory.repository.FacilityRepository;
import kr.co.ismartcity.smartfactory.util.EventHandlerUtil;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Service
@ConfigurationProperties
public class MqttAirSensorService {
	@Autowired
	private FacilityService facilityService;

	@Autowired
	private AirSensorWorkplaceService airService;

	@Autowired
	private AirCleanerWorkplaceService airCleanerService;

	@Autowired
	private FireSensorWorkplaceService fireSensorService;

	@Autowired
	private GasWorkplaceService gasService;
	
	@Autowired
	private ElectronicSensorWorkplaceService electronicSensorService;

	@Autowired
	private NotificationService notiService;

	@Autowired
	MessageSourceService messageSourceService;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private SimpMessagingTemplate messageTemplate;

	@Autowired
	public FacilityRepository facilityRepository;
	
	@Autowired
	private EventHandleService eventHandlerService;


	public void processAirSensorData(String mobiusId, Map<String, Object> cin) {
		log.debug(String.format("processAirSensorData() 1... mobiusId(%s) cin(%s)", mobiusId, cin));

		try {
			Facility facil = facilityService.getFacility(mobiusId);
			if (facil != null) {
				//String message = "ID:ISC001,TIME:20210208171948,PM10:5.0,PM2.5:4.0,PM1.0:4.0,TEMP:24.6,HUMI:13.2,CO2:1760,TVOC:0,UNIT:0,ALARM:000";
				String message = (String)cin.get("con");

				log.debug(String.format("processAirSensorData() 2... message(%s)", message));

				Pattern p = Pattern.compile("(^[a-zA-Z0-9.]+:[A-Z0-9.]+,)");
				Matcher m = p.matcher(message);
				if (m.find()) {
					AirSensorWorkplace air = parseAirQuality(message);
					if (air != null) {
						air.setFacility(facil);
						airService.addAirInfo(air);
						sendAirSensorDataToWs(air);

						log.debug(String.format("processAirSensorData() 3... air(%s)", air));
					}
				} else {
					AirSensorWorkplace air = new AirSensorWorkplace();
					air.setFacility(facil);
					air.setRecv_data(message);
					airService.addAirInfo(air);

					log.debug(String.format("processAirSensorData() 4... air(%s)", air));
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		log.debug(String.format("processAirSensorData() end... "));
	}

	private void sendAirSensorDataToWs(AirSensorWorkplace air) {
		log.debug(String.format("sendAirSensorDataToWs() 1... "));

		try {
			if (air != null) {
				messageTemplate.convertAndSend("/w2c/airsensor", objectMapper.writeValueAsString(air));

				//ALARM:000   - 1자리: motor, 2자리: sensor, 3자리: filter (좌에서 우방향)
				int nAlarm = air.getAlarm();
				log.debug(String.format("sendAirSensorDataToWs() 2... nAlarm(%d)", nAlarm));

				int nAlarmMotor = nAlarm/100;
				int nAlarmSensor = (nAlarm%100)/10;
				int nAlarmFilter = nAlarm%10;

				if ((nAlarmMotor == 1 || nAlarmMotor == 2) || (nAlarmSensor != 0) || (nAlarmFilter != 0)) {
					StringBuffer sbInfo = new StringBuffer();

					log.debug(String.format("sendAirSensorDataToWs() 3... nAlarmMotor(%d) nAlarmSensor(%d) nAlarmFilter(%d)", nAlarmMotor, nAlarmSensor, nAlarmFilter));

					if (nAlarmMotor == 1 || nAlarmMotor == 2) {
						if (nAlarmMotor == 1) {
							sbInfo.append(messageSourceService.getMessage("notification.airsensor.warning_motor1", Locale.KOREAN));
						} else {
							sbInfo.append(messageSourceService.getMessage("notification.airsensor.warning_motor2", Locale.KOREAN));
						}
					}
					if (nAlarmSensor != 0) {
						if (sbInfo.length() > 0)
							sbInfo.append(", ");
						sbInfo.append(messageSourceService.getMessage("notification.airsensor.warning_sensor", Locale.KOREAN));
					}
					if (nAlarmFilter != 0) {
						if (sbInfo.length() > 0)
							sbInfo.append(", ");
						sbInfo.append(messageSourceService.getMessage("notification.airsensor.warning_filter", Locale.KOREAN));
					}

					Notification noti = new Notification();
					noti.setFacility(air.getFacility());
					noti.setFrom(noti.NOTI_FROM_AIRSENSOR_IN_WORKPLACE);
					noti.setLevel(noti.NOTI_LEVEL_WARNING);					// 0: success, 1: info, 2: warning, 3: danger
					noti.setInfo(sbInfo.toString());
					noti.setData(String.valueOf(nAlarm));

					log.debug(String.format("sendAirSensorDataToWs() 4... noti(%s)", noti));

					noti = notiService.addNotification(noti);

					messageTemplate.convertAndSend("/w2c/notification", objectMapper.writeValueAsString(noti));
				}
			}
		} catch(Exception e) {
			e.printStackTrace();
		}

		log.debug(String.format("sendAirSensorDataToWs() end..."));
	}

	private AirSensorWorkplace parseAirQuality(String message) {
		AirSensorWorkplace air = null;

		log.debug(String.format("parseAirQuality() 1... message(%s)", message));
		try {
			//HashMap<String, String> map = splitMessage(message);
			HashMap<String, String> map = splitMessageEx(message);
			//log.debug(String.format("parseAirQuality() 2... map(%s)", map));

			if (map != null && map.size() >= 7) {
				air = new AirSensorWorkplace();
				air.setPm10(parseFloat(map.get("PM10")));
				air.setPm25(parseFloat(map.get("PM2.5")));
				air.setPm1(parseFloat(map.get("PM1.0")));
				air.setCo2(parseFloat(map.get("CO2")));
				air.setTvoc(parseFloat(map.get("TVOC")));
				air.setTemp(parseFloat(map.get("TEMP")));
				air.setHumi(parseFloat(map.get("HUMI")));
				air.setUnit(parseInt(map.get("UNIT")));
				air.setAlarm(parseInt(map.get("ALARM")));
				air.setCmd(map.get("CMD"));
				air.setRange(map.get("RANGE"));
				air.setAstrength(parseInt(map.get("ASTRENGTH")));
				air.setRecv_seq(parseLong(map.get("SEQ")));
				air.setRecv_data(message);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		log.debug(String.format("parseAirQuality() end... air(%s)", air));

		return air;
	}

	private HashMap<String, String> splitMessage(String message) {
		HashMap<String, String> map = new HashMap<String, String>();

		try {
			if (message != null) {
				String[] items = message.split(",");
				if (items != null) {
					for (int i = 0; i < items.length; i++) {
						String[] item = items[i].split(":");
						if (item != null && item.length == 2) {
							String itemName = item[0];
							String itemValue = item[1];
							map.put(itemName, itemValue);
						}
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return map;
	}

	private HashMap<String, String> splitMessageEx(String message) {
		HashMap<String, String> map = new HashMap<String, String>();

		try {
			if (message != null) {
				String[] items = message.split(",");
				if (items != null) {
					for (int i = 0; i < items.length; i++) {
						String[] item = items[i].split(":");
						if (item != null && item.length == 2) {
							String itemName = item[0];
							String itemValue = item[1];
							map.put(itemName, itemValue);
						}
					}
				}

				int nIndex = message.indexOf("RANGE");
				if (nIndex > -1) {
					String stTemp = message.substring(nIndex);
					String stRange = stTemp.substring(stTemp.indexOf("[")+1, stTemp.indexOf("]"));

					map.put("RANGE", stRange);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return map;
	}

	private double parseFloat(String val) {
		double ret = 0;
		try {
			//ret = Float.valueOf(val);
			ret = Math.round(Float.valueOf(val)*100)/100.0;	// 소수점 3자리에서 반올림
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ret;
	}

	private int parseInt(String val) {
		int ret = 0;
		try {
			ret = Integer.parseInt(val);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ret;
	}

	private long parseLong(String val) {
		long ret = 0;
		try {
			ret = Long.parseLong(val);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ret;
	}


	/*********************
	 * 6종센서 값
	 * @param con
	 *********************/
	public void processAirSensorData(Map<String, Object> con) {

		try {
			ObjectMapper mapper = new ObjectMapper();
			// 데이터 정보
			Map<String, Object> data = (Map<String, Object>)con.get("DATA");
//			String test = data.get("TIME").toString();
//			if(test==null) {
//				data.put("TIME", "1111111111");
//			}
//			log.debug(test);
			if(data != null) {
				String recvData = mapper.writeValueAsString(con);
				AirSensorWorkplace iAirSensorWorkplace = new AirSensorWorkplace();

				iAirSensorWorkplace.setFacility(facilityRepository.findFacilityWorkplace(con.get("SID").toString(), con.get("UID").toString()));
				iAirSensorWorkplace.setRecv_data(recvData);
				iAirSensorWorkplace.setPm1(Double.valueOf(data.get("PM1").toString()));
				iAirSensorWorkplace.setPm25(Double.valueOf(data.get("PM2.5").toString()));
				iAirSensorWorkplace.setPm10(Double.valueOf(data.get("PM10").toString()));
				iAirSensorWorkplace.setCo2(Double.valueOf(data.get("CO2").toString()));
				iAirSensorWorkplace.setHumi(Double.valueOf(data.get("HUMI").toString()));
				iAirSensorWorkplace.setTemp(Double.valueOf(data.get("TEMP").toString()));
				
				
				//TVOC 수정이 완료되지 못한 사업장에 0으로 default 220315 yjh
				if(data.get("TVOC")==null) {
					iAirSensorWorkplace.setTvoc(0);
				}else {
					iAirSensorWorkplace.setTvoc(Double.valueOf(data.get("TVOC").toString()));
				}
					
				

				
				
				airService.addAirInfo(iAirSensorWorkplace);
				
				String sensorType = (String)con.get("SID");
//				EventHandlerUtil.analysisEvent(sensorType, iAirSensorWorkplace);
				eventHandlerService.analysisEvent(sensorType, iAirSensorWorkplace);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/*********************
	 * 공기클리너
	 * @param con
	 *********************/
	public void processAirCleanerData(Map<String, Object> con) {

		try {
			ObjectMapper mapper = new ObjectMapper();
			// 데이터 정보
			Map<String, Object> data = (Map<String, Object>)con.get("DATA");

			if(data != null) {
				String recvData = mapper.writeValueAsString(con);
				AirCleanerWorkplace iAirCleanerWorkplace = new AirCleanerWorkplace();

				iAirCleanerWorkplace.setFacility(facilityRepository.findFacilityWorkplace(con.get("SID").toString(), con.get("UID").toString()));
				iAirCleanerWorkplace.setRecv_data(recvData);
				iAirCleanerWorkplace.setPower(data.get("POWER").toString());
				iAirCleanerWorkplace.setMode(data.get("MODE").toString());
				iAirCleanerWorkplace.setAstrength(Integer.valueOf(data.get("ASTRENGTH").toString()));

				airCleanerService.addAirCleanerInfo(iAirCleanerWorkplace);
				
				String sensorType = (String)con.get("SID");
//				EventHandlerUtil.analysisEvent(sensorType, iAirCleanerWorkplace);
				eventHandlerService.analysisEvent(sensorType, iAirCleanerWorkplace);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/*********************
	 * 화제센서
	 * @param con
	 *********************/
	public void processFireSensorData(Map<String, Object> con) {

		try {

			boolean fier = false;

			ObjectMapper mapper = new ObjectMapper();
			// 데이터 정보
			Map<String, Object> data = (Map<String, Object>)con.get("DATA");

			if(data != null) {
				FireSensorWorkplace iFireSensorWorkplace = new FireSensorWorkplace();

				iFireSensorWorkplace.setFacility(facilityRepository.findFacilityWorkplace(con.get("SID").toString(), con.get("UID").toString()));

				if("N".equals(data.get("FIER").toString())) fier = false; else fier = true;

				iFireSensorWorkplace.setFireflag(fier);

				fireSensorService.addFireSensorInfo(iFireSensorWorkplace);
				
				String sensorType = (String)con.get("SID");
				eventHandlerService.analysisEvent(sensorType, iFireSensorWorkplace);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/*********************
	 * 센서 통신 상태 작업중
	 * @param con
	 * 작업중
	 *********************/
	public void processHeartbeatSensorData(Map<String, Object> con) {

		try {

			boolean sensor = false;
			boolean fier = false;
			boolean airClearing = false;

			ObjectMapper mapper = new ObjectMapper();
			// 데이터 정보
			Map<String, Object> data = (Map<String, Object>)con.get("DATA");

			if(data != null) {
				FireSensorWorkplace iFireSensorWorkplace = new FireSensorWorkplace();

				iFireSensorWorkplace.setFacility(facilityRepository.findFacilityWorkplace(con.get("SID").toString(), con.get("UID").toString()));

				if("N".equals(data.get("SENSOR").toString())) sensor = false; else sensor = true;
				if("N".equals(data.get("FIER").toString())) fier = false; else fier = true;
				if("N".equals(data.get("AIR_CLEARING").toString())) airClearing = false; else airClearing = true;

				iFireSensorWorkplace.setFireflag(fier);

				fireSensorService.addFireSensorInfo(iFireSensorWorkplace);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/*********************
	 * 가스
	 * @param con
	 *********************/
	public void processGasData(GasSensorWorkplace iGasSensorWorkplace) {

		try {
			iGasSensorWorkplace.setFacility(facilityRepository.findFacilityWorkplace("GAS_SENSOR",iGasSensorWorkplace.getEntrps().toString()));
			gasService.addGasInfo(iGasSensorWorkplace);
			
//			EventHandlerUtil.analysisEvent("GAS_SENSOR", iGasSensorWorkplace);
			eventHandlerService.analysisEvent("GAS_SENSOR", iGasSensorWorkplace);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * FS 전기 데이터 가공부
	 */
	public void processElectricData(Map<String, Object> cinObj) {
		String con = cinObj.get("con").toString();
		String[] spl = con.split("\\|");		// 이스케이프 문자를 사용하여 | 기준으로 데이터 나눔
		for(String data : spl) {
			System.out.print(data + ", ");
		}
		System.out.println();
		
        // Fcode - sensor Mapping
        Map<String, String> fcodeMap = facilityService.getFacilitySensorMap();
        
		
		String st = spl[0];		// 시작 문자
		
		switch(st) {
			case "ST0": {
				// 주기적 데이터
				String dataLengthStr = spl[spl.length - 2];		// 뒤에서 두번째 문자가 데이터 갯수
				int dataLength = 0;
				try {
					dataLength = Integer.parseInt(dataLengthStr);
				} catch(NumberFormatException e) {
					e.printStackTrace();
					log.error("Electric length data is not number");
					break;
				}				
				
				int count = 1;	// 데이터 순번. 같은 데이터 안에서 몇번째 데이터인지
				try {
					// 전기 센서 별 데이터
					ArrayList<String> dataList = parseElectricData(con);
					for(String data : dataList) {
						ElectronicWorkplace iElectronicWorkplace = new ElectronicWorkplace();
						
						iElectronicWorkplace.setElectronicData(data);
						String id = iElectronicWorkplace.getId();
						
						 //fcodeMap세팅
                        if(fcodeMap.containsKey(id)) {
                        	String electricFcode = fcodeMap.get(id);
                            Facility fac = facilityRepository.findFacility(electricFcode);
//                            fac.setFcode(fcodeMap.get(id));
                            iElectronicWorkplace.setFacility(fac);
                        }		                        
                        
                        //System.out.println(iElectronicWorkplace);                        
                        electronicSensorService.addElectronicSensorInfo(iElectronicWorkplace);
                        
//                        EventHandlerUtil.analysisEvent("ELECTRONIC_BREAKER", iElectronicWorkplace);
            			eventHandlerService.analysisEvent("ELECTRONIC_BREAKER", iElectronicWorkplace);
					}
					
					/*
					for(int i = 0; i < dataLength; i++) {						
						String id = spl[1 + (19 * i)];
						String date = spl[2 + (19 * i)];
						double kwh = Double.parseDouble(spl[3 + (19 * i)]) * 0.1;
						double w = Double.parseDouble(spl[4 + (19 * i)]) * 0.1;
						double v = Double.parseDouble(spl[5 + (19 * i)]) * 0.1;
						double hz = Double.parseDouble(spl[6 + (19 * i)]) * 0.1;
						double pf = Double.parseDouble(spl[7 + (19 * i)]) * 0.001;
						double a = Double.parseDouble(spl[8 + (19 * i)]) * 0.1;
						double igo = Double.parseDouble(spl[9 + (19 * i)]) * 0.001;
						double igr = Double.parseDouble(spl[10 + (19 * i)]) * 0.001;
						double igc = Double.parseDouble(spl[11 + (19 * i)]) * 0.001;
						double om = Double.parseDouble(spl[12 + (19 * i)]) * 0.001;
						int eventAlert = Integer.parseInt(spl[13 + (19 * i)]);
						int leakAlert = Integer.parseInt(spl[14 + (19 * i)]);
						int rssi = Integer.parseInt(spl[15 + (19 * i)]) - 200;
						String extSensor1 = spl[16 + (19 * i)];
						String extSensor2 = spl[17 + (19 * i)];
						
						String recvData = con;
						
						if(id != null) {

							ElectronicWorkplace iElectronicWorkplace = new ElectronicWorkplace();

							iElectronicWorkplace.setId(id);
							iElectronicWorkplace.setDate(date);
							iElectronicWorkplace.setKwh(kwh);
							iElectronicWorkplace.setW(w);
							iElectronicWorkplace.setV(v);
							iElectronicWorkplace.setHz(hz);
							iElectronicWorkplace.setPf(pf);
							iElectronicWorkplace.setA(a);
							iElectronicWorkplace.setIgo(igo);
							iElectronicWorkplace.setIgr(igr);
							iElectronicWorkplace.setIgc(igc);
							iElectronicWorkplace.setOm(om);
							iElectronicWorkplace.setEventAlert(eventAlert);
							iElectronicWorkplace.setRssi(rssi);
							iElectronicWorkplace.setExtSensor1(extSensor1);
                            iElectronicWorkplace.setExtSensor2(extSensor2);            
                            
                            //fcodeMap세팅
                            if(fcodeMap.containsKey(id)) {
                                Facility fac = new Facility();
                                fac.setFcode(fcodeMap.get(id));
                                iElectronicWorkplace.setFacility(fac);
                            }					
							
							electronicSensorService.addElectronicSensorInfo(iElectronicWorkplace);
						}			
					}
					 */
				} catch(Exception e) {
					e.printStackTrace();
					log.error("Electric data parsing error");
				}
				
				break;
			}
			case "STE": {
				// 이벤트 발생
				break;
			}
		}
	}
	
	/**
	 * 전기센서 파싱
	 * @param data
	 * @return
	 */
	private ArrayList<String> parseElectricData(String data) {
		ArrayList<String> list = new ArrayList<>();
		
		if(data != null) {
			while(data.indexOf("|S") > -1) {
				int s = data.indexOf("ST0");		// 시작 Index
				int e = data.indexOf("|S");		// 끝 Index
				list.add(data.substring(s, e));
				
				data = data.substring(e+1);
			}
		}
		
		return list;
	}
}
