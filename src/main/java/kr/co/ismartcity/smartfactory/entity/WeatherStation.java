package kr.co.ismartcity.smartfactory.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="WEATHER_STATION")
public class WeatherStation {
	
	@Id
	public long code;
	
	@Column
	public String name;
	
	@Column
	public String addr;
	
	@Column
	public double latitude;
	
	@Column
	public double longitude;
	
	@Column
	public String descript;
	
	public String toString() {
		StringBuffer sb = new StringBuffer();
		sb.append(String.format("code(%d),", code));
		sb.append(String.format("name(%s),", name));
		sb.append(String.format("addr(%s),", addr));
		sb.append(String.format("latitude(%f),", latitude));
		sb.append(String.format("longitude(%f),", longitude));
		sb.append(String.format("descript(%s),", descript));
		
		return sb.toString();
	}	
};