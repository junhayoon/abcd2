package kr.co.ismartcity.smartfactory.service;

import java.net.InetAddress;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;

import kr.co.ismartcity.smartfactory.entity.FreeSetLine;
import kr.co.ismartcity.smartfactory.entity.PeopleCnt;
import kr.co.ismartcity.smartfactory.entity.Workplace;
import kr.co.ismartcity.smartfactory.repository.FreeSetLineRepository;
import kr.co.ismartcity.smartfactory.repository.PeopleCntRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@ConfigurationProperties
public class PeopleCntService {
	
	@Value("${server.port}")
	private String server_port;

	@Autowired
	public PeopleCntRepository peopleCntRepository;
	
	public List<PeopleCnt> getAllPeopleCnt() {
		return (List<PeopleCnt>) peopleCntRepository.findAll();
	}
	
	public PeopleCnt peopleId() {
		return peopleCntRepository.peopleId();
	}
	
	public int addPeopleCnt(PeopleCnt peopleCnt) {
		
		int nRet = 0;
		
		InetAddress local;
		String local_server = "";
		try {
			local = InetAddress.getLocalHost();
			local_server = local.getHostAddress() + ":" + server_port + "(" + local.getHostName() + ")";
			log.debug("local_server ip : " + local_server);
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		
		peopleCnt.setServer_info(local_server);
		
		PeopleCnt entity = peopleCntRepository.save(peopleCnt);
		
		return nRet;
	}
	
	
}
