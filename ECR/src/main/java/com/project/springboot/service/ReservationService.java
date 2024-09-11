package com.project.springboot.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.springboot.domain.Reservation;
import com.project.springboot.repository.ReservationRepository;

@Service
public class ReservationService {

	@Autowired
	ReservationRepository reservationRepository;
	
	// 특정 테마의 특정 날짜에 예약된 시간대를 조회
	public List<Reservation> findReservationsByDate(Long temaNo, LocalDate useDate) {
		return reservationRepository.findByTemaNoAndUseDate(temaNo, useDate);
	}  
	
	// 새로운 예약 추가
	public Reservation addReserve(Reservation reserve) {
		return reservationRepository.save(reserve);
	}

	// 특정 기간에 해당하는 예약을 조회
	public List<Reservation> getReservationsByDateRange(Long temaNo, LocalDate startDate, LocalDate endDate) {
		return reservationRepository.findByTemaNoAndUseDateBetween(temaNo, startDate, endDate);
	}

	// 예약번호로 예약 조회
	public Reservation getReservationByCode(Long reservationCode) {
		Optional<Reservation> reservation = reservationRepository.findById(reservationCode);
		return reservation.orElse(null);
	}

	// 예약 취소 (paymentStatus를 'C'로 업데이트)
	public Reservation cancelReservation(Long reservationCode) {
		Optional<Reservation> reservation = reservationRepository.findById(reservationCode);
		if(reservation.isPresent()) {
			Reservation res = reservation.get();
			res.setPaymentStatus("C");	// 결제 상태를 'C'로 변경
			return reservationRepository.save(res);	// 변경된 값 저장(update)
		}
		return null;	// 예약이 없을 경우 null 반환
	}
}
