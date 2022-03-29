package kr.co.ismartcity.smartfactory.repository;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import kr.co.ismartcity.smartfactory.entity.WindSensorEvent;

@Repository
public interface WindSensorEventRepository extends CrudRepository<WindSensorEvent, Long>, QuerydslPredicateExecutor<WindSensorEvent> {
	WindSensorEvent save(WindSensorEvent windSensorEvent);
}
