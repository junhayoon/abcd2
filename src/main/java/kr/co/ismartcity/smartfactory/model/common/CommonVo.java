package kr.co.ismartcity.smartfactory.model.common;

import lombok.Data;

@Data
public class CommonVo {

	private String useYn;		// 사용 여부
	private String regId;		// 등록자
	private String regDt;		// 등록 일시
	private String lastChgId;		// 수정자
	private String lastChgDt;	// 수정 일시
	
}
