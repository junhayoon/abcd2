package kr.co.ismartcity.smartfactory.repository;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import kr.co.ismartcity.smartfactory.entity.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long>, QuerydslPredicateExecutor<User> {
	
}
