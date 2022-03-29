package kr.co.ismartcity.smartfactory.model.code;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("CodeMasterVo")
public class CodeMasterVo {

	private String masterCd;		// 그룹코드
	private String masterCdNm;		// 그룹코드 명
	private String masterCdOrder;	// 그룹 코드 순서
	
}
