package kr.co.ismartcity.smartfactory.model;


import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("WorkflowVo")
public class WorkflowVo {
	
	private Integer seq;
	private Integer eventTriggerSeq;
	private String eventProcCd;
	private Integer ordr;
	private String regDt;
	
}
