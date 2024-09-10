package com.project.springboot.domain;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@Entity
@NoArgsConstructor
// @EntityListeners(AuditingEntityListener.class) - 모르겠음
public class Admin {

	@Id
	@Column(name="manager_id")
//	@SequenceGenerator(
//			name="adminseq",
//			sequenceName = "admin_id_seq",
//			allocationSize = 1
//			)
//	@GeneratedValue(generator = "adminseq") 있어야 하나 모르겠음
	private String managerId;
	
	@Column(name = "manager_pwd")
	private String managerPwd;
	
	@Column(name = "manager_name")
	private String managerName;
	
	@Column(name = "manager_email")
	@NonNull
	private String managerEmail;
}
