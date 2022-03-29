package kr.co.ismartcity.smartfactory.model.event;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("EventTriggerVo")
public class EventTriggerInfoVo {
	
	private Integer seq;		// 이벤트 발생 정보 고유 번호
	private String eventCd;		// 이벤트 발생 코드
	private String eventKey;	// 이벤트 발생 키 값
	private Double value;		// 이벤트 발생 조건 값
	private String eventGrade;	// 이벤트 등급
	private String eventNm;		// 이벤트 
	private String eventMsg;
	private String regDt;
	
}
