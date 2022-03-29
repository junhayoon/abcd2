package kr.co.ismartcity.smartfactory.entity;

import java.time.LocalDateTime;

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
@Table(name="DRON_DRIVE_LOG")
public class DronStation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(columnDefinition = "DECIMAL(12,7)", nullable=false, unique=false)
	private Double lat;

	@Column(columnDefinition = "DECIMAL(12,7)", nullable=false, unique=false)
	private Double lng;

	@Column(columnDefinition = "DECIMAL(5,3)", nullable=false, unique=false)
	private Double alt;

	@Column(columnDefinition = "DECIMAL(12,7)", nullable=false, unique=false)
	private Double roll;

	@Column(nullable=false, unique=false, length=20, columnDefinition = "TEXT")
	private String pitch;

	@Column(columnDefinition = "DECIMAL(8,5)", nullable=false, unique=false)
	private Double yaw;

	@Column(nullable=false, unique=false, length=30, columnDefinition = "TEXT")
	private String hs;

	@Column(nullable=false, unique=false, length=30, columnDefinition = "TEXT")
	private String vs;

	@Column(nullable=false, unique=false, length=20, columnDefinition = "TEXT")
	private String vol;

	@Column(nullable=false, unique=false, length=20, columnDefinition = "TEXT")
	private String cur;

	@Column(nullable=false, unique=false, length=30, columnDefinition = "TEXT")
	private String ftime;

	@Fetch(FetchMode.JOIN)
	@OneToOne(fetch = FetchType.EAGER)
	private User createUser;

	@Fetch(FetchMode.JOIN)
	@OneToOne(fetch = FetchType.EAGER)
	private User updateUser;

	@Column
	private String sat;
	@Column
	private String dron_gubn;

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
		sb.append(String.format("lat(%s),", lat));
		sb.append(String.format("lng(%s),", lng));
		sb.append(String.format("alt(%s),", alt));
		sb.append(String.format("roll(%s),", roll));
		sb.append(String.format("pitch(%s),", pitch));
		sb.append(String.format("yaw(%s),", yaw));
		sb.append(String.format("hs(%s),", hs));
		sb.append(String.format("vs(%s),", vs));
		sb.append(String.format("vol(%s),", vol));
		sb.append(String.format("cur(%s),", cur));
		sb.append(String.format("ftime(%s),", ftime));
		sb.append(String.format("createUser(%s),", createUser));
		sb.append(String.format("createDateTime;(%s),", createDateTime));

		return sb.toString();
	}
}
