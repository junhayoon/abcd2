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

@Table(name = "AIR_SENSOR_WORKPLACE")
public class AirSensorWorkplace {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long seq;

	@Column(nullable=true, unique=false)
	private double altitude;

	@Column(nullable=true, unique=false)
	private double longitude;

	@Column(nullable=true, unique=false)
	private double latitude;

	// 사업장 대기정보
	@Column(nullable=false, unique=false)
	private double pm10;

	@Column(nullable=false, unique=false)
	private double pm25;

	@Column(nullable=false, unique=false)
	private double pm1;

	@Column(nullable=false, unique=false)
	private double co2;

	@Column(nullable=false, unique=false)
	private double tvoc;

	@Column(nullable=false, unique=false)
	private double temp;

	@Column(nullable=false, unique=false)
	private double humi;

	//@JsonIgnore
	@Column(nullable=true, unique=false)
	@ColumnDefault("0")
	private int unit;

	//@JsonIgnore
	@Column(nullable=true, unique=false)
	@ColumnDefault("0")
	private int alarm;

	@Column(nullable=true, unique=false, length=10)
	private String cmd;

	@Column(name="auto_range", nullable=true, unique=false, length=20)
	private String range;

	@Column(nullable=true, unique=false)
	@ColumnDefault("0")
	private int astrength;

	//@JsonIgnore
	@Column(nullable=true, unique=false)
	@ColumnDefault("0")
	private long recv_seq;

	//@JsonIgnore
	@Column(nullable=true, unique=false)
	private String recv_data;

	@Column(nullable=true, unique=false, length=100)
	private String server_info;

	@Column(nullable=true, unique=false, length=15)
	private String mobius_ip;

	//@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "Asia/Seoul") // UTC
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

	public int getAlarm() {
		return alarm;
	}

	public String toString() {
		StringBuffer sb = new StringBuffer();
		sb.append(String.format("seq(%d),", seq));
		sb.append(String.format("pm10(%f),", pm10));
		sb.append(String.format("pm2.5(%f),", pm25));
		sb.append(String.format("pm1.0(%f),", pm1));
		sb.append(String.format("co2(%f),", co2));
		sb.append(String.format("tvoc(%f),", tvoc));
		sb.append(String.format("temp(%f),", temp));
		sb.append(String.format("humi(%f),", humi));
		sb.append(String.format("unit(%d),", unit));
		sb.append(String.format("alarm(%d),", alarm));
		sb.append(String.format("cmd(%s),", cmd));
		sb.append(String.format("range(%s),", range));
		sb.append(String.format("astrength(%d),", astrength));
		sb.append(String.format("recv_seq(%d),", recv_seq));

		//sb.append(String.format("crete_date(%s),", create_date));

		return sb.toString();
	}
}
