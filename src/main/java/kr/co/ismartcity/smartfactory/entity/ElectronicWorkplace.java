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
import org.hibernate.annotations.Where;
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
@Table(name = "ELECTRONIC_WORKPLACE")
public class ElectronicWorkplace {
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long seq;
	
	@Column(nullable=true, unique=false)
	private double longitude;

	@Column(nullable=true, unique=false)
	private double latitude;
	
	//@JsonIgnore
	@Column(nullable=true, unique=false)
	private String recv_data;
	
	@Column(nullable=true, unique=false)
	private String id;
	
	@Column(nullable=true, unique=false)
	private String date;
	
	@Column(nullable=true, unique=false)
	private double kwh;
	
	@Column(nullable=true, unique=false)
	private double w;
	
	@Column(nullable=true, unique=false)
	private double v;
	
	@Column(nullable=true, unique=false)
	private double hz;
	
	@Column(nullable=true, unique=false)
	private double pf;
	
	@Column(nullable=true, unique=false)
	private double a;
	
	@Column(nullable=true, unique=false)
	private double igo;
	
	@Column(nullable=true, unique=false)
	private double igr;
	
	@Column(nullable=true, unique=false)
	private double igc;
	
	@Column(nullable=true, unique=false)
	private double om;
	
	@Column(nullable=true, unique=false)
	private int eventAlert;
	
	@Column(nullable=true, unique=false)
	private int leakAlert;
	
	@Column(nullable=true, unique=false)
	private int rssi;
	
	@Column(nullable=true, unique=false)
	private String extSensor1;
	
	@Column(nullable=true, unique=false)
	private String extSensor2; 
	
	@Column(nullable=true, unique=false, length=100)
	private String server_info;
	
	//@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "Asia/Seoul") // UTC
	@Column
	@CreationTimestamp
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	private LocalDateTime create_date;
	
	//@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "UTC")누전 차단기
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
	
	public void setElectronicData(String data) {
		setRecv_data(data);
		
		String[] spl = data.split("\\|");
		setId(spl[1]);
		setDate(spl[2]);
		setKwh(Double.parseDouble(spl[3]) * 0.1);
		setW(Double.parseDouble(spl[4]) * 0.1);
		setV(Double.parseDouble(spl[5]) * 0.1);
		setHz(Double.parseDouble(spl[6]) * 0.1);
		setPf(Double.parseDouble(spl[7]) * 0.001);
		setA(Double.parseDouble(spl[8]) * 0.1);
		setIgo(Double.parseDouble(spl[9]) * 0.001);
		setIgr(Double.parseDouble(spl[10]) * 0.001);
		setIgc(Double.parseDouble(spl[11]) * 0.001);
		setOm(Double.parseDouble(spl[12]) * 0.001);
		setEventAlert(Integer.parseInt(spl[13]));
		setLeakAlert(Integer.parseInt(spl[14]));
		setRssi(Integer.parseInt(spl[15]) - 200);
		setExtSensor1(spl[16]);
		setExtSensor2(spl[17]);		
	}
}
