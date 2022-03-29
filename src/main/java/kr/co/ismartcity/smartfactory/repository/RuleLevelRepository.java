package kr.co.ismartcity.smartfactory.repository;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

import kr.co.ismartcity.smartfactory.entity.RuleLevel;

public interface RuleLevelRepository extends CrudRepository<RuleLevel, Long>, QuerydslPredicateExecutor<RuleLevel> {
	
}
