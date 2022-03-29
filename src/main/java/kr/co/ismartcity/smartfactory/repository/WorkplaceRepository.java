package kr.co.ismartcity.smartfactory.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import kr.co.ismartcity.smartfactory.entity.Facility;
import kr.co.ismartcity.smartfactory.entity.Workplace;

public interface WorkplaceRepository extends CrudRepository<Workplace, Long>, QuerydslPredicateExecutor<Workplace> {

	Page<Workplace> findAll(Pageable pageable);
	
	@Query(value="SELECT * from workplace w WHERE sensor_setting = '{\"air\":{\"gateway\":\"O\",\"sensor\":\"O\",\"cleaner\":\"O\"}}'", nativeQuery=true)
	Page<Workplace> findAir(Pageable pageable);
	
	@Query(value="SELECT w.* FROM workplace w, facility f where f.facility_category_ccode ='AIR_SENSOR' AND w.id = f.workplace_id", nativeQuery=true)
	List<Workplace> getAirSensorFilter();
	
	@Query(value="SELECT w.* FROM workplace w, facility f where f.facility_category_ccode ='AIR_CLEANER' AND w.id = f.workplace_id", nativeQuery=true)
	List<Workplace> getAirCleanerFilter();
	
	@Query(value="SELECT w.* FROM workplace w, facility f where f.facility_category_ccode ='ELECTRONIC_BREAKER' AND w.id = f.workplace_id", nativeQuery=true)
	List<Workplace> getFireSensorFilter();
	
	@Query(value="SELECT w.* FROM workplace w, facility f where f.facility_category_ccode ='GAS_SENSOR' AND w.id = f.workplace_id", nativeQuery=true)
	List<Workplace> getGasSensorFilter();
	
}
