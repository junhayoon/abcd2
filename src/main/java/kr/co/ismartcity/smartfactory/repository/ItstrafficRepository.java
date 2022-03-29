package kr.co.ismartcity.smartfactory.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import kr.co.ismartcity.smartfactory.entity.Itstraffic;

@Repository
public interface ItstrafficRepository extends CrudRepository<Itstraffic, Long>, QuerydslPredicateExecutor<Itstraffic> {
	@Modifying
	@Transactional
	@Query(
		value="INSERT INTO"+
			  "		its_traffic_tmp (" +
			  "			link_id, road_name, road_drc_type, link_no, f_node_id, " + 
			  "			t_node_id, speed, travel_time, created_date, reg_date" + 
			  "		) " +
		      "VALUES (" +
			  "		:#{#trafficTmp.link_id}, :#{#trafficTmp.road_name}, :#{#trafficTmp.road_drc_type}, :#{#trafficTmp.link_no}, :#{#trafficTmp.f_node_id}," +
		      "		:#{#trafficTmp.t_node_id}, :#{#trafficTmp.speed}, :#{#trafficTmp.travel_time}, :#{#trafficTmp.created_date}, :#{#trafficTmp.reg_date} " + 
		      ")"
		,nativeQuery=true
	)
	void saveTrafficHistory(@Param("trafficTmp") Itstraffic itstraffic);
}