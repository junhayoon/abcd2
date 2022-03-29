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

public interface FacilityRepository extends CrudRepository<Facility, String>, QuerydslPredicateExecutor<Facility> {

	@Query(value="SELECT * FROM facility WHERE JSON_EXTRACT(properties, CONCAT('$.', :attr)) = :value", nativeQuery=true)
	List<Facility> findFacilityByProperty(String attr, Object value);

	@Query(value="SELECT * FROM facility WHERE JSON_EXTRACT(properties, CONCAT('$.', :attr)) IS NOT NULL AND enabled = TRUE", nativeQuery=true)
	List<Facility> findEnabledFacilityHasProperty(String attr);

	@Query(value="SELECT f.* FROM facility f, facility_category c WHERE c.ccode = 'AIR_SENSOR' AND f.facility_category_ccode = c.ccode", nativeQuery=true)
	List<Facility> findAirSensorFacility();

	@Query(value="SELECT f.* FROM facility f WHERE f.mobius_id = :mobiusId", nativeQuery=true)
	Facility findFacilityByMobiusId(@Param("mobiusId") String mobiusId);

	@Query(value="SELECT f.* FROM facility f, facility_category c WHERE f.enabled = 1 AND c.ccode = 'AIR_SENSOR' AND f.facility_category_ccode = c.ccode", nativeQuery=true)
	List<Facility> findEnabledAirSensorFacility();

	@Query(value="SELECT f.* FROM facility f, facility_category c WHERE c.ccode = 'CCTV_FIRE' AND f.facility_category_ccode = c.ccode", nativeQuery=true)
	List<Facility> findFireCCTVFacility();

	@Query(value="SELECT f.* FROM facility f, facility_category c WHERE c.ccode = 'CCTV_FIRE' AND f.facility_category_ccode = c.ccode AND JSON_EXTRACT(f.properties, '$.vaId') = :vaId", nativeQuery=true)
	Facility findFireCCTVFacility(int vaId);

	@Query(value="SELECT f.* FROM facility f, facility_category c WHERE c.ccode in ('CCTV_FIRE', 'AIR_SENSOR') AND f.facility_category_ccode = c.ccode", nativeQuery=true)
	List<Facility> findNotiFacility();

	@Query(value="SELECT f.* FROM facility f, facility_category c WHERE f.enabled = 1 AND c.ccode in ('CCTV_FIRE', 'AIR_SENSOR') AND f.facility_category_ccode = c.ccode", nativeQuery=true)
	List<Facility> findEnabledNotiFacility();

	@Query(value="SELECT f.* FROM workplace w, facility f WHERE w.id = f.workplace_id and w.id =:id", nativeQuery=true)
	List<Facility> getHavingFacility(@Param("id") Long id);

    @Query(value="SELECT fcode, sensor_id FROM facility_sensor_map  ", nativeQuery=true)
    List<String> findFacilitySensorMap();

	@Query(value="SELECT f.* FROM facility f WHERE f.fcode LIKE CONCAT('%', :fcode, '%') AND f.workplace_id = :workplaceId", nativeQuery=true)
	Facility findFacilityWorkplace(@Param("fcode") String fcode, @Param("workplaceId") String workplaceId);

	@Query(value="SELECT f.* FROM facility f WHERE f.fcode = :fcode", nativeQuery=true)
	Facility findFacility(@Param("fcode") String fcode);

	Page<Facility> findAll(Pageable pageable);
}
