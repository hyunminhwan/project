package com.project.springboot.domain;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Announcement {

	@Id
	private Long Id; // 관리자아이디
	
	private String title; // 공지사항의 제목
	
	@Column(columnDefinition = "TEXT")
	private String content;  // 공지사항의 내용
	
	@Temporal(TemporalType.TIMESTAMP)
	private String createdDate; // 공지사항의 생성일자
	
	@Temporal(TemporalType.TIMESTAMP)
	private String updatedDate; // 공지사항의 수정일자

}
