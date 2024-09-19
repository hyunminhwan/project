package com.project.springboot.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@Entity
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Member {
	
	@Id
	@Column(name = "member_id")
	private String memberId; // 아이디
	
	@NonNull
	@Column(name = "member_pwd")
	private String memberPwd; // 비밀번호
	
	@NonNull
	@Column(name = "member_name")
	private String memberName; // 이름
	
	@NonNull
	@Column(name = "member_phone")
	private Long memberPhone; // 핸드폰
	
	@NonNull
	@Column(name = "member_email")
	private String memberEmail; // 이메일
	 
	@CreatedDate
	@Column(name = "member_create_date")
	private LocalDateTime memberCreateDate; // 아이디생성일자
	
	@LastModifiedDate
	@Column(name="member_update_date")
	private LocalDateTime memberUpdateDate; // 비밀번호변경일자
	
	
	@Column(name="loginType") // 로그인타입 : 일반(1), 관계자(2), 관리자(3) 구분
	private int loginType;
	
	
	// 생년월일과 성별 추가
	@Column(name="birth_date")
    private LocalDate birthDate;
    private String gender;
}