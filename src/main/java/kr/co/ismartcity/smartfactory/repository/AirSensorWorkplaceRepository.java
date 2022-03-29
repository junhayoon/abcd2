package kr.co.ismartcity.smartfactory.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import kr.co.ismartcity.smartfactory.entity.AirSensorWorkplace;


public interface AirSensorWorkplaceRepository 
extends CrudRepository<AirSensorWorkplace, Long>, QuerydslPredicateExecutor<AirSensorWorkplace> {
	List<AirSensorWorkplace> 	findAllByFacilityFcode(String facilId);	
	
	//@Query(value="SELECT * FROM air_sensor_workplace a, (SELECT MAX(seq) seq FROM air_sensor_workplace GROUP BY facil_id) b WHERE a.seq = b.seq", nativeQuery = true)
	@Query(value = 	"SELECT a.* " +
					"FROM air_sensor_workplace a, (SELECT MAX(seq) seq FROM air_sensor_workplace GROUP BY facility_fcode) b " +					
					"WHERE a.seq = b.seq", nativeQuery = true)
    List<AirSensorWorkplace> 	getLastAirInfo();
	
	@Query(value="SELECT * FROM air_sensor_workplace WHERE facility_fcode = :facilId ORDER BY seq desc LIMIT 1", nativeQuery = true)
    AirSensorWorkplace 			findLastAirInfo(@Param("facilId") String facilId);	
	
	//@Query(value="SELECT * FROM air_sensor_workplace WHERE facility_fcode = :facilId ORDER BY seq desc LIMIT :limit OFFSET :offset", nativeQuery = true)
	@Query(value="SELECT a.* " +
				 "FROM (SELECT * FROM air_sensor_workplace WHERE facility_fcode = :facilId ORDER BY create_date desc LIMIT :limit OFFSET :offset) a " +
				 "ORDER BY a.create_date ", nativeQuery = true)
	List<AirSensorWorkplace>	getAirInfoLogs(@Param("facilId") String facilId, @Param("offset") int offset, @Param("limit") int limit);

	@Query(value="SELECT count(*) FROM air_sensor_workplace WHERE facility_fcode = :facilId", nativeQuery = true)
	long count(Long facilId);
	
	@Query(value="SELECT count(facility_fcode) cnt FROM ( SELECT facility_fcode FROM air_sensor_workplace GROUP BY facility_fcode ) a", nativeQuery = true)
	long countAirSensor();

	@Query(value="SELECT A.* FROM air_sensor_workplace A, ( " +
				 "	SELECT MAX(seq) seq " +
				 "	FROM air_sensor_workplace " +
				 "	WHERE facility_fcode = :facilId " +
				 "	GROUP by SUBSTR(create_date,1,15) " +
				 "	ORDER by MAX(seq) DESC " +
				 "	LIMIT :limit OFFSET :offset " +
				 " ) B  " +
				 " WHERE A.seq = B.seq " +
				 " ORDER by seq "
				 , nativeQuery = true)
	List<AirSensorWorkplace> getAirInfoLogsByGroup(@Param("facilId") String facilId, @Param("offset") int offset, @Param("limit") int limit);
}
