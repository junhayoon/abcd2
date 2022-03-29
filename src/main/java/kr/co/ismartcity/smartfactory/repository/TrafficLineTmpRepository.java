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
import kr.co.ismartcity.smartfactory.entity.TrafficLineTmp;

public interface TrafficLineTmpRepository extends CrudRepository<TrafficLineTmp, Long>, QuerydslPredicateExecutor<TrafficLineTmp> {

	@Query(value="SELECT * FROM traffic_line_tmp ORDER BY link_id", nativeQuery=true)
	List<TrafficLineTmp> findTrafficTmp();
	
	@Query(value="SELECT * FROM traffic_line_tmp GROUP BY link_id ORDER BY link_id", nativeQuery=true)	
	List<TrafficLineTmp> findTrafficGroupTmp();
	
	
}
