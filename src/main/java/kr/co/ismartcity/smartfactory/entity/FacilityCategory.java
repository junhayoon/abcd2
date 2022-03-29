package kr.co.ismartcity.smartfactory.entity;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import kr.co.ismartcity.smartfactory.converter.JsonToArrayConverter;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="FACILITY_CATEGORY")
public class FacilityCategory {

	@Id
	private String ccode;
	
	@Column(nullable=false, unique=false, length=50)
	private String categoryName;
	
	@Column(nullable=false, unique=false, length=100)
	private String categorySymbol;
	
	@Column(nullable=false, unique=false)
	private boolean categorySymbolRemovable;
	
	@Column(nullable=false, unique=false)
	@ColumnDefault("0") 
	private boolean hasRuleSet;
	
	@Convert(converter = JsonToArrayConverter.class)
	@Column(name="properties", columnDefinition="JSON")
    private List<Object> properties;
	
	@Column(nullable=false, unique=false)
	@ColumnDefault("1") 
	private boolean enabled;
	
	@OneToOne(fetch = FetchType.EAGER)
	private User createUser;
	
	@OneToOne(fetch = FetchType.EAGER) 
	private User updateUser;
	
	@Column
	@CreationTimestamp
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	private LocalDateTime createDateTime;
	 
	@Column
	@UpdateTimestamp
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	private LocalDateTime updateDateTime;
	
	// @JsonIgnore
	@Transient
	private List<Facility> facilitys;
}
