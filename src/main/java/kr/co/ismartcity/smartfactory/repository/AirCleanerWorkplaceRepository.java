package kr.co.ismartcity.smartfactory.repository;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

import kr.co.ismartcity.smartfactory.entity.AirCleanerWorkplace;
import kr.co.ismartcity.smartfactory.entity.AirSensorWorkplace;


public interface AirCleanerWorkplaceRepository
extends CrudRepository<AirCleanerWorkplace, Long>, QuerydslPredicateExecutor<AirCleanerWorkplace> {

	AirCleanerWorkplace save(AirSensorWorkplace iAirSensorWorkplace);

}
