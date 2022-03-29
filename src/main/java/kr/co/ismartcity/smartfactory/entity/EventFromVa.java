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
import org.json.simple.JSONObject;

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
@Table(name="EVENTS_FROM_VA")
public class EventFromVa {
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long seq;
	
	@Column(nullable=true, unique=false)
	@ColumnDefault("0")
	private int vaId;	// va ch id

	@Column(nullable=true, unique=false)
	@ColumnDefault("0")
	private int id;		// va event id

	@Column(nullable=true, unique=false)
	private String stat;	

	@Column(nullable=true, unique=false)
	private String tm;

	@Column(nullable=true, unique=false)
	@ColumnDefault("0")
	private int type;	
	
	@Column(nullable=true, unique=false)
	private String ezn;
	
	@Column(nullable=true, unique=false)
	private String obj;
	
	@Column(nullable=true, unique=false)
	private String recv_data;
		
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
	
	
//	public EventFromVa() {
//		
//	}
//	
	public EventFromVa(JSONObject evt) {
		if (evt != null) {
			if (evt.get("uid") != null)
				setVaId(parseInt(evt.get("uid").toString()));
			if (evt.get("id") != null)
				setId(parseInt(evt.get("id").toString()));			
			if (evt.get("stat") != null)
				setStat(evt.get("stat").toString());			
			if (evt.get("tm") != null)
				setTm(evt.get("tm").toString());
			if (evt.get("type") != null)
				setType(parseInt(evt.get("type").toString()));			
			if (evt.get("ezn") != null)
				setEzn(evt.get("eznt").toString());
			if (evt.get("obj") != null)
				setObj(evt.get("obj").toString());
			
			setRecv_data(evt.toString());
		}
	}
	
	private int parseInt(String val) {
		int ret = 0;
		try {
			ret = Integer.parseInt(val);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ret;
	}
	
	
	public String toString() {
		StringBuffer sb = new StringBuffer();
		sb.append(String.format("seq(%d),", seq));
		sb.append(String.format("vaId(%d),", vaId));
		sb.append(String.format("id(%d),", id));
		sb.append(String.format("stat(%s),", stat));
		sb.append(String.format("tm(%s),", tm));
		sb.append(String.format("type(%d),", type));
		sb.append(String.format("ezn(%s),", ezn));
		sb.append(String.format("obj(%s),", obj));
		sb.append(String.format("create_date(%s),", create_date));
				
		return sb.toString();
	}
}
