package kr.co.ismartcity.smartfactory.entity;

import org.json.simple.JSONObject;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Setter
public class AirSensorStation {
//	private String _id;
	private int code;
	private long date;
	private double latitude;
	private double longitude;
	private float pm25;
	private float pm10;
	private float no2;
	private float co;
	private float o3;
	private float so2;
	
	
	public AirSensorStation() {		
	}
	
	public AirSensorStation(JSONObject item) {
		if (item != null) {
//			set_id(item.get("_id").toString());
			setCode(Integer.valueOf(item.get("code").toString()));
			setDate(Long.valueOf(item.get("date").toString()));
			
			if(item.get("longitude") != null) {
				double doubleLongitude = Double.valueOf(item.get("longitude").toString());
				setLongitude(doubleLongitude);
			}
			
			if(item.get("latitude") != null) {
				double doubleLatitude = Double.valueOf(item.get("latitude").toString());
				setLatitude(doubleLatitude);
			}
			
			if(item.get("PM25") != null)  {
				String pm25 = item.get("PM25").toString();
				if(pm25.contains(".")) {
					double doublePm25 = (double)item.get("PM25");
					pm25 = String.valueOf(Math.round(doublePm25));
				}
				setPm25(Integer.valueOf(pm25));
			}
			
			if(item.get("PM10") != null) {
				String pm10 = item.get("PM10").toString();
				if(pm10.contains(".")) {
					double doublePm10 = (double)item.get("PM10");
					pm10 = String.valueOf(Math.round(doublePm10));
				}
				setPm10(Integer.valueOf(pm10));
			}								
		
			if (item.get("CO") != null)
				setCo(Float.valueOf(item.get("CO").toString()));
			if (item.get("O3") != null)
				setO3(Float.valueOf(item.get("O3").toString()));
			if (item.get("SO2") != null)
				setSo2(Float.valueOf(item.get("SO2").toString()));
			if (item.get("NO2") != null)
				setNo2(Float.valueOf(item.get("NO2").toString()));
		}
	}
	
	public String toString() {
		StringBuffer sb = new StringBuffer();
		sb.append(String.format("code(%d),", code));
		sb.append(String.format("date(%d),", date));
		sb.append(String.format("latitude(%f),", latitude));
		sb.append(String.format("longitude(%f),", longitude));
		sb.append(String.format("pm25(%d),", pm25));
		sb.append(String.format("pm10(%d),", pm10));		
		sb.append(String.format("no2(%f),", no2));
		sb.append(String.format("co(%f),", co));
		sb.append(String.format("o3(%f),", o3));
		sb.append(String.format("so2(%f),", so2));
				
		return sb.toString();
	}	
}
