package kr.co.ismartcity.smartfactory.config;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.querydsl.jpa.impl.JPAQueryFactory;

@Configuration
public class QuerydslConfiguration {

	@PersistenceContext(unitName="masterEntityManager")
	@Autowired
    private EntityManager entityManager;
	
//	@PersistenceContext(unitName="slaveEntityManager")
//	@Autowired
//    private EntityManager slaveEntityManager;

    @Bean
    public JPAQueryFactory jpaQueryFactory() {
        return new JPAQueryFactory(entityManager);
    }
    
//    @Bean
//    public JPAQueryFactory slaveJpaQueryFactory() {
//        return new JPAQueryFactory(slaveEntityManager);
//    }
}
