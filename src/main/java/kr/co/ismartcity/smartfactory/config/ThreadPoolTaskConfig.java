package kr.co.ismartcity.smartfactory.config;

import java.util.concurrent.Executor;
import java.util.concurrent.ThreadPoolExecutor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
@EnableAsync
@ConfigurationProperties("thread")
@PropertySource(value = {
	"classpath:/application.yaml",
	"classpath:/application-common.yaml", "classpath:/application-sub.yaml" //"classpath:/application-${spring.profiles.active}.yaml"
})
public class ThreadPoolTaskConfig {

	@Value("${thread.pool.writefile.max}")
	public int maxPoolSize;
	
	@Value("${thread.pool.writefile.core}")
	public int corePoolSize;
	
	@Value("${thread.pool.writefile.queue}")
	public int queueCapacity;
	
	@Value("${thread.pool.writefile.prefix}")
	public String prefix;
	
	@Value("${thread.pool.mobius.max}")
	public int mobius_maxPoolSize;
	
	@Value("${thread.pool.mobius.core}")
	public int mobius_corePoolSize;
	
	@Value("${thread.pool.mobius.queue}")
	public int mobius_queueCapacity;
	
	@Value("${thread.pool.mobius.prefix}")
	public String mobius_prefix;
	
	
	@Bean(name = "writeFileThreadPoolTaskExecutor")
	public Executor writeFileThreadPoolTaskExecutor() {
		ThreadPoolTaskExecutor threadPoolTaskExceutor = new ThreadPoolTaskExecutor();
		threadPoolTaskExceutor.setMaxPoolSize(maxPoolSize);
		threadPoolTaskExceutor.setCorePoolSize(corePoolSize);
		threadPoolTaskExceutor.setQueueCapacity(queueCapacity);
		threadPoolTaskExceutor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
		threadPoolTaskExceutor.setThreadNamePrefix(prefix);
		threadPoolTaskExceutor.initialize();
		return threadPoolTaskExceutor;
	}

	@Bean(name = "parseMobiusThreadPoolTaskExecutor")
	public Executor parseMobiusThreadPoolTaskExecutor() {
		ThreadPoolTaskExecutor threadPoolTaskExceutor = new ThreadPoolTaskExecutor();
		threadPoolTaskExceutor.setMaxPoolSize(mobius_maxPoolSize);
		threadPoolTaskExceutor.setCorePoolSize(mobius_corePoolSize);
		threadPoolTaskExceutor.setQueueCapacity(mobius_queueCapacity);
		threadPoolTaskExceutor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
		threadPoolTaskExceutor.setThreadNamePrefix(mobius_prefix);
		threadPoolTaskExceutor.initialize();
		return threadPoolTaskExceutor;
	}
}
