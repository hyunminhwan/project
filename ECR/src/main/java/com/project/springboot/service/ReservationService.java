package com.project.springboot.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.project.springboot.domain.Reservation;
import com.project.springboot.domain.Tema;
import com.project.springboot.repository.ReservationRepository;
import com.project.springboot.repository.TemaRepository;

@Service
public class ReservationService {

	@Autowired
	ReservationRepository reservationRepository; 
	
	@Autowired
	TemaRepository temaRepository;
	
	// 일반회원: 특정 테마와 날짜에 예약된 시간대 조회
	public List<Reservation> findReservationsByDate(Long temaNo, LocalDate useDate) {
		Tema tema = temaRepository.findById(temaNo).orElseThrow(() -> new RuntimeException("테마를 찾을 수 없습니다."));
		return reservationRepository.findByTemaAndUseDate(tema, useDate);
	}  
	
	// 일반회원: 예약추가
	public Reservation saveReservation(Reservation reservation) {
		return reservationRepository.save(reservation);
	}
	
	
	
	// 일반회원: 기간 내 특정 테마의 예약 조회
	public List<Reservation> getReservationsByDateRange(String userId, LocalDate startDate, LocalDate endDate) {
		return reservationRepository.findByUserIdAndUseDateBetween(userId, startDate, endDate);
	}

	// 일반회원: 예약번호로 예약정보 조회
	public Reservation getReservationByCode(Long reservationCode) {
		return reservationRepository.findById(reservationCode).orElse(null);
	}

	// 일반회원: 예약 취소 요청 (결제 상태 'C'로 변경) ???
	public Reservation cancelReservation(Long reservationCode) {
		Optional<Reservation> reservation = reservationRepository.findById(reservationCode);
		if(reservation.isPresent()) {
			Reservation res = reservation.get();
			res.setPaymentStatus("취소신청");	// 결제 상태를 'C'로 변경
			return reservationRepository.save(res);	// 변경된 값 저장(update)
		}
		return null;	// 예약이 없을 경우 null 반환
	}
	
	// 일반회원: 마이페이지 예약확인에서 예약내역 전체 조회(예약내역 조회)
	public List<Reservation> findUserReservations(String userId, int page, int size) {
		PageRequest pageRequest = PageRequest.of(page - 1, size);  // 페이지는 0부터 시작	
	    return reservationRepository.findByUserId(userId, pageRequest).getContent();
		}
		
	// 관리자: 전체 조회 (페이징)
    public List<Reservation> getAllReservations(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page - 1, size);  // 페이지는 0부터 시작
        return reservationRepository.findAll(pageRequest).getContent();
    }

    // 관리자: 기간별 조회
    public List<Reservation> getReservationsByDateRange(LocalDate startDate, LocalDate endDate) {
        return reservationRepository.findByUseDateBetween(startDate, endDate);
    }

    // 관리자: 결제 상태로 조회
    public List<Reservation> getReservationsByStatus(String paymentStatus) {
        return reservationRepository.findByPaymentStatus(paymentStatus);
    }

    // 관리자: 취소신청 승인
	public Reservation approveCancellation(Long reservationCode) {
		Optional<Reservation> reservation = reservationRepository.findById(reservationCode);
		if(reservation.isPresent()) {
			Reservation res = reservation.get();
			res.setPaymentStatus("취소완료");
			return reservationRepository.save(res);
		}
		return null;
	}
	
	// 관리자: 예약확정 승인
	public Reservation approveReservation(Long reservationCode) {
		Optional<Reservation> reservation = reservationRepository.findById(reservationCode);
		if(reservation.isPresent()) {
			Reservation res = reservation.get();
			res.setPaymentStatus("예약확정");
			return reservationRepository.save(res);
		}
		return null;
	}




	


}