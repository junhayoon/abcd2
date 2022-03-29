package kr.co.ismartcity.smartfactory.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItstrafficID implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private Integer sno;		// 순번
	private Integer link_id;	// 링크 고유값	
}
