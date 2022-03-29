package kr.co.ismartcity.smartfactory.repository;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

import kr.co.ismartcity.smartfactory.entity.FireSensorWorkplace;


public interface FireSensorWorkplaceRepository
extends CrudRepository<FireSensorWorkplace, Long>, QuerydslPredicateExecutor<FireSensorWorkplace> {

	FireSensorWorkplace save(FireSensorWorkplace iFireSensorWorkplace);

}
