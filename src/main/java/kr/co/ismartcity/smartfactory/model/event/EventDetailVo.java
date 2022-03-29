package kr.co.ismartcity.smartfactory.model.event;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("EventDetailVo")
public class EventDetailVo {

	private Integer seq;			// 이벤트 상세 고유번호
	private Integer eventSeq;		// 이벤트 고유번호 (FK : event_info - seq)
	private String eventProcCd;		// 이벤트 처리 코드
	private String eventProcStr;	// 이벤트 처리 명
	
}
