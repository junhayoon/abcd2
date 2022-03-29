package kr.co.ismartcity.smartfactory.entity;

import java.time.LocalDateTime;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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
@AllArgsConstructor
@Entity
@Table(name="TRAFFIC_LINE")
public class TrafficLine {

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long seq;
	
	@Column
	private Long linkId;
	
	@Column(columnDefinition = "DECIMAL(12,7)", nullable=false, unique=false)
	private Double longitude;
	
	@Column(columnDefinition = "DECIMAL(12,7)", nullable=false, unique=false)
	private Double latitude;
	
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
	
	@Column
	private Double speed		;		//	통행 속도(시/km)


	
	public TrafficLine() {
		
	}
	
	
	
	
	public String toString() {
		StringBuffer sb = new StringBuffer();
		sb.append(String.format("seq(%d),", seq));
		sb.append(String.format("linkId(%d),", linkId));
		sb.append(String.format("longitude(%f),", longitude));
		sb.append(String.format("latitude(%f),", latitude));

		sb.append(String.format("createUser(%s),", createUser));
		sb.append(String.format("createDateTime;(%s),", createDateTime));
		
		return sb.toString();
	}




}
