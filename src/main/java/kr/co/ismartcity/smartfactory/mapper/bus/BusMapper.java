package kr.co.ismartcity.smartfactory.mapper.bus;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BusMapper {

	public int insertBusGpsInfo(List<Map<String, Object>> map);
	
	public int insertBusGpsInfoLog(List<Map<String, Object>> map);
	
}