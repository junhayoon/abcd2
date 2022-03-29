package kr.co.ismartcity.smartfactory.controller;

import java.security.Principal;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonFormat;

import kr.co.ismartcity.smartfactory.entity.Facility;
import kr.co.ismartcity.smartfactory.entity.FacilityCategory;
import kr.co.ismartcity.smartfactory.entity.Notification;
import kr.co.ismartcity.smartfactory.service.MessageSourceService;
import kr.co.ismartcity.smartfactory.service.NotificationService;
import kr.co.ismartcity.smartfactory.service.UserService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Data
@RestController
@EnableConfigurationProperties
public class NotificationController {
	
	@Autowired
	NotificationService notiService;
	
    @Autowired
    MessageSourceService messageSourceService;

	@Autowired
	UserService userService;
	
	@PreAuthorize("isAuthenticated()")
	@PutMapping("/api/notification/add")
	public Notification addNotification(Principal principal, @RequestBody Notification noti) {
		
    	noti.setFrom(Integer.parseInt("" + userService.findUserByUsername(principal.getName()).getId()));
    	
		/*
		Notification noti = new Notification();
		noti.setData(null);
		noti.setFacility(facility);
		noti.setFrom(null);
		noti.setInfo(info);
		noti.setLevel(level);
		noti.setRead(false);
		noti.setRemoved(false);		

		noti.setCreate_date(LocalDateTime.now());
		noti.setUpdate_date(LocalDateTime.now());
		*/
		return notiService.addNotification(noti);				
	}

	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/notification")
	public List<Notification> getNotification(Principal principal) {
		return notiService.getAllNotification();				
	}
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/notification/last")
	public List<Notification> getNotification(Principal principal, @RequestParam(required=false, value="count") int count) {
		if (count < 1)
			count = 10;
		
		return notiService.getLastNotification(count);				
	}
	
	@Secured("ROLE_ADMIN")
	@PutMapping("/api/notification/read")
	public void updateNotificationRead(Principal principal, @RequestParam(required=false, value="seq", defaultValue="-1") long seq, HttpServletResponse response) {
		int nRet = -1;
		
		if (principal != null && seq >= 0) {
			nRet = notiService.updateNotificationRead(seq);
		}
		
        if (nRet < 1 ){
            try {
                if (nRet == 0) {
                    response.sendError(nRet, messageSourceService.getMessage("error.database.not_founed"));
                } else {
                    response.sendError(nRet, messageSourceService.getMessage("error.unreal.invalid_param"));
                }
            } catch (Exception e) {
                e.printStackTrace();
                response.setStatus(nRet);
            }
        }
	}
	
	// for airsensor history menu
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/notification/history")
	public Page<Notification> getNotificationHistory(Principal principal, 
												@RequestParam("size") int size, 
												@RequestParam("page") int page, 
												@RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate, 
												@RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
												@RequestParam(required=false, value="orderByDesc", defaultValue="true") boolean orderByDesc,
												@RequestParam(required=false, value="notiLevel", defaultValue="-1") int level,
												@RequestParam(required=false, value="facilityFcode", defaultValue="-1") String id) {
		//log.debug(String.format("getNotificationHistory() 1... ### facilityId(%d) level(%d) size(%d) page(%d) startDate(%s) endDate(%s) orderByDesc(%b)", 
		//						id, level, size, page, startDate, endDate, orderByDesc));
		
		Page<Notification> list = null;
		if (principal != null) {
			PageRequest pageRequest = null;
			if (orderByDesc)
				pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "create_date"));
			else
				pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "create_date"));
						
			if (id == null)
				list = notiService.findNotificationBetweenDate(pageRequest, startDate, endDate, level);
			else
				list = notiService.findNotificationBetweenDateAndId(pageRequest, startDate, endDate, level, id);
		}
		
		//log.debug(String.format("getNotificationHistory() end... Page(%s)", list));
		
		return list;		
	}
}
