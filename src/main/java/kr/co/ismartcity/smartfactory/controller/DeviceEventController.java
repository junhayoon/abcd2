package kr.co.ismartcity.smartfactory.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import kr.co.ismartcity.smartfactory.entity.DeviceEvent;
import kr.co.ismartcity.smartfactory.service.DeviceEventService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class DeviceEventController {

	@Autowired
	DeviceEventService deviceEventService;

	@PostMapping("/api/deviceEvent")
	public void createUsers(Principal principal, @RequestBody DeviceEvent deviceEvent) {
		if(principal != null && deviceEvent != null) {
			deviceEventService.addDeviceEvent(deviceEvent);
		}
	}


}
