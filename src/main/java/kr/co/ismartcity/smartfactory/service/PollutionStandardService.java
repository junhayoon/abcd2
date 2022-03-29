package kr.co.ismartcity.smartfactory.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.querydsl.jpa.impl.JPAQueryFactory;

import kr.co.ismartcity.smartfactory.entity.PollutionStandard;
import kr.co.ismartcity.smartfactory.entity.User;
import kr.co.ismartcity.smartfactory.repository.PollutionStandardRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class PollutionStandardService {

	@Autowired
	public PollutionStandardRepository pollutionStandardRepository;
	
	@Autowired
	public JPAQueryFactory jpaQueryFactory;

	public PollutionStandard getPollutionStandardInfo() {

		List<PollutionStandard> pollutionStandard = null;
		try {
			pollutionStandard = pollutionStandardRepository.getPollutionStandardInfo();
			
			if (pollutionStandard != null) {
				return pollutionStandard.get(0);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return null;
	}
}
