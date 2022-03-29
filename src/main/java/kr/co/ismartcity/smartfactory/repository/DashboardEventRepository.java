package kr.co.ismartcity.smartfactory.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

import kr.co.ismartcity.smartfactory.entity.DashboardEvent;
import kr.co.ismartcity.smartfactory.entity.Facility;

public interface DashboardEventRepository extends CrudRepository<DashboardEvent, Integer>, QuerydslPredicateExecutor<DashboardEvent> {

	@Query(
			value = "SELECT category_cd, grade_cd, count(*) FROM dashboard_event WHERE event_cd ='E' AND checking = 0 GROUP BY category_cd, grade_cd", 
			nativeQuery=true)
	List<String> getUnsolvedEvents();

	@Query(
			value = "select id, checking, create_date_time, c.cd_nm category_cd, dash_facility, dash_user, event_cd, gateway, e.cd_nm grade_cd, "
					+ "update_date_time, create_user_id, update_user_id, facility_fcode, dash_category, flag, facility_id, grade "
					+ "from (select * from (SELECT * FROM dashboard_event WHERE event_cd = 'E' AND grade_cd != 'IF' ORDER BY create_date_time DESC LIMIT 10) e "
					+ "join code c on e.grade_cd = c.cd where c.code_master_cd = '0003') e "
					+ "join code c on e.category_cd = c.cd where c.code_master_cd = '0001' "
					+ "order by create_date_time desc",
			nativeQuery=true)
	List<DashboardEvent> getRecentDashboardEvents();

	@Query(
			value = "SELECT * FROM dashboard_event WHERE DATEDIFF(sysdate(), create_date_time) = 0 "
					+ "order by create_date_time desc", // event_cd = 'E' AND grade_cd = 'CT' AND 
			nativeQuery=true)
	List<DashboardEvent> getTodayDashboardEvents();

	@Query(
			value = "SELECT category_cd, DATE_FORMAT(create_date_time, '%Y-%m'), COUNT(*) "
					+ "FROM dashboard_event "
					+ "WHERE YEAR(create_date_time) = YEAR(SYSDATE()) "
					+ "GROUP BY DATE_FORMAT(create_date_time, '%Y-%m'), category_cd "
					+ "ORDER BY DATE_FORMAT(create_date_time, '%Y-%m')", 
			nativeQuery=true)
	List<String> getDashboardEventCounterByMonth();
	
	@Query(
			value = "select id, checking, create_date_time, c.cd_nm category_cd, dash_facility, dash_user, event_cd, gateway, e.cd_nm grade_cd, "
					+ "update_date_time, create_user_id, update_user_id, facility_fcode, dash_category, flag, facility_id, grade "
					+ "from (select * from (SELECT * FROM dashboard_event WHERE dash_facility = ?1 AND event_cd = 'E' AND grade_cd != 'IF' ORDER BY create_date_time DESC LIMIT 10) e "
					+ "join code c on e.grade_cd = c.cd where c.code_master_cd = '0003') e "
					+ "join code c on e.category_cd = c.cd where c.code_master_cd = '0001' "
					+ "order by create_date_time desc",
			nativeQuery=true)
	List<DashboardEvent> getRecentDashboardEventsByWorkplaceName(String dash_facility);

	@Query(
			value = "select id, checking, create_date_time, c.cd_nm category_cd, dash_facility, ifnull(dash_user, '') dash_user, event_cd, gateway, e.cd_nm grade_cd, "
					+ "update_date_time, create_user_id, update_user_id, facility_fcode, dash_category, flag, facility_id, grade "
					+ "from (select * from (SELECT * FROM dashboard_event WHERE event_cd = ?1 ORDER BY create_date_time DESC) e "
					+ "join code c on e.grade_cd = c.cd where c.code_master_cd = '0003') e "
					+ "join code c on e.category_cd = c.cd where c.code_master_cd = '0001' "
					+ "order by create_date_time desc",
			nativeQuery=true)
	List<DashboardEvent> getDashboardEventsByEventCd(String event_cd);

	@Query(
			value = "UPDATE dashboard_event SET checking = 1, dash_user = ?2, update_user_id = ?3, confirm_message = ?4, update_date_time = NOW() WHERE id = ?1", 
			nativeQuery=true)
	void updateDashboardEventChecking(String id, String user_name, String user_id, String confirm_message);

	@Query(
			value = "SELECT * FROM dashboard_event WHERE id = ?1", 
			nativeQuery=true)
	DashboardEvent findById(String id);

}
