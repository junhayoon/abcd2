package kr.co.ismartcity.smartfactory.repository;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

import kr.co.ismartcity.smartfactory.entity.EventFromVa;

public interface EventFromVaRepository 
extends CrudRepository<EventFromVa, Long>, QuerydslPredicateExecutor<EventFromVa> {

}
