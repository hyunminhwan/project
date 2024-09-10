package com.project.springboot.domain;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.web.bind.annotation.RestController;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;

@Data
@Entity
@RestController
@EntityListeners(AuditingEntityListener.class)
public class Reviews {
	
	@Id
	@SequenceGenerator(
			name="reviewseq",
			sequenceName = "review_no_seq",
			allocationSize = 1
			)
	@GeneratedValue(generator = "reviewseq")
	@Column(name = "review_no")
	private Long reviewNo; 					//리뷰번호
	
	
	@Column(name = "tema_no")
	private Long temaNo; 						//테마번호
	
	@Column(name = "review_content")
	private String reviewContent; 			//후기내용
	
	private String userId; 					//유저아이디
	
	@Column(name = "review_rating")
	private double reviewRating;				//평점
	
	@CreatedDate
	@Column(name = "review_created_date")
	private LocalDateTime reviewCreatedDate;	//등록일
}
