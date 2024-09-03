package com.project.springboot.domain;

import java.time.LocalDateTime;

import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.data.annotation.CreatedDate;
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
@Entity(name = "themes")
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Tema {
	@Id
	@SequenceGenerator(
			name="temaseq",
			sequenceName = "tema_no_seq",
			allocationSize = 1
			)
	@GeneratedValue(generator = "temaseq")
	@Column(name = "tema_no")
	private Long temaNo;
	
	@NonNull
	@Column(name = "tema_name")
	private String temaName;
	@NonNull
	@Column(name = "cafe_name")
	private String cafeName;
	@NonNull
	private String genre;
	private String location;
	private Long difficulty; 
	
	@Column(name = "tema_content")
	private String temaContent;
	private Long rating;
	private Long timetaken;
	private Long price;
	private Long personnel;
	
	@CreatedDate
	@Column(name = "tema_created_date")
	private LocalDateTime temaCreatedDate;
    
    
   
	
}
