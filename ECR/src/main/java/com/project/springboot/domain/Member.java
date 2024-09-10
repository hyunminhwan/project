package com.project.springboot.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Member {
	
	@Id
	@SequenceGenerator(
			name = "member_no",
			sequenceName = "member_no_seq",
			allocationSize = 1
	)
	@GeneratedValue(generator = "member_no")
	@Column(name = "member_no")
	private Long memberNo;						// 회원번호(시퀀스)
	
	@Column(name = "member_id")
	private String memberId;					// 회원아이디
	
	@Column(name = "member_pwd")
	private String memberPwd;					// 회원 비밀번호
	
	@Column(name = "member_name")
	private String memberName;					// 회원이름
	
	@Column(name = "member_phone")
	private String memberPhone;					// 회원 연락처
	
	@Column(name = "member_email")
	private String memberEmail;					// 회원 이메일
	
	@Column(name = "member_create_date")
	@CreatedDate
	private LocalDateTime memberCreateDate;		// 회원가입 날짜
	
	@Column(name = "last_pwd_date")
	@CreatedDate
	private LocalDate lastPwdDate;				// 비밀번호 변경 날짜
	
	@Column(name = "shop_name")
	private String shopName;					// 업체 이름
	
	@Column(name = "shop_address")
	private String shopAddress;					// 업체 주소
	
	@Column(name = "shop_phone")
	private String shopPhone;					// 업체 연락처
	
	@Column(name = "member_type")
	private Long memberType;					// 회원타입(1: "일반회원", 2: "업체회원") 
	

}
