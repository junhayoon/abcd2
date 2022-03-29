package kr.co.ismartcity.smartfactory.model.event;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("EventPlaceVo")
public class EventPlaceVo {

	private Integer workplaceId;
	private String categoryName;
	private String fcode;
	private String facilityName;
	private String facilityCategoryCcode;
	private String workplaceName;
	private String workplaceAddr;
	private String workplaceTel;
	private Double latitude;
	private Double longitude;
	
}
