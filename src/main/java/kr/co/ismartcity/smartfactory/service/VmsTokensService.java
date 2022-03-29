package kr.co.ismartcity.smartfactory.service;

import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import kr.co.ismartcity.smartfactory.entity.Facility;
import kr.co.ismartcity.smartfactory.entity.FacilityCategory;
import kr.co.ismartcity.smartfactory.entity.PeopleCnt;
import kr.co.ismartcity.smartfactory.entity.QFacility;
import kr.co.ismartcity.smartfactory.entity.QFacilityCategory;
import kr.co.ismartcity.smartfactory.entity.UticImsOpen;
import kr.co.ismartcity.smartfactory.entity.VmsTokens;
import kr.co.ismartcity.smartfactory.entity.Workplace;
import kr.co.ismartcity.smartfactory.model.FacilityStatus;
import kr.co.ismartcity.smartfactory.repository.FacilityCategoryRepository;
import kr.co.ismartcity.smartfactory.repository.FacilityRepository;
import kr.co.ismartcity.smartfactory.repository.VmsTokensRepository;
import kr.co.ismartcity.smartfactory.repository.WorkplaceRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@ConfigurationProperties
public class VmsTokensService {


	
	@Autowired
	public VmsTokensRepository vmsTokensRepository;


	public int addVmsTokens(VmsTokens vmsTokens) {
		
		int nRet = 0;		
		
		VmsTokens entity = vmsTokensRepository.save(vmsTokens);
		
		return nRet;
	}
	
	public VmsTokens getVmsTokens(String vmsId) {
		
		return vmsTokensRepository.getTokens(vmsId);
	}

	
}