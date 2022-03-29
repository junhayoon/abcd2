package kr.co.ismartcity.smartfactory.entity;

import java.util.Map;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import kr.co.ismartcity.smartfactory.converter.JsonToMapConverter;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Entity
@Slf4j
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="USERS")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable=false, unique=true, length=50, updatable=false)
	private String username;
	
	@Column(nullable=false, length=100)
	private String password;
	
	@Column(nullable=false, length=50)
	private String name;
	
	@Column(length=25)
	private	String mobilePhone;
	
	@Column(length=50)
	private String email;
	
	@Column(length=25)
	private String officePhone;
	
	@Column(length=25)
	private String officeFax;
	
	@Column(length=25)
	private	String organization;
	
	@Column(length=25)
	private String department;
	
	@Column
	private boolean enabled;
	
	@Convert(converter = JsonToMapConverter.class)
	@Column(name="layouts", columnDefinition="JSON")
    private Map<String, Object> layouts;
	
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
	@JoinTable(name = "USER_ROLE", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	@Fetch(FetchMode.JOIN)
	private Set<UserRole> roles;

	public User(String username, String password, Set<UserRole> roles) {
		super();
		this.username = username;
		this.password = password;
		this.roles = roles;
	}
}
