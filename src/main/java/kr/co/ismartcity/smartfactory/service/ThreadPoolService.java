package kr.co.ismartcity.smartfactory.service;

import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.util.Map;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import kr.co.ismartcity.smartfactory.entity.PeopleCnt;

import kr.co.ismartcity.smartfactory.entity.GasSensorWorkplace;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ThreadPoolService {

	@Autowired
	MqttAirSensorService mqttAirSensorService;

    @Autowired
    PeopleCntService peopleCntService;
    
	@Async("writeFileThreadPoolTaskExecutor")
	public void writeFile(String filename, byte[] data) {

		if(data != null) {
			try {
				RandomAccessFile stream = new RandomAccessFile(filename, "rw");
			    FileChannel channel = stream.getChannel();
			    ByteBuffer buffer = ByteBuffer.allocate(data.length);
			    buffer.put(data);
			    buffer.flip();
			    channel.write(buffer);
			    stream.close();
			    channel.close();
			} catch (IOException e) {
				log.error("{}", e.getMessage(), e);
			}
		}

	}
	
	@Async("parseMobiusThreadPoolTaskExecutor")
	public void parseMobius(String sur, Map<String, Object> cinObj, String surfull) {
		try {
			if (sur.startsWith("/")) {
				if(surfull.indexOf("Workplace_0005")>0) {
					/*********** 가스 *****/
					GasSensorWorkplace iGasSensorWorkplace = new GasSensorWorkplace();


					String haxCon = cinObj.get("con").toString();
					String[] arrHaxCon = haxCon.split(" ");

					//02 d3 07 4c 41 4b 5f 53 53 5f 01 00 00 00 8a 00 46 00 2c 01 60 09 14 00 0a 00 1e 00 47 41 53 5f 53 53 5f 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 05 00 46 45 03

					//log.debug("!@#!@#!@ : " + haxCon);

					/*********** 헥사 순서 변환 *****/
					String data = "";
					int code ;
					//업체코드
					iGasSensorWorkplace.setEntrps(Integer.parseInt(arrHaxCon[2] + arrHaxCon[1],16));
					//센서코드
					data = arrHaxCon[3] + arrHaxCon[4] + arrHaxCon[5] + arrHaxCon[6] + arrHaxCon[7] + arrHaxCon[8] +arrHaxCon[9];
					code = Integer.parseInt(arrHaxCon[11] + arrHaxCon[10],16);
					iGasSensorWorkplace.setSensor_code(hexToAscii(data)+ code);
					//에러상태
					iGasSensorWorkplace.setError_status(Integer.parseInt(arrHaxCon[13] + arrHaxCon[12],16));
					//측정값
					iGasSensorWorkplace.setMesure(Integer.parseInt(arrHaxCon[15] + arrHaxCon[14],16));
					//OpenSetData
					iGasSensorWorkplace.setOpen_set_data(Integer.parseInt(arrHaxCon[17] + arrHaxCon[16],16));
					//LowSetData
					iGasSensorWorkplace.setLow_set_data(Integer.parseInt(arrHaxCon[19] + arrHaxCon[18],16));
					//High SetData
					iGasSensorWorkplace.setHigh_set_data(Integer.parseInt(arrHaxCon[21] + arrHaxCon[20],16));
					//Open Delay Time
					iGasSensorWorkplace.setOpen_delay_time(Integer.parseInt(arrHaxCon[23] + arrHaxCon[22],16)/10.0);
					//Wet Delay Time
					iGasSensorWorkplace.setWet_delay_time(Integer.parseInt(arrHaxCon[25] + arrHaxCon[24],16)/10.0);
					//Leak Delay Time
					iGasSensorWorkplace.setLeak_delay_time(Integer.parseInt(arrHaxCon[27] + arrHaxCon[26],16)/10.0);


					//센서코드
					data = arrHaxCon[28] + arrHaxCon[29] + arrHaxCon[30] + arrHaxCon[31] + arrHaxCon[32] + arrHaxCon[33] +arrHaxCon[34];
					code = Integer.parseInt(arrHaxCon[36] + arrHaxCon[35],16);
					iGasSensorWorkplace.setGas_sensor(hexToAscii(data)+ code);
					//에러상태
					iGasSensorWorkplace.setGas_error_status(Integer.parseInt(arrHaxCon[38] + arrHaxCon[37],16));



			        Long i = Long.parseLong(arrHaxCon[42] + arrHaxCon[41] + arrHaxCon[40] + arrHaxCon[39], 16);
			        Float f = Float.intBitsToFloat(i.intValue());
					//축정값
					//iGasSensorWorkplace.setGas_mesure(Long.parseLong(arrHaxCon[42] + arrHaxCon[41] + arrHaxCon[40] + arrHaxCon[39],16));
					iGasSensorWorkplace.setGas_mesure(f);

					//1차 경고점
					i = Long.parseLong(arrHaxCon[46] + arrHaxCon[45] + arrHaxCon[44] + arrHaxCon[43], 16);
			        f = Float.intBitsToFloat(i.intValue());
					//iGasSensorWorkplace.setWarn_1(Long.parseLong(arrHaxCon[46] + arrHaxCon[45] + arrHaxCon[44] + arrHaxCon[43],16));
					iGasSensorWorkplace.setWarn_1(f);

					//2차 경고점
					i = Long.parseLong(arrHaxCon[50] + arrHaxCon[49] + arrHaxCon[48] + arrHaxCon[47], 16);
			        f = Float.intBitsToFloat(i.intValue());
					//iGasSensorWorkplace.setWarn_2(Long.parseLong(arrHaxCon[50] + arrHaxCon[49] + arrHaxCon[48] + arrHaxCon[47],16));
					iGasSensorWorkplace.setWarn_2(f);

					//Gas Error Delay Time
					iGasSensorWorkplace.setGas_error_delay_time((Integer.parseInt(arrHaxCon[52] + arrHaxCon[51],16)/10.0));

					//BCC
					iGasSensorWorkplace.setBbc(Integer.parseInt(arrHaxCon[54] + arrHaxCon[53],16));

					iGasSensorWorkplace.setRecv_data(haxCon);
					mqttAirSensorService.processGasData(iGasSensorWorkplace);
					
					
					
				} else if(surfull.indexOf("Workplace_0007")>0) {
					// 전기 데이터 수신부
					mqttAirSensorService.processElectricData(cinObj);

				} else if(surfull.indexOf("Workplace_0008") > 0) {
					// 피플카운트 데이터 수신부
					String conStr = (String)cinObj.get("con");
					// 줄바꿈 기준으로 데이터 배열화
					String[] conArr = conStr.split("\\r\\n");
					// 첫줄 데이터내 요청 경로 문자열 추출(피플카운팅이 GET 파라미터로 데이터 전달)
					String forCvrtStr = conArr[0];
					int startPos = forCvrtStr.indexOf("?") + 1;
					int endPos = forCvrtStr.indexOf("HTTP");
					String queryString = forCvrtStr.substring(startPos, endPos).trim();
					Map<String, String> paramMap = new HashMap<>();
					
					String[] paramArr = queryString.split("&");
					
					for(String tmpParamStr : paramArr) {
						String[] devideParamArr = tmpParamStr.split("=");
						if(devideParamArr.length >= 2) {
							paramMap.put(devideParamArr[0], devideParamArr[1]);
						}
					}
					
					String camId = (String)paramMap.get("camId");
					String inOut = (String)paramMap.get("inOut");
					Long inpMs =  Long.parseLong(paramMap.get("inpMs"));
					Long totCnt = Long.parseLong(paramMap.get("totCnt"));
					Long lineNo = Long.parseLong(paramMap.get("lineNo"));
					String dateStr = (String)paramMap.get("inpTm");
					
					DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
					LocalDateTime inpTm = LocalDateTime.parse(dateStr, formatter);
					
					PeopleCnt peoplecnt = new PeopleCnt();
					
					peoplecnt.setCamId(camId);
					peoplecnt.setInOut(inOut);
					peoplecnt.setInpMs(inpMs);
					peoplecnt.setTotCnt(totCnt);
					peoplecnt.setLineNo(lineNo);
					peoplecnt.setInpTm(inpTm);
					//카메라타임의 불일치로 인해 서버타임 컬럼추가 yjh
					peoplecnt.setCreate_date(LocalDateTime.now());
					
					peopleCntService.addPeopleCnt(peoplecnt);
				

				} else {
					/******20211130 kjw 기존 소스 주석처리 *********/
					//String mobiusId = sur;
					//mqttAirSensorService.processAirSensorData(mobiusId, cinObj);
					/****************************************/
					//게이트웨이
					String sid = "";

					Map<String, Object> conObj = (Map<String, Object>)cinObj.get("con");
					//log.debug(conObj.get("CMD").toString());
					String cmd = (String)conObj.get("CMD");
//					if(cmd!=null) {
//						String reset = "RESET";
//						Object obj = "AIR_SENSOR";
//						Object obj2 = 1004;
//						
//						
//						if(cmd.equals(reset) ) {
//							log.debug("조건문 성공 인천스마트시티 제품만 TEST");
//							conObj.put("SID", "AIR_SENSOR");
//							conObj.put("UID", 1004);
//						}
//					}

					sid = (String)conObj.get("SID");
					log.info("sid : " + sid);

					sid = (String) conObj.get("SID");
					
					switch(sid) {
					    case "AIR_SENSOR":
					    	//6종센서
					    	mqttAirSensorService.processAirSensorData(conObj);
					    	break;
					    case "AIR_CLEANER":
					    	//공기클리너
					    	mqttAirSensorService.processAirCleanerData(conObj);
					    	break;
					    case "FIRE_SENSOR":
					    	//화제센서
					        mqttAirSensorService.processFireSensorData(conObj);
					        break;
					    case "":
					    	//통신장애(작업중)
					        mqttAirSensorService.processHeartbeatSensorData(conObj);
					        break;
					    default:
					    	log.error("########## SID ERROR : " + sid);
					    	break;
					}
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private static String hexToAscii(String hexStr) {
	    StringBuilder output = new StringBuilder("");

	    for (int i = 0; i < hexStr.length(); i += 2) {
	        String str = hexStr.substring(i, i + 2);
	        output.append((char) Integer.parseInt(str, 16));
	    }

	    return output.toString();
	}
}



