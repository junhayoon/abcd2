package kr.co.ismartcity.smartfactory.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Entity
@Slf4j
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="its_traffic")
//@IdClass(ItstrafficID.class)
public class Itstraffic {

//	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "sno", unique = true, nullable = false, insertable = false, updatable = false, length=11)
	private Integer sno		;		//	순번
	
	@Id
	@Column(length=11)
	private Integer link_id		;		//	링크 ID

	@Column(length=100)
	private String road_name		;	//	도로명

	@Column(length=100)
	private String road_drc_type	;	//	도로 방향 유형

	@Column(length=100)
	private String link_no		;		//	일련 번호

	@Column(length=11)
	private Long f_node_id	;			//	시작 노드 ID

	@Column(length=11)
	private Long t_node_id	;			//	종료 노드 ID
	
	@Column
	private Double speed		;		//	통행 속도(시/km)

	@Column(length=100)
	private String travel_time	;		//	통행 시간(초)

	@Column(length=100)
	private String created_date	;		//	생성 일시(YYYYMMDDHH24MISS)


	@Column(name="reg_date")
	@CreationTimestamp
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	private LocalDateTime reg_date;

	
	public String toString() {
		StringBuffer sb = new StringBuffer();
		sb.append(String.format("sno(%d),", sno));
		sb.append(String.format("link_id(%d),", link_id));
		sb.append(String.format("speed(%f),", speed));
		sb.append(String.format("travel_time(%s),", travel_time));

		return sb.toString();
	}
}
