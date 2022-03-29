package kr.co.ismartcity.smartfactory.model.event;

import org.apache.ibatis.type.Alias;

import kr.co.ismartcity.smartfactory.model.common.CommonVo;
import lombok.Data;

@Data
@Alias("EventInfoVo")
public class EventInfoVo extends CommonVo {

	private Integer seq;				// 이벤트 정보 고유 번호
	private String area;				// 이벤트 공단 구분
	private String eventGb;				// 이벤트 구분(센서 구분)
	private String eventCd;				// 이벤트 코드(이벤트 키 코드값)
	private String eventGradeCd;		// 이벤트 등급 코드
	private String eventNm;				// 이벤트 명
	private String eventMsg;			// 이벤트 메시지
	private Double eventVal;			// 이벤트 설정 값
	private String popupYn;				// 알림팝업 설정 여부
	
	private Double dataValue;			// 기기 데이터 값
	
}
