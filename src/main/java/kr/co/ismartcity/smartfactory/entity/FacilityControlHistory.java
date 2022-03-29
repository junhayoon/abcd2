package kr.co.ismartcity.smartfactory.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "FACILITY_CONTROL_HISTORY")
public class FacilityControlHistory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// @JsonIgnore

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "facility_fcode", nullable = false, unique = false)
	private Facility facility;

	@Column(nullable = false, unique = false, length = 3)
	private String controlType; // 제어타입(001:PowerReboot, 002:PowerOff, ..)

	@Column(nullable = false, unique = false)
	@ColumnDefault("0")
	private boolean autoControlled;

	@OneToOne(fetch = FetchType.EAGER)
	private User createUser;

	// @JsonFormat(shape = JsonFormat.Shape.STRING, pattern =
	// "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "UTC+10:00") // UTC UTC+09:00
	// Asia/Seoul
	@Column
	@CreationTimestamp
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	private LocalDateTime create_date_time;

	public String toString() {
		StringBuffer sb = new StringBuffer();
		sb.append(String.format("id(%d),", id));

		sb.append(String.format("facility(%s),", facility));
		sb.append(String.format("controlType(%s),", controlType));
		sb.append(String.format("autoControlled(%b),", autoControlled));

		sb.append(String.format("create_date_time(%s),", create_date_time));
		sb.append(String.format("createUser(%s),", createUser));

		return sb.toString();
	}
}
