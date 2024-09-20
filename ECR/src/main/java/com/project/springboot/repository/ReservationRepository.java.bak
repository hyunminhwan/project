package com.project.springboot.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.springboot.domain.Reservation;
import com.project.springboot.domain.Tema;

import jakarta.transaction.Transactional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

	// 일반회원이 예약하기 폼에서 사용날짜를 선택했을 때 해당 날짜에 예약된 시간들을 반환하는 메서드
	List<Reservation> findByTemaAndUseDate(Tema tema, LocalDate useDate);

	// 일반회원이 마이페이지->예약내역 조회 폼에서 날짜를 선택해서 기간 내 예약된 예약정보 조회
	List<Reservation> findByTemaAndUseDateBetween(Tema tema, LocalDate startDate, LocalDate endDate);

	// 전체 예약 페이징 조회
    Page<Reservation> findAll(Pageable pageable);

    // 기간 내 예약 조회
    List<Reservation> findByUseDateBetween(LocalDate startDate, LocalDate endDate);

    // 결제 상태로 예약 조회
    List<Reservation> findByPaymentStatus(String paymentStatus);

    @Transactional  // 트랜잭션 설정 추가
	void deleteByUserId(String memberId);
}
