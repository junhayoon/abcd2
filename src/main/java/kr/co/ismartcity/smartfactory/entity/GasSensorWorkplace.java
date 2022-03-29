  package kr.co.ismartcity.smartfactory.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
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

@Table(name = "GAS_SENSOR_WORKPLACE")
public class GasSensorWorkplace {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long seq;

	@Column(nullable=true, unique=false)
	private double longitude;

	@Column(nullable=true, unique=false)
	private double latitude;

	@Column(nullable=false, unique=false)
	@ColumnDefault("0")
	private boolean gasflag;


	@Column
	private Integer entrps				;
	@Column
	private String sensor_code         ;
	@Column
	private Integer error_status        ;
	@Column
	private Integer mesure              ;
	@Column
	private Integer open_set_data       ;
	@Column
	private Integer high_set_data       ;
	@Column
	private String gas_sensor          ;
	@Column
	private Integer gas_error_status    ;
	@Column
	private Float gas_mesure			;
	@Column
	private Integer gas_hige_set_data   ;
	@Column
	private Integer bbc                 ;
	@Column
	private String recv_data           ;
	@Column
	private Integer low_set_data		;
	@Column
	private Double open_delay_time		;
	@Column
	private Double wet_delay_time		;
	@Column
	private Double leak_delay_time		;
	@Column
	private Float warn_1				;
	@Column
	private Float warn_2				;
	@Column
	private Double gas_error_delay_time	;
	
	@Column(nullable=true, unique=false, length=100)
	private String server_info;



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


	public String toString() {
		StringBuffer sb = new StringBuffer();
		sb.append(String.format("seq(%d),", seq));
		sb.append(String.format("crete_date(%s),", create_date));

		return sb.toString();
	}
}

