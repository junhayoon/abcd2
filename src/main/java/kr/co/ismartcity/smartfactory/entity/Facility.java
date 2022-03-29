package kr.co.ismartcity.smartfactory.entity;

import java.time.LocalDateTime;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import kr.co.ismartcity.smartfactory.converter.JsonToMapConverter;
import kr.co.ismartcity.smartfactory.model.FacilityStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="FACILITY")
public class Facility {

//	@Id 
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Long id;
	
	@Id 
	private String fcode;
	
	@Column(nullable=false, unique=false, length=50)
	private String facilityName;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private FacilityCategory facilityCategory;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="workplace_id")
	private Workplace workplace;
	
	@Column(name="mobius_id", nullable=true, unique=false, length=100)
	private String mobiusId;
	
	@Column(nullable=false, unique=false)
	private double longitude;
	
	@Column(nullable=false, unique=false)
	private double latitude;
	
	@Column(nullable=true, unique=false)
	private String addr;
	
	@Column(nullable=false, unique=false)
	private FacilityStatus status;
	
	@Convert(converter = JsonToMapConverter.class)
	@Column(name="properties", columnDefinition="JSON")
    private Map<String, Object> properties;
	
	@Column(nullable=false, unique=false)
	@ColumnDefault("1") 
	private boolean autoControl;
	
	@Column(nullable=false, unique=false)
	@ColumnDefault("0") 
	private boolean revData;
	
	@Column(nullable=false, unique=false)
	@ColumnDefault("1") 
	private boolean enabled;
	
	@Fetch(FetchMode.JOIN)
	@OneToOne(fetch = FetchType.EAGER)
	private User createUser;
	
	@Fetch(FetchMode.JOIN)
	@OneToOne(fetch = FetchType.EAGER) 
	private User updateUser;
	
	@Column(nullable=true, length=100)
	private String syscategoryCd;
	
	
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
		sb.append(String.format("fcode(%s),", fcode));
		sb.append(String.format("facilityName(%s),", facilityName));
		sb.append(String.format("facilityCategory(%s),", facilityCategory));		
		sb.append(String.format("workplace(%s),", workplace ));		
		sb.append(String.format("mobiusId(%s),", mobiusId));
		sb.append(String.format("latitude(%f),", latitude));
		sb.append(String.format("longitude(%f),", longitude));
		sb.append(String.format("addr(%s),", addr));
		sb.append(String.format("properties(%s),", properties));		
		sb.append(String.format("autoControl(%b),", autoControl));	
		sb.append(String.format("enabled(%b),", enabled));
		sb.append(String.format("createUser(%s),", createUser));
		sb.append(String.format("createDateTime;(%s),", createDateTime));
		
		return sb.toString();
	}
	
}
