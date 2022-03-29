package kr.co.ismartcity.smartfactory.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.ismartcity.smartfactory.entity.DeviceEvent;
import kr.co.ismartcity.smartfactory.repository.DeviceEventRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class DeviceEventService {

	@Autowired
	private DeviceEventRepository deviceEventRepository;
	
	@Autowired
	private EventHandleService eventHandleService;

	public DeviceEvent addDeviceEvent(DeviceEvent deviceEvent) {
		
		DeviceEvent iDeviceEvent = deviceEventRepository.save(deviceEvent);
		eventHandleService.analysisEvent("FIRE_CAMERA", deviceEvent);
		
		return iDeviceEvent;
	}


}