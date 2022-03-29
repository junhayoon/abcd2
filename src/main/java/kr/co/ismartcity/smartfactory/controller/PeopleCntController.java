package kr.co.ismartcity.smartfactory.controller;

import java.io.Console;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.UnknownHostException;
import java.security.Principal;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.mobile.device.site.SitePreference;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.ismartcity.smartfactory.entity.DronStation;
import kr.co.ismartcity.smartfactory.entity.PeopleCnt;
import kr.co.ismartcity.smartfactory.entity.Workplace;
import kr.co.ismartcity.smartfactory.service.DronStationService;
import kr.co.ismartcity.smartfactory.service.MessageSourceService;
import kr.co.ismartcity.smartfactory.service.PeopleCntService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
@RestController
@EnableConfigurationProperties
public class PeopleCntController {

	@Autowired
	public PeopleCntService peopleCntService;
	
	@Autowired
	MessageSourceService messageSourceService;
	
//	static ServerSocket server = null;
//	static ExecutorService receiver = null;
//	static String serverIP = "220.126.101.248";
//	static int serverPort = 8282;




	@GetMapping(value = "/cameraDataInpnr.wd")
	public void getPeopleCntParameter(String error, String logout, String force, Model model, Principal principal,
			SitePreference sitePreference, HttpServletRequest request) throws IOException {
		log.debug("cameraDataInpnr.wd");
		
		List<PeopleCnt> list = null;
		
		String camId = (String)request.getParameter("camId");
		String inOut = (String)request.getParameter("inOut");
		Long inpMs =  Long.parseLong(request.getParameter("inpMs"));
		Long totCnt = Long.parseLong(request.getParameter("totCnt"));
		Long lineNo = Long.parseLong(request.getParameter("lineNo"));
		
		String dateStr = (String)request.getParameter("inpTm");
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
		LocalDateTime inpTm = LocalDateTime.parse(dateStr, formatter);
		
		
		
		
		PeopleCnt peoplecnt = new PeopleCnt();
		peoplecnt.setCamId(camId);
		peoplecnt.setInOut(inOut);
		peoplecnt.setInpMs(inpMs);
		peoplecnt.setTotCnt(totCnt);
		peoplecnt.setLineNo(lineNo);
		peoplecnt.setInpTm(inpTm);
		
		peopleCntService.addPeopleCnt(peoplecnt);

	}
	
	

}
