package kr.co.ismartcity.smartfactory.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Entity
@Slf4j
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="RULESET")
public class RuleSet {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name="rule_id", nullable=false, unique=true, length=50)
	private String ruleId;
	
	@Column(name="artifact_id", nullable=false, length=50)
	private String artifactId;
	
	@Column(nullable=false, length=50)
	private String version;
	
	@Column(name="rule_content", columnDefinition="TEXT")
	private String ruleContent;
	
	@Fetch(FetchMode.JOIN)
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="create_user")
	private User createUser;
	
	@Fetch(FetchMode.JOIN)
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="update_user")
	private User updateUser;
	
	@Column(name="create_date_time")
	@CreationTimestamp
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	private LocalDateTime createDateTime;
	 
	@Column(name="update_date_time")
	@UpdateTimestamp
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	private LocalDateTime updateDateTime;
}
