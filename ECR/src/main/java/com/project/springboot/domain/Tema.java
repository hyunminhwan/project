package com.project.springboot.domain;

import java.time.LocalDateTime;

import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

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
	private Long tema_no;
	
	@NonNull
	private String tema_name;
	@NonNull
	private String cafe_name;
	@NonNull
	private String genre;
	private String location;
	private int difficulty; 
	private String tema_content;
	private int rating;
	private int timetaken;
	private int price;
	private int personnel;
	
	@CreatedDate
	private LocalDateTime tema_created_date;
    
    
   
	
}
