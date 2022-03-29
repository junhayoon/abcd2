package kr.co.ismartcity.smartfactory.service;

import java.io.IOException;
import java.net.InetAddress;
import java.net.MalformedURLException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;

import kr.co.ismartcity.smartfactory.entity.AirSensorWorkplace;
import kr.co.ismartcity.smartfactory.entity.Facility;
import kr.co.ismartcity.smartfactory.entity.QAirSensorWorkplace;
import kr.co.ismartcity.smartfactory.repository.AirSensorWorkplaceRepository;
import kr.co.ismartcity.smartfactory.util.SmtpSender;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@Component
@Configuration
@ConfigurationProperties
@PropertySource(value = { "classpath:/application.yaml", "classpath:/application-common.yaml",
		"classpath:/application-sub.yaml" // "classpath:/application-${spring.profiles.active}.yaml"
})
public class AirSensorWorkplaceService {

	@Value("${spring.profiles.active}")
	private String server_active_mode;

	@Value("${mobius.address}")
	private String mobius_ip;

	@Value("${server.port}")
	private String server_port;

	final static public String defaultSymbolPath = "static/symbol/airsensor";

	@Autowired
	private AirSensorWorkplaceRepository airSensorRepository;

	@Autowired
	public JPAQueryFactory jpaQueryFactory;

	@Autowired
	SmtpSender smtpSender;

	public AirSensorWorkplace addAirInfo(AirSensorWorkplace airSensorInfo) {

		InetAddress local;
		String local_server = "";
		try {
			local = InetAddress.getLocalHost();
			local_server = local.getHostAddress() + ":" + server_port + "(" + local.getHostName() + ")";
			log.debug("local_server ip : " + local_server);
		} catch (Exception e1) {
			e1.printStackTrace();
		}

		airSensorInfo.setServer_info(local_server);
		airSensorInfo.setMobius_ip(mobius_ip);

		return airSensorRepository.save(airSensorInfo);
	}

	public List<AirSensorWorkplace> getAllInfo() {
		return (List<AirSensorWorkplace>) airSensorRepository.findAll();
	}

	public List<AirSensorWorkplace> getAllInfo(String facilId) {
		return (List<AirSensorWorkplace>) airSensorRepository.findAllByFacilityFcode(facilId);
	}

	public AirSensorWorkplace getAirInfo(Long seq) {
		Optional<AirSensorWorkplace> optional = airSensorRepository.findById(seq);
		if (optional.isPresent())
			return optional.get();
		return null;
	}

	public List<AirSensorWorkplace> getLastAirInfo() {
		return (List<AirSensorWorkplace>) airSensorRepository.getLastAirInfo();
	}

	public AirSensorWorkplace getLastAirInfo(String facilId) {
		return airSensorRepository.findLastAirInfo(facilId);
	}

	// @Scheduled(cron = "00 00 11 * * *") // 매일 11시
	@Scheduled(cron = "0 00 09 * * *") // 매일 09시 : 초, 분, 시, 일, 월, 요일
	public void sendLastAirInfo() {

		if ("prod".equals(server_active_mode)) {

			String content = "";

			List<AirSensorWorkplace> list = (List<AirSensorWorkplace>) airSensorRepository.getLastAirInfo();
			for (int i = 0; i < list.size(); i++) {
				AirSensorWorkplace item = list.get(i);
				content += "[" + item.getFacility().getFacilityName() + "]";
				content += "<BR>수신일시:" + item.getCreate_date();
				content += "<BR>수신내용:" + item.getRecv_data();
				content += "<BR><BR>";
			}
			content += "끝.";

			try {
				smtpSender.sendMail("[" + server_active_mode + "] 사업장별 센서데이터 수집결과", content);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	public List<AirSensorWorkplace> getAirInfoLogs(String facilId, int offset, int limit) {
		return (List<AirSensorWorkplace>) airSensorRepository.getAirInfoLogs(facilId, offset, limit);
	}

	public List<AirSensorWorkplace> getAirInfoLogsByGroup(String facilId, int offset, int limit) {
		return (List<AirSensorWorkplace>) airSensorRepository.getAirInfoLogsByGroup(facilId, offset, limit);
	}

	public long count() {
		return airSensorRepository.count();
	}

	public long count(Long facilId) {
		return airSensorRepository.count(facilId);
	}

	public long countAirSensor() {
		return airSensorRepository.countAirSensor();
	}

	public void deleteAirInfo(Long seq) {
		Optional<AirSensorWorkplace> optional = airSensorRepository.findById(seq);
		if (optional != null && optional.isPresent()) {
			AirSensorWorkplace air = optional.get();
			airSensorRepository.delete(air);
		}
	}

	public Resource loadFileAsResource(String fileName) {
		// log.debug("loadFileAsResource() 1..." + defaultSymbolPath + "/" + fileName);
		ClassPathResource pathResource = new ClassPathResource(defaultSymbolPath + "/" + fileName);

		try {
			Resource r = new UrlResource(pathResource.getURI());
			return r;
		} catch (MalformedURLException ex) {
			ex.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return null;
	}

	public Page<AirSensorWorkplace> findAirSensorLogBetweenDate(Pageable pageable, LocalDateTime startDate,
			LocalDateTime endDate) { // select
		QAirSensorWorkplace airSensor = QAirSensorWorkplace.airSensorWorkplace;

		// log.debug(String.format("findAirSensorLogBetweenDate() 1... pageable(%s)
		// getOffset(%d) getPageSize(%d)", pageable, pageable.getOffset(),
		// pageable.getPageSize()));

		QueryResults<AirSensorWorkplace> airSensorLogs = jpaQueryFactory.selectFrom(airSensor)
				.orderBy(airSensor.create_date.desc()).where(airSensor.create_date.between(startDate, endDate))
				.offset(pageable.getOffset()).limit(pageable.getPageSize()).fetchResults();

		return new PageImpl<>(airSensorLogs.getResults(), pageable, airSensorLogs.getTotal());
	}

	public Page<AirSensorWorkplace> findAirSensorLogBetweenDateAndId(Pageable pageable, LocalDateTime startDate,
			LocalDateTime endDate, String id) { // select
		QAirSensorWorkplace airSensor = QAirSensorWorkplace.airSensorWorkplace;

		Facility facil = new Facility();
		facil.setFcode(id);
		QueryResults<AirSensorWorkplace> airSensorLogs = jpaQueryFactory.selectFrom(airSensor)
				.orderBy(airSensor.create_date.desc())
				.where(airSensor.create_date.between(startDate, endDate).and(airSensor.facility.eq(facil)))
				.offset(pageable.getOffset()).limit(pageable.getPageSize()).fetchResults();

		return new PageImpl<>(airSensorLogs.getResults(), pageable, airSensorLogs.getTotal());
	}
}