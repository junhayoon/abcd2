package kr.co.ismartcity.smartfactory.controller;

import java.io.IOException;
import java.security.Principal;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.ismartcity.smartfactory.service.ReportService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
@RestController
@EnableConfigurationProperties
public class ReportController {

	@Autowired
	ReportService reportService;
	
	@GetMapping("/openapi/report")
	public void getReport(Principal principal, HttpServletResponse response) {
		try {
			response.setHeader("Content-Disposition", "attachment; filename=report.pdf");
			response.setContentType("application/octet-stream");
			reportService.buildReport(response.getOutputStream());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
