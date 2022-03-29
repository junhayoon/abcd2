package kr.co.ismartcity.smartfactory.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="ROLE")
public class UserRole {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable=false, unique=true, length=50)
	private String roleId;
	
	@Column(nullable=false, unique=false, length=50)
	private String roleName;

	public UserRole(String roleId) {
		this.roleId = roleId;
	}
	
	public UserRole(String roleId, String roleName) {
		this.roleId = roleId;
		this.roleName = roleName;
	}
}
