package kr.co.ismartcity.smartfactory.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import kr.co.ismartcity.smartfactory.entity.FreeSetLine;
import kr.co.ismartcity.smartfactory.entity.TrafficLine;


public interface TrafficLineRepository extends CrudRepository<TrafficLine, Long>, QuerydslPredicateExecutor<TrafficLine> {

	@Query(value="SELECT * FROM traffic_line ORDER BY seq, link_id", nativeQuery=true)
	List<TrafficLine> findTraffic();
	
	@Query(value="SELECT * FROM traffic_line GROUP BY link_id ORDER BY seq, link_id", nativeQuery=true)	
	List<TrafficLine> findTrafficGroup();
	
	@Query(value="SELECT seq, reg_date,a.link_id,latitude,longitude,b.speed speed,isUpdown,create_date_time,update_date_time,create_user_id, update_user_id from traffic_line a,(select speed,reg_date,link_id from  its_traffic it where sno in (select max(sno) from its_traffic group by link_id)) b where a.link_id = b.link_id order by a.seq , a.link_id", nativeQuery=true)	
	List<TrafficLine> findTrafficSpeed();
	
	@Query(value="SELECT seq, reg_date,a.link_id,latitude,longitude,b.speed speed,isUpdown,create_date_time,update_date_time,create_user_id, update_user_id from traffic_line a,(select speed,reg_date,link_id from  its_traffic it where sno in (select max(sno) from its_traffic group by link_id)) b where a.link_id = b.link_id group by a.link_id order by a.seq , a.link_id", nativeQuery=true)	
	List<TrafficLine> findTrafficSpeedGroup();
	
	
}
