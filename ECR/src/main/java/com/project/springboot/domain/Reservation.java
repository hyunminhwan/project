package com.project.springboot.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Reservation {
	
	@Id
	@SequenceGenerator(
			name = "reservation_code",
			sequenceName = "reserve_no_seq",
			allocationSize = 1,
			initialValue = 100000
	)
	@GeneratedValue(generator = "reservation_code")
	@Column(name = "reservation_code")
	private Long reservationCode;				// 예약번호(PK)
	
	@ManyToOne(fetch = FetchType.EAGER)			// Tema 테이블과 다대일 관계(예약관리에서 테마 정보를 받기위해 사용)
	@JoinColumn(name = "tema_no")				// 테마번호(FK)
	private Tema tema;							// Tema 객체 참조	
	
	@Column(name = "user_id")
	private String userId;						// 유저아이디(FK)					
	
	@Column(name = "reservation_date")
	@CreatedDate
	private LocalDateTime reservationDate;		// 예약 생성 날짜 및 시간
	
	@Column(name = "payment_status")
	private String paymentStatus;				// 결제 상태 ('Y', 'N', 'C')
	
	@Column(name = "use_date")
	private LocalDate useDate;					// 사용날짜
	
	@Column(name = "use_time")
	private LocalTime useTime;					// 사용시간
	
}
