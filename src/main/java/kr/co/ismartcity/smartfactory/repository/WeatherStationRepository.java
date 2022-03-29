package kr.co.ismartcity.smartfactory.repository;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import kr.co.ismartcity.smartfactory.entity.WeatherStation;

@Repository
public interface WeatherStationRepository extends CrudRepository<WeatherStation, Long>, QuerydslPredicateExecutor<WeatherStation> {
	
}