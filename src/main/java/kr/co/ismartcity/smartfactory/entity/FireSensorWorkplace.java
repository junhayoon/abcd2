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

@Table(name = "FIRE_SENSOR_WORKPLACE")
public class FireSensorWorkplace {
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long seq;
	
	@Column(nullable=true, unique=false)
	private double longitude;

	@Column(nullable=true, unique=false)
	private double latitude;
	
	@Column(nullable=false, unique=false)
	@ColumnDefault("0") 
	private boolean fireflag;
	
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
	/*
	 * //@JsonIgnore
	 * 
	 * @ManyToOne(fetch = FetchType.EAGER)
	 * 
	 * @JoinColumn(name="facility_fcode", nullable=false, unique=false)
	 * private Facility facility;
	 */
	

	public String toString() {
		StringBuffer sb = new StringBuffer();
		sb.append(String.format("seq(%d),", seq));	
		sb.append(String.format("crete_date(%s),", create_date));
				
		return sb.toString();
	}
}
