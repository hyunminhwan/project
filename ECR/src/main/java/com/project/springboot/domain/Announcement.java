package com.project.springboot.domain;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Announcement {

	@Id
	@Column(name="board_no")
	private Long boardNo; // 공지사항 번호
	@Column( name = "board_title")
	private String boardTitle; // 공지사항의 제목
	@Column ( name = "board_content")
	private String boardContent;  // 공지사항의 내용
	
	private String managerId; // 관리자아이디
	private Long boardCount; // 조회수
	
	@CreatedDate
	@Column(name = "board_create_date")
	private LocalDateTime boardCreateDate; // 공지사항의 생성일자
	

	@LastModifiedDate
	@Column(name="board_update_date")
	private LocalDateTime boardUpdateDate; // 공지사항의 수정일자

}
