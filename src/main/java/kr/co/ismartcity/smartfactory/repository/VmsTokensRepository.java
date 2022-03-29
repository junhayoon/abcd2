package kr.co.ismartcity.smartfactory.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import kr.co.ismartcity.smartfactory.entity.AirSensorWorkplace;
import kr.co.ismartcity.smartfactory.entity.Facility;
import kr.co.ismartcity.smartfactory.entity.VmsTokens;
import kr.co.ismartcity.smartfactory.entity.Workplace;

public interface VmsTokensRepository extends CrudRepository<VmsTokens, Long>, QuerydslPredicateExecutor<VmsTokens> {

	@Query(value="SELECT * FROM vms_tokens WHERE vms_id =:vmsId order by seq desc limit 1", nativeQuery = true)
    VmsTokens getTokens(@Param("vmsId") String vmsId);
	
}
