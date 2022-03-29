package kr.co.ismartcity.smartfactory.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import kr.co.ismartcity.smartfactory.entity.FreeSetLine;

public interface FreeSetLineRepository extends CrudRepository<FreeSetLine, Long>, QuerydslPredicateExecutor<FreeSetLine> {

	@Query(value="SELECT * FROM free_set_line WHERE use_yn = 'Y' AND free_set_no = :freeSetNo AND free_set_area = :freeSetArea ORDER BY group_no, sort_no", nativeQuery=true)
	List<FreeSetLine> findFreeSetLine(@Param("freeSetNo") String freeSetNo, @Param("freeSetArea") String freeSetArea);
	
	@Query(value="SELECT * FROM free_set_line WHERE use_yn = 'Y' AND free_set_no = :freeSetNo AND free_set_area = :freeSetArea GROUP BY group_no ORDER BY group_no, sort_no", nativeQuery=true)
	List<FreeSetLine> findFreeSetLineGroup(@Param("freeSetNo") String freeSetNo, @Param("freeSetArea") String freeSetArea);
	
	@Query(value="SELECT * FROM free_set_line WHERE use_yn = 'Y' AND free_set_no = '000' AND free_set_area = '000' ORDER BY sort_no", nativeQuery=true)
	List<FreeSetLine> findMapFreeSet();
	
	@Query(value="SELECT * FROM free_set_line WHERE use_yn = 'Y' AND free_set_no = '111' ORDER BY free_set_area, sort_no", nativeQuery=true)
	List<FreeSetLine> findMapTrafficFreeSet();
	
	@Query(value="SELECT f.* FROM free_set_line f WHERE f.use_yn = 'Y' AND f.free_set_no = 111 GROUP BY f.free_set_area ORDER BY f.free_set_area", nativeQuery=true)
	List<FreeSetLine> findMapTrafficGroupFreeSet();
	
	@Query(value="SELECT * FROM free_set_line WHERE use_yn = 'Y' AND free_set_no = :freeSetNo AND grade = 'A' ORDER BY free_set_area, group_no, sort_no", nativeQuery=true)
	List<FreeSetLine> findFreeSetGrade(@Param("freeSetNo") String freeSetNo);
	
	@Query(value="SELECT * FROM free_set_line WHERE use_yn = 'Y' AND free_set_no = :freeSetNo AND grade = 'A' GROUP BY free_set_area, group_no ORDER BY free_set_area, group_no", nativeQuery=true)
	List<FreeSetLine> findFreeSetGradeGroup(@Param("freeSetNo") String freeSetNo);
}
