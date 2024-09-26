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
	private Long temaNo;		//테마번호
	
	private String memberId;	//등록한 멤버아이디

	@NonNull
	@Column(name = "tema_name")
	private String temaName; 	//테마이름
	@NonNull
	@Column(name = "cafe_name")
	private String cafeName;	//카페이름
	
	@Column(name = "cafe_phone")
	private Long cafePhone;
	@NonNull
	private String genre;		//장르
	private String location;	//지역
	private Long difficulty; 	//난이도
	
	@Column(name = "tema_content", length = 300)
	private String temaContent;	//내용
	
	
	private double rating;		//평점
	private Long timetaken;		//소요시간	
	private Long price;			//가격
	private Long personnel;		//인원수
	
	@Column(name = "latitude")
	private Double latitude;		//위도
	@Column(name = "longitude")
	private Double longitude;		//경도
	
	
	private String address;			//주소
	
	@Column(name = "img_url")
	private String imgUrl;
	
	
	@Column(name = "tema_count", columnDefinition = "NUMBER default 0")
	private Long temaCount = 0L; 		//조회수
	
	@CreatedDate
	@Column(name = "tema_created_date")
	private LocalDateTime temaCreatedDate;	//등록일

	
    
   
	
}
