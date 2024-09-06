package com.project.springboot.domain;

import java.util.Optional;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@Entity
@NoArgsConstructor
public class MasterLogin {
	
	@Id
	private String masterid;
	
	@NonNull
	private String masterpassword;
	
	@NonNull
	private String mastername;

	

}
