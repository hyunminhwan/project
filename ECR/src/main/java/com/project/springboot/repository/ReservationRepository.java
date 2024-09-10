package com.project.springboot.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.springboot.domain.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

	// 특정 테마와 날짜에 예약된 시간대 조회(예약하기 폼에서 사용)
	List<Reservation> findByTemaNoAndUseDate(Long temaNo, LocalDate useDate);

	// 특정 테마와 날짜 범위에 해당하는 예약 조회(마이페이지-예약내역 조회에서 사용)
	List<Reservation> findByTemaNoAndUseDateBetween(Long temaNo, LocalDate startDate, LocalDate endDate);


}
