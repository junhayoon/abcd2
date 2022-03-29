package kr.co.ismartcity.smartfactory.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import kr.co.ismartcity.smartfactory.entity.FreeSetLine;
import kr.co.ismartcity.smartfactory.entity.PeopleCnt;

public interface PeopleCntRepository extends CrudRepository<PeopleCnt, String>, QuerydslPredicateExecutor<FreeSetLine> {

	@Query(value="SELECT * FROM people_cnt limit 1", nativeQuery=true)
	PeopleCnt peopleId();
	
}
