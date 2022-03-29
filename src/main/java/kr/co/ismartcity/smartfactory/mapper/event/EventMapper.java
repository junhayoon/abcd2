package kr.co.ismartcity.smartfactory.mapper.event;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import kr.co.ismartcity.smartfactory.model.event.DashboardEventVo;
import kr.co.ismartcity.smartfactory.model.event.EventInfoVo;
import kr.co.ismartcity.smartfactory.model.event.EventPlaceVo;
import kr.co.ismartcity.smartfactory.model.event.EventTriggerInfoVo;

@Mapper
public interface EventMapper {

	public EventTriggerInfoVo getEventTriggerInfo(EventTriggerInfoVo eventTriggerInfoVo);
	
	public EventTriggerInfoVo getEventTriggerByValue(EventTriggerInfoVo eventTriggerInfoVo);
	
	public int insertDashboardEvent(DashboardEventVo dashboardEventVo);

	public ArrayList<EventInfoVo> getEventInfoByGubun(String eventGb);
	
	public EventInfoVo getWarningEventInfo(@Param("eventGb") String eventGb, @Param("eventCd") String eventCd, @Param("eventVal") Double eventVal);
	
	public EventPlaceVo getEventPlaceByFcode(@Param("fcode") String fcode);
}
