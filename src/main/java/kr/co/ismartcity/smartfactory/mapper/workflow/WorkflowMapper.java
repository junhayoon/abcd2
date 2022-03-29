package kr.co.ismartcity.smartfactory.mapper.workflow;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import kr.co.ismartcity.smartfactory.model.WorkflowVo;

@Mapper
public interface WorkflowMapper {
	ArrayList<WorkflowVo> getEventWorkflow(Integer eventTriggerSeq);
}