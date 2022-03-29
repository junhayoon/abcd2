package kr.co.ismartcity.smartfactory.entity;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import kr.co.ismartcity.smartfactory.converter.JsonToArrayConverter;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="POLLUTION_STANDARD")
public class PollutionStandard {

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name="pm10_high", nullable=false, unique=false)
	private double pm10High;

	@Column(name="pm10_middle", nullable=false, unique=false)
	private double pm10Middle;

	@Column(name="pm10_low", nullable=false, unique=false)
	private double pm10Low;

	@Column(name="pm25_high", nullable=false, unique=false)
	private double pm25High;

	@Column(name="pm25_middle", nullable=false, unique=false)
	private double pm25Middle;	

	@Column(name="pm25_low", nullable=false, unique=false)
	private double pm25Low;		
	
	@Column(name="pm1_high", nullable=false, unique=false)
	private double pm1High;
	
	@Column(name="pm1_middle", nullable=false, unique=false)
	private double pm1Middle;
	
	@Column(name="pm1_low", nullable=false, unique=false)
	private double pm1Low;
	
	@Column(name="co2_high", nullable=false, unique=false)
	private double co2High;
	
	@Column(name="co2_middle", nullable=false, unique=false)
	private double co2Middle;
	
	@Column(name="co2_low", nullable=false, unique=false)
	private double co2Low;
	
	@Column(name="o3_low", nullable=false, unique=false)
	private double o3Low;
	
	@Column(name="o3_high", nullable=false, unique=false)
	private double o3High;
	
	@Column(name="o3_middle", nullable=false, unique=false)
	private double o3Middle;
	
	@Column(name="no2_low", nullable=false, unique=false)
	private double no2Low;
	
	@Column(name="no2_high", nullable=false, unique=false)
	private double no2High;
	
	@Column(name="no2_middle", nullable=false, unique=false)
	private double no2Middle;
	
	@Column(name="co_low", nullable=false, unique=false)
	private double coLow;
	
	@Column(name="co_high", nullable=false, unique=false)
	private double coHigh;
	
	@Column(name="co_middle", nullable=false, unique=false)
	private double coMiddle;
	
	@Column(name="so2_low", nullable=false, unique=false)
	private double so2Low;
	
	@Column(name="so2_high", nullable=false, unique=false)
	private double so2High;
	
	@Column(name="so2_middle", nullable=false, unique=false)
	private double so2Middle;
	
	@Column(nullable=false, unique=false)
	private double tvocHigh;
	
	@Column(nullable=false, unique=false)
	private double tvocMiddle;
	
	@Column(nullable=false, unique=false)
	private double tvocLow;
	
	@OneToOne(fetch = FetchType.EAGER)
	private User createUser;
	
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
		
		sb.append(String.format("pm10High(%f),", pm10High));
		sb.append(String.format("pm25High(%f),", pm25High));
		sb.append(String.format("pm1High(%f),", pm1High));
		sb.append(String.format("co2High(%f),", co2High));
		sb.append(String.format("tvocHigh(%f),", tvocHigh));

		sb.append(String.format("pm10Middle(%f),", pm10Middle));
		sb.append(String.format("pm25Middle(%f),", pm25Middle));
		sb.append(String.format("pm1Middle(%f),", pm1Middle));
		sb.append(String.format("co2Middle(%f),", co2Middle));
		sb.append(String.format("tvocMiddle(%f),", tvocMiddle));

		sb.append(String.format("pm10Low(%f),", pm10Low));
		sb.append(String.format("pm25Low(%f),", pm25Low));
		sb.append(String.format("pm1Low(%f),", pm1Low));
		sb.append(String.format("co2Low(%f),", co2Low));
		sb.append(String.format("tvocLow(%f),", tvocLow));

		sb.append(String.format("o3High(%f),", o3High));
		sb.append(String.format("o3Middle(%f),", o3Middle));
		sb.append(String.format("o3Low(%f),", o3Low));

		sb.append(String.format("no2High(%f),", no2High));
		sb.append(String.format("no2Middle(%f),", no2Middle));
		sb.append(String.format("no2Low(%f),", no2Low));

		sb.append(String.format("coHigh(%f),", coHigh));
		sb.append(String.format("coMiddle(%f),", coMiddle));
		sb.append(String.format("coLow(%f),", coLow));

		sb.append(String.format("so2High(%f),", so2High));
		sb.append(String.format("so2Middle(%f),", so2Middle));
		sb.append(String.format("so2Low(%f),", so2Low));
		
		sb.append(String.format("createDateTime(%s),", createDateTime));
		sb.append(String.format("createUser(%s),", createUser));
		sb.append(String.format("updateDateTime(%s),", updateDateTime));
		sb.append(String.format("updateUser(%s),", updateUser));
				
		return sb.toString();
	}
}
