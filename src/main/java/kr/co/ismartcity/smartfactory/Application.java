package kr.co.ismartcity.smartfactory;

import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class Application {
	@PostConstruct
	void started() {
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
		//TimeZone.setDefault(TimeZone.getTimeZone("Etc/UTC"));
		//System.out.println(String.format("TimeZone(%s)", TimeZone.getDefault()));
	}
	
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
	
}
