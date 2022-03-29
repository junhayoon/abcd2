package kr.co.ismartcity.smartfactory.mapper.code;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import kr.co.ismartcity.smartfactory.model.code.CodeMasterVo;
import kr.co.ismartcity.smartfactory.model.code.CodeVo;

@Mapper
public interface CodeMapper {

	// 코드그룹 전체 목록 조회
	ArrayList<CodeMasterVo> getCodeMasterAll();
	
	// 코드그룹X코드 상세 전체 목록 조회
	ArrayList<CodeVo> getCodeAll();
	
	// 특정 코드 그룹 조회
	CodeMasterVo getCodeMasterByCode(String codeMasterCd);
	
	// 코드명으로 코드 상세 정보 조회
	CodeVo getCodeByCodeNm(String cdNm);
	
}
