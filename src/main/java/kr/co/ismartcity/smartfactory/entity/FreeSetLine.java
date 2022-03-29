package kr.co.ismartcity.smartfactory.entity;

import java.time.LocalDateTime;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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

@Slf4j
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="FREE_SET_LINE")
public class FreeSetLine {

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable=false, unique=false, length=5)
	private String freeSetNo;
	
	@Column(nullable=false, unique=false, length=10)
	private String freeSetArea;
	
	@Column(nullable=false, unique=false, length=2)
	private String coordinateType;
	
	@Column(nullable=false, unique=false, length=1)
	private String useYn;
	
	@Column(nullable=false, unique=false, length=2)
	private String groupNo;
	
	@Column(columnDefinition = "DECIMAL(12,7)", nullable=false, unique=false)
	private Double longitude;
	
	@Column(columnDefinition = "DECIMAL(12,7)", nullable=false, unique=false)
	private Double latitude;
	
	@Column(nullable=false, unique=false)
	private Integer sortNo;
	
	@Column(nullable=false, unique=false, length=2)
	private String grade;
	
	@Fetch(FetchMode.JOIN)
	@OneToOne(fetch = FetchType.EAGER)
	private User createUser;
	
	@Fetch(FetchMode.JOIN)
	@OneToOne(fetch = FetchType.EAGER) 
	private User updateUser;
	
	@Column
	@CreationTimestamp
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	private LocalDateTime createDateTime;
	 
	@Column
	@UpdateTimestamp
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	private LocalDateTime updateDateTime;
	
	public String toString() {
		StringBuffer sb = new StringBuffer();
		sb.append(String.format("id(%d),", id));
		sb.append(String.format("freeSetNo(%s),", freeSetNo));
		sb.append(String.format("freeSetArea(%s),", freeSetArea));
		sb.append(String.format("coordinateType(%s),", coordinateType));		
		sb.append(String.format("use_yn(%s),", useYn));
		sb.append(String.format("groupNo(%d),", groupNo));
		sb.append(String.format("latitude(%f),", latitude));
		sb.append(String.format("longitude(%f),", longitude));
		sb.append(String.format("sortNo(%d),", sortNo));
		sb.append(String.format("grade(%d),", grade));
		sb.append(String.format("createUser(%s),", createUser));
		sb.append(String.format("createDateTime;(%s),", createDateTime));
		
		return sb.toString();
	}
}
