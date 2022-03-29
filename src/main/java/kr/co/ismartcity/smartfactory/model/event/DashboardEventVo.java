package kr.co.ismartcity.smartfactory.model.event;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.apache.ibatis.type.Alias;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import kr.co.ismartcity.smartfactory.entity.Code;
import kr.co.ismartcity.smartfactory.entity.Facility;
import kr.co.ismartcity.smartfactory.entity.User;
import lombok.Data;

@Data
@Alias("DashboardEventVo")
public class DashboardEventVo {
	
	private Long id;
	private Integer eventTriggerSeq;
	private String eventCd;
	private String categoryCd;
	private String gradeCd;
	private String dashFacility;
	private String gateway;
	private String createDateTime;
	private String updateDateTime;
	private boolean checking;
	private Integer confirmUserId;
	private String dashUser;
	private String facilityFcode;
	private Integer createUserId;
	private Integer updateUserId;
	private String categoryCodeMasterCd;
	private String eventCodeMasterCd;
	private String gradeCodeMasterCd;
	private String confirmMessage;
	
	public String toString() {
		StringBuffer sb = new StringBuffer();
		sb.append(String.format("id(%d),", id));
		sb.append(String.format("eventTriggerSeq(%s),", eventTriggerSeq));
		sb.append(String.format("eventCd(%s),", eventCd));
		sb.append(String.format("gradeCd(%s),", gradeCd));		
		sb.append(String.format("categoryCd(%s),", categoryCd));		
		sb.append(String.format("dashFacility(%s),", dashFacility));
		sb.append(String.format("gateway(%s),", gateway));
		sb.append(String.format("message(%b),", confirmMessage));
		sb.append(String.format("checking(%b),", checking));
		sb.append(String.format("createUserId(%s),", createUserId));
		sb.append(String.format("createDateTime;(%s),", createDateTime));
		return sb.toString();
	}
	
}
