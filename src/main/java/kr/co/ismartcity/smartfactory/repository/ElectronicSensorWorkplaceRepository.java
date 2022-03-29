package kr.co.ismartcity.smartfactory.repository;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

import kr.co.ismartcity.smartfactory.entity.ElectronicWorkplace;
import kr.co.ismartcity.smartfactory.entity.FireSensorWorkplace;


public interface ElectronicSensorWorkplaceRepository
extends CrudRepository<ElectronicWorkplace, Long>, QuerydslPredicateExecutor<ElectronicWorkplace> {

}
