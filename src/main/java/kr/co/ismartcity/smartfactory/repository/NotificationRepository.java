package kr.co.ismartcity.smartfactory.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

import kr.co.ismartcity.smartfactory.entity.Facility;
import kr.co.ismartcity.smartfactory.entity.Notification;

public interface NotificationRepository extends CrudRepository<Notification, Long>, QuerydslPredicateExecutor<Notification> {
	List<Notification> findAllByRemoved(boolean removed);	
	List<Notification> findAllByFacility(Facility facil);
	List<Notification> findAllByFacilityAndRemoved(Facility facil, boolean removed);

	@Query(value="SELECT * FROM notification WHERE is_removed = :removed ORDER BY create_date DESC limit 0, :count", nativeQuery = true)
    List<Notification> findLastNotification(Integer count, boolean removed);
	
	@Query(value="SELECT * FROM notification WHERE is_removed = :removed AND facility_fcode = :facilId ORDER BY create_date DESC limit 0, :count", nativeQuery = true)
    List<Notification> findLastNotification(Long facilId, Integer count, boolean removed);
		
	@Query(value="SELECT count(*) FROM notification WHERE is_removed = :removed", nativeQuery = true)
	long count(boolean removed);
	
	@Query(value="UPDATE notification SET is_read = 1 WHERE seq = :seq", nativeQuery = true)
	int updateNotificationRead(long seq);
}
