package kr.co.ismartcity.smartfactory.service;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import io.netty.handler.codec.http.websocketx.extensions.WebSocketExtensionUtil;
import kr.co.ismartcity.smartfactory.entity.WindSensorEvent;
import kr.co.ismartcity.smartfactory.entity.WindSensorInfo;
import kr.co.ismartcity.smartfactory.repository.WindSensorEventRepository;
import kr.co.ismartcity.smartfactory.repository.WindSensorInfoRepository;
import kr.co.ismartcity.smartfactory.util.WebSocketUtil;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class WindSensorService extends Thread {

	@Autowired
	private WindSensorInfoRepository windSensorInfoRepository;
	
	@Autowired
	private WindSensorEventRepository windSensorEventRepository;
	
	@PostConstruct
	public void init() {
		
		List<WindSensorInfo> sensorInfo = windSensorInfoRepository.findAll();
		
		for(WindSensorInfo info : sensorInfo) {
			String sensorIp = info.getSensor_ip();
			Integer sensorPort = Integer.parseInt(info.getSensor_port());
			
			Thread windThread = new Thread(new Runnable() {
				public void run() {
					socketConnect(sensorIp, sensorPort);
				}
			});
			windThread.start();
		}
		
	}

	/**
	 * 풍향/풍속 서버 소켓 연결
	 */
	private void socketConnect(String ipAddress, Integer port) {
		Socket socket = null;
		DataInputStream input = null;
		BufferedReader reader = null;
		try {
			socket = new Socket(ipAddress, port);
			if(socket.isConnected()) {
//				log.debug("풍향훙속 소켓 연결 성공");
				input = new DataInputStream(socket.getInputStream());
				reader = new BufferedReader(new InputStreamReader(input, "UTF-8"));
				String readerStr = null;
				
				while((readerStr = reader.readLine()) != null) {
					recieveData(readerStr, ipAddress, port);
				}
			}
		} catch (Exception e) {
//			log.debug("풍향훙속 소켓 연결 실패");
			reconnet(socket, ipAddress, port);
		}
	}

	/**
	 * 풍향/풍속 데이터 처리 부분
	 * @param receiveData(String): 전달받은 데이터
	 */
	private void recieveData(String receiveData, String ipAddress, Integer port) {
		String receiveStr = receiveData.substring(receiveData.indexOf("$"));
		String dataStr = receiveStr.substring(1);
		String[] dataArr = dataStr.split(",");
		Double direction = Double.parseDouble(dataArr[1]);
		Double speed = Double.parseDouble(dataArr[3]);
		
		WindSensorEvent windSensorEvent = new WindSensorEvent();
		windSensorEvent.setDevice_ip(ipAddress);
		windSensorEvent.setDevice_port(port);
		windSensorEvent.setRecv_data(receiveStr);
		windSensorEvent.setWind_direction(direction);
		windSensorEvent.setWind_speed(speed);
		
		WebSocketUtil.sendMessage("wind", windSensorEvent);
		
		windSensorEventRepository.save(windSensorEvent);
	}
	
	/**
	 * 소켓 연결 해제시 재연결 
	 */
	private void reconnet(Socket socket, String ipAddress, Integer port) {
		try {
			if(socket != null) {
				socket.close();
				socket = null;
			}
			socketConnect(ipAddress, port);
			
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
