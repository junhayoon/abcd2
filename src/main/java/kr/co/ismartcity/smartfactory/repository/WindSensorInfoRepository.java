package kr.co.ismartcity.smartfactory.repository;

import java.util.List;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import kr.co.ismartcity.smartfactory.entity.WindSensorEvent;
import kr.co.ismartcity.smartfactory.entity.WindSensorInfo;

@Repository
public interface WindSensorInfoRepository extends CrudRepository<WindSensorInfo, Long>, QuerydslPredicateExecutor<WindSensorInfo> {
	// 센서 전체 목록 조회
	List<WindSensorInfo> findAll();
	
//	// 특정 센서 조회
//	WindSensorInfo findById(Integer seq);
}
