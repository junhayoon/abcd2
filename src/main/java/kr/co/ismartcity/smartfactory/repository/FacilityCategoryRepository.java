package kr.co.ismartcity.smartfactory.repository;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

import kr.co.ismartcity.smartfactory.entity.FacilityCategory;

public interface FacilityCategoryRepository extends CrudRepository<FacilityCategory, String>, QuerydslPredicateExecutor<FacilityCategory> {

}
