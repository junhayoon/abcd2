package kr.co.ismartcity.smartfactory.service;

import java.net.InetAddress;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import kr.co.ismartcity.smartfactory.entity.ElectronicWorkplace;
import kr.co.ismartcity.smartfactory.entity.FireSensorWorkplace;
import kr.co.ismartcity.smartfactory.repository.ElectronicSensorWorkplaceRepository;
import kr.co.ismartcity.smartfactory.repository.FireSensorWorkplaceRepository;
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
public class ElectronicSensorWorkplaceService {

	@Value("${spring.profiles.active}")
	private String server_active_mode;

	@Value("${mobius.address}")
	private String mobius_ip;

	@Value("${server.port}")
	private String server_port;

	@Autowired
	private ElectronicSensorWorkplaceRepository electronicSensorWorkplaceRepository;



	public ElectronicWorkplace addElectronicSensorInfo(ElectronicWorkplace iElectronicWorkplace) {

		InetAddress local;
		String local_server = "";
		try {
			local = InetAddress.getLocalHost();
			local_server = local.getHostAddress() + ":" + server_port + "(" + local.getHostName() + ")";
			log.debug("local_server ip : " + local_server);
		} catch (Exception e1) {
			e1.printStackTrace();
		}

		iElectronicWorkplace.setServer_info(local_server);
		//iElectronicWorkplace.setMobius_ip(mobius_ip);

		return electronicSensorWorkplaceRepository.save(iElectronicWorkplace);
	}
}