package kr.co.ismartcity.smartfactory.entity;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.json.simple.JSONObject;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Setter
public class CntList {

	private int seq;
	private String camId;
	private String inOut;
	private String inpMs;
	private String totCnt;
	private String lineNo;
	private String inpTm;
	
	
	public CntList() {		
		
	}
	
	public CntList(String camId, String inOut, String inpMs, String totCnt, String lineNo, String inpTm) {
		super();
		this.camId = camId;
		this.inOut = inOut;
		this.inpMs = inpMs;
		this.totCnt = totCnt;
		this.lineNo = lineNo;
		this.inpTm = inpTm;
	}	
	

	
	public String toString() {
		StringBuffer sb = new StringBuffer();

				
		return sb.toString();
	}




}
