package kr.co.ismartcity.smartfactory.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
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
@Table(name="NOTIFICATION")
public class Notification {
	public static final int NOTI_FROM_AIRSENSOR_IN_WORKPLACE	= 10;	// used
	public static final int NOTI_FROM_AIRSENSOR_IN_DRONE		= 11;	
	public static final int NOTI_FROM_VA_SYSTEM					= 20;	// used
	public static final int NOTI_FROM_THERMAL_CAMERA			= 21;
	public static final int NOTI_FROM_VMS_SYSTEM				= 22;
	
	
	public static final int NOTI_LEVEL_SUCCESS					= 0;
	public static final int NOTI_LEVEL_INFO						= 1;
	public static final int NOTI_LEVEL_WARNING					= 2;
	public static final int NOTI_LEVEL_DANGER					= 3;
	public static final int NOTI_LEVEL_EMERGENCY				= 4;	// not used yet
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long seq;
		
	@Column(name="from_who", nullable=false, unique=false)
	private Integer from;
	
	// 0: success, 1: info, 2: warning, 3: danger
	@Column(nullable=false, unique=false)
	private Integer level;
	
	@Column(nullable=false, unique=false, length=200)
	private String info;	
		
	// 사업장대기정보시: 알림 종류 (수신될 alarm 값 예: 101), 화재알림시: 연기/불꽃 종류 (va 알림 event 의 type 값 예: 8 or 9)  
	@Column(nullable=true, unique=false)
	private String data;
	
	@JsonProperty("read")
	@Column(name="is_read", nullable=true, unique=false)
    @ColumnDefault("0")
    private boolean read;
	
	@JsonProperty("removed")
    @Column(name="is_removed", nullable=true, unique=false)
    @ColumnDefault("0")
    private boolean removed;
	

	//@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ssz", timezone = "UTC")
	//@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "UTC")
	@Column
	@CreationTimestamp
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	private LocalDateTime create_date;
	
	//@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "UTC")	
	@Column
	@UpdateTimestamp
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
	private LocalDateTime update_date;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private Facility facility;
	
}
