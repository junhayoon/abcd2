package kr.co.ismartcity.smartfactory.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.MessagingException;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;

import kr.co.ismartcity.smartfactory.entity.Facility;
import kr.co.ismartcity.smartfactory.entity.Notification;
import kr.co.ismartcity.smartfactory.entity.QNotification;
import kr.co.ismartcity.smartfactory.repository.NotificationRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class NotificationService {

	@Autowired
	private NotificationRepository notificationRepository;
	
	@Autowired
	public JPAQueryFactory jpaQueryFactory;
	
	@Autowired
	private SimpMessagingTemplate messageTemplate;

	@Autowired
	private ObjectMapper objectMapper;
	
	public Notification addNotification(Notification noti) {
		
		Notification result = null;
		
		try {
			result = notificationRepository.save(noti);
			
			messageTemplate.convertAndSend("/w2c/notification", objectMapper.writeValueAsString(result));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}
	
	public Notification getNotification(Long seq) {	
        Optional<Notification> optional = notificationRepository.findById(seq);
		if(optional.isPresent()) return optional.get();
		return null;
	}	

	public List<Notification> getAllNotification() {
		return (List<Notification>)notificationRepository.findAll();
	}
	
	public List<Notification> getAllNotification(boolean removed) {
		return notificationRepository.findAllByRemoved(removed);
	}
	
	public List<Notification> getAllNotification(Facility facil) {
		return notificationRepository.findAllByFacility(facil);
	}
	
	public List<Notification> getAllNotification(Facility facil, boolean removed) {
		return notificationRepository.findAllByFacilityAndRemoved(facil, removed);
	}

	public List<Notification> getLastNotification(Integer count) {
		return notificationRepository.findLastNotification(count, false);
	}
	
	public List<Notification> getLastNotification(Long facilId, Integer count) {
		return notificationRepository.findLastNotification(facilId, count, false);
	}
	
	public Page<Notification> findNotificationBetweenDate(Pageable pageable, LocalDateTime startDate, LocalDateTime endDate, int level) {    // select     	
    	QNotification noti = QNotification.notification;
    	
    	log.debug(String.format("findNotificationBetweenDate() 1... pageable(%s) startDate(%s) endDate(%s) level(%d)", pageable, startDate, endDate, level));
    	
    	QueryResults<Notification> notiHistory = null;
    	
    	if (level < 0) {
    		notiHistory = jpaQueryFactory.selectFrom(noti)
	    									.where(noti.create_date.between(startDate, endDate))
	    									.orderBy(noti.create_date.desc())
	    									.offset(pageable.getOffset())
	    									.limit(pageable.getPageSize())
	    									.fetchResults();
    	} else {
    		notiHistory = jpaQueryFactory.selectFrom(noti)
											.where(noti.create_date.between(startDate, endDate).and(noti.level.eq(level)))
											.orderBy(noti.create_date.desc())
											.offset(pageable.getOffset())
											.limit(pageable.getPageSize())
											.fetchResults();
    	}

    	//log.debug(String.format("findNotificationBetweenDate() end... notiHistory.size(%d) notiHistory(%s)", notiHistory.getTotal(), notiHistory));
    	
    	return new PageImpl<>(notiHistory.getResults(), pageable, notiHistory.getTotal());
    }
	
	public Page<Notification> findNotificationBetweenDateAndId(Pageable pageable, LocalDateTime startDate, LocalDateTime endDate, int level, String id) {    // select 
    	QNotification noti = QNotification.notification;
    	
      	log.debug(String.format("findNotificationBetweenDateAndId() 1... pageable(%s) startDate(%s) endDate(%s) level(%d) id(%d)", pageable, startDate, endDate, level, id));
    	
    	Facility facil = new Facility();
    	facil.setFcode(id);    	
    	QueryResults<Notification> notiHistory = null;
    	
    	if (level < 0) {
    		notiHistory = jpaQueryFactory.selectFrom(noti)
					.where(noti.create_date.between(startDate, endDate).and(noti.facility.eq(facil)))
//					.where(noti.create_date.between(startDate, endDate).and(noti.facility.id.eq(id)))
					.orderBy(noti.create_date.desc())
					.offset(pageable.getOffset())
					.limit(pageable.getPageSize())
					.fetchResults();
    	} else {
    		notiHistory = jpaQueryFactory.selectFrom(noti)
											.where(noti.create_date.between(startDate, endDate).and(noti.level.eq(level)).and(noti.facility.fcode.eq(id)))
											.orderBy(noti.create_date.desc())
											.offset(pageable.getOffset())
											.limit(pageable.getPageSize())
											.fetchResults();
    	}
    	//return new PageImpl<>(notiHistory, pageable, result.getTotal());
    	
    	
    	log.debug(String.format("findNotificationBetweenDateAndId() end... notiHistory.getTotal(%d) notiHistory(%s)", notiHistory.getTotal(), notiHistory));

    	return new PageImpl<>(notiHistory.getResults(), pageable, notiHistory.getTotal());
    }
	
	public int updateNotificationRead(long seq) {
		return notificationRepository.updateNotificationRead( seq);
	}
	
	public long count() {
		return notificationRepository.count();
	}
	
	public long count(boolean removed) {
		return notificationRepository.count(removed);
	}
		
	public void deleteNotification(Long seq) {
		Notification noti = null;
		Optional<Notification> o = notificationRepository.findById(seq);
		if (o.isPresent()) {
			noti = o.get();
			noti.setRemoved(true);
			
			notificationRepository.save(noti);
		}
	}
	
	public void forceDeleteNotification(Long seq) {
		Optional<Notification> optional = notificationRepository.findById(seq);
		if (optional != null && optional.isPresent()) {
			Notification noti = optional.get();
			notificationRepository.delete(noti);
		}
	}
}