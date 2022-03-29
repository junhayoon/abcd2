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
@Table(name="TRAFFIC_LINE_TMP")
public class TrafficLineTmp {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long seq;
	
	@Column(nullable=true, unique=false, length=11)
	private int linkId;
	
	@Column(nullable=false, unique=false, length=1)
	private int odr;
	
	@Column(columnDefinition = "DECIMAL(12,7)", nullable=false, unique=false)
	private Double longitude;
	
	@Column(columnDefinition = "DECIMAL(12,7)", nullable=false, unique=false)
	private Double latitude;
	
	@Column
	private String upDown;
	

	

	
	public String toString() {
		StringBuffer sb = new StringBuffer();

		
		return sb.toString();
	}
}
