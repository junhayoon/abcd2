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
@Table(name="DASHBOARD_EVENT_PROC")
public class DashboardEventProc {

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Fetch(FetchMode.JOIN)
	@OneToOne(fetch = FetchType.EAGER)
	public DashboardEvent event;

	@Fetch(FetchMode.JOIN)
	@OneToOne(fetch = FetchType.EAGER)
	public Code process;
		
	@Column(nullable=true, unique=false, length=2000)
	public String procDesc;
		
	@Column
	@CreationTimestamp
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	private LocalDateTime createDateTime;
		
	@Fetch(FetchMode.JOIN)
	@OneToOne(fetch = FetchType.EAGER)
	private User createUser;
	
	public String toString() {
		StringBuffer sb = new StringBuffer();
		sb.append(String.format("id(%d),", id));
		sb.append(String.format("event(%s),", event));
		sb.append(String.format("process(%s),", process));		
		sb.append(String.format("procDesc(%s),", procDesc));
		sb.append(String.format("createUser(%s),", createUser));
		sb.append(String.format("createDateTime;(%s),", createDateTime));
		
		return sb.toString();
	}
	
}
