package com.project.springboot.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.springboot.domain.Reservation;
import com.project.springboot.domain.Tema;

import jakarta.transaction.Transactional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
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

    
    // 일반회원: 회원아이디와 기간별 예약조회 <- 이거임
    @Query("SELECT r FROM Reservation r JOIN FETCH r.tema WHERE r.userId = :userId AND r.useDate BETWEEN :startDate AND :endDate")
	List<Reservation> findByUserIdAndUseDateBetween(@Param("userId") String userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

	// 특정테마와 날짜로 예약정보 조회
	List<Reservation> findByTemaAndUseDate(Tema tema, LocalDate useDate);

	// 일반회원: 마이페이지 예약확인에서 예약내역 전체 조회(예약내역 조회)
	Page<Reservation> findByUserId(String userId, PageRequest pageRequest);
	
}