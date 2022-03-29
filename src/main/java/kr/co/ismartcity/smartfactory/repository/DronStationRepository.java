package kr.co.ismartcity.smartfactory.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

import kr.co.ismartcity.smartfactory.entity.DronStation;
import kr.co.ismartcity.smartfactory.entity.FreeSetLine;

public interface DronStationRepository extends CrudRepository<DronStation, Long>, QuerydslPredicateExecutor<DronStation> {

	@Query(value="SELECT * FROM dron_drive_log", nativeQuery=true)
	List<DronStation> findDronStationInfo();
}
