package kr.co.ismartcity.smartfactory.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
@Table(name="utic_ims_open")
public class UticImsOpen {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(length=14)
	private Integer sno		;		//	순번

	@Column(length=100)
	private String incident_id			;    //string	고유아이디
	@Column(length=100)
	private String incidente_type_cd		;    //string	돌발유형
	@Column(length=100)
	private String incidente_sub_type_cd	;    //string	돌발 세부유형
	@Column(length=100)
	private String address_jibun			;    //string	주소(지번)
	@Column(length=100)
	private String address_jibun_cd			;    //int		주소코드
	@Column(length=100)
	private String address_new			;    //string	도로명주소
	@Column(length=100)
	private String link_id					;    //int		노드링크아이디
	@Column(length=100)
	private double location_dataX		;    //double	x좌표
	@Column(length=100)
	private double location_dataY		;    //double	y좌표
	@Column(length=100)
	private String location_type_cd		;    //string	지점,영역,구간 구분코드
	@Column(length=100)
	private String location_data			;    //string	좌표정보
	@Column(length=100)
	private String incidente_traffic_cd	;    //string	소통등급
	@Column(length=100)
	private String incidente_grade_cd		;    //string	돌발등급
	@Column(length=500)
	private String incident_title		;    //string	돌발제목
	@Column(length=100)
	private String incident_region_cd		;    //string	돌발지역코드
	@Column(length=100)
	private String start_date			;    //string	발생일
	@Column(length=100)
	private String end_date				;    //string	종료일
	@Column(length=100)
	private String lane					;    //string	차선
	@Column(length=100)
	private String road_name				;    //string	도로명
	@Column(length=100)
	private String source_code			;    //string	제보출처(OPER_SGUBUN)



	@Column(name="reg_date")
	@CreationTimestamp
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	private LocalDateTime reg_date;

}
