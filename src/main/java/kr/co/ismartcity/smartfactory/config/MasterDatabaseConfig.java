package kr.co.ismartcity.smartfactory.config;

import java.util.HashMap;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

@Configuration
@EnableJpaRepositories(
	basePackages = "kr.co.ismartcity.smartfactory.repository",
	entityManagerFactoryRef = "masterEntityManager",
	transactionManagerRef = "masterTransactionManager"
)
public class MasterDatabaseConfig {

	@Autowired
    private Environment env;
	
	@Primary
	@Bean
    public LocalContainerEntityManagerFactoryBean masterEntityManager() {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(masterDataSource());
        em.setPackagesToScan(new String[] { "kr.co.ismartcity.smartfactory.entity" });
 
        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);
        
        HashMap<String, Object> properties = new HashMap<>();
        properties.put("hibernate.hbm2ddl.auto", env.getProperty("spring.jpa.hibernate.ddl-auto"));
        properties.put("hibernate.show_sql", env.getProperty("spring.jpa.show-sql"));
        properties.put("hibernate.physical_naming_strategy", "org.springframework.boot.orm.jpa.hibernate.SpringPhysicalNamingStrategy");
        properties.put("hibernate.implicit_naming_strategy", "org.springframework.boot.orm.jpa.hibernate.SpringImplicitNamingStrategy");
        em.setJpaPropertyMap(properties);
        
        return em;
    }
	
	@Primary
	@Bean
    public DataSource masterDataSource() {
  
		HikariConfig config = new HikariConfig();
        config.setJdbcUrl(env.getProperty("master.datasource.url"));
        config.setUsername(env.getProperty("master.datasource.username"));
        config.setPassword(env.getProperty("master.datasource.password"));
        config.setPoolName(env.getProperty("master.datasource.hikari.pool-name"));
        config.setMaximumPoolSize(Integer.parseInt(env.getProperty("master.datasource.hikari.maximum-pool-size")));
        config.setMinimumIdle(Integer.parseInt(env.getProperty("master.datasource.hikari.minimum-idle")));
        config.addDataSourceProperty("cachePrepStmts", env.getProperty("master.datasource.hikari.data-source-properties.cachePrepStmts"));
        config.addDataSourceProperty("prepStmtCacheSize", env.getProperty("master.datasource.hikari.data-source-properties.prepStmtCacheSize"));
        config.addDataSourceProperty("prepStmtCacheSqlLimit", env.getProperty("master.datasource.hikari.data-source-properties.prepStmtCacheSqlLimit"));
        config.addDataSourceProperty("useServerPrepStmts", env.getProperty("master.datasource.hikari.data-source-properties.useServerPrepStmts"));
        
        HikariDataSource dataSource = new HikariDataSource(config);
       
        return dataSource;
    }
	
	@Primary
	@Bean
    public PlatformTransactionManager masterTransactionManager() {
  
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(masterEntityManager().getObject());
        return transactionManager;
    }
	
}
