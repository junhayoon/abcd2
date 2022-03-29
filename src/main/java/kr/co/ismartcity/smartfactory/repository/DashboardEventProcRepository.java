package kr.co.ismartcity.smartfactory.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import kr.co.ismartcity.smartfactory.entity.DashboardEventProc;

@Repository
public interface DashboardEventProcRepository extends CrudRepository<DashboardEventProc, Long>, QuerydslPredicateExecutor<DashboardEventProc> {

	@Query(
			value = "SELECT * FROM dashboard_event_proc WHERE proc_id =:proc_id "
					+ "order by proc_id desc",nativeQuery=true)
	List<DashboardEventProc> findByEventId(@Param("proc_id") Long proc_id);

	
}
