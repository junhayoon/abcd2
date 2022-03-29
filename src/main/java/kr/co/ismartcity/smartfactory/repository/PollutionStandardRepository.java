package kr.co.ismartcity.smartfactory.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

import kr.co.ismartcity.smartfactory.entity.Facility;
import kr.co.ismartcity.smartfactory.entity.PollutionStandard;

public interface PollutionStandardRepository extends CrudRepository<PollutionStandard, Long>, QuerydslPredicateExecutor<PollutionStandard> {

	@Query(value="SELECT * FROM pollution_standard WHERE JSON_EXTRACT(properties, CONCAT('$.', :attr)) = :value", nativeQuery=true)
	List<PollutionStandard> findPollutionStandardByProperty(String attr, Object value);

	@Query(value="SELECT p.* FROM pollution_standard p LIMIT 1", nativeQuery=true)
	List<PollutionStandard> getPollutionStandardInfo();
		
	Page<PollutionStandard> findAll(Pageable pageable);
}
