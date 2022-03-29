package kr.co.ismartcity.smartfactory.model.code;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("CodeVo")
public class CodeVo {
	
	private String codeMasterCd;	// 그룹코드
	private String cd;				// 코드
	private String cdNm;			// 코드명
	private Integer cdOrder;			// 코드 순서
	
}
