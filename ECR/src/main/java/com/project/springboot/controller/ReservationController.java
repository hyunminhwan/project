package com.project.springboot.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.springboot.domain.Reservation;
import com.project.springboot.service.ReservationService;

@RestController
@RequestMapping("/res")
public class ReservationController {

	@Autowired
	ReservationService reservationService;
	
	// 일반회원: 사용자가 날짜를 선택했을 때 예약된 시간들을 반환하는 메서드(예약하기)
	@GetMapping("/findReservations")
	public List<Reservation> findReservations(@RequestParam("temaNo") Long temaNo, @RequestParam("useDate") LocalDate useDate) {
		// Service에서 temaNo를 통해 테마 정보를 가져온 후, 해당 테마에 대한 예약정보 조회
		return reservationService.findReservationsByDate(temaNo, useDate);
	}
	
	// 일반회원: 예약 추가 메서드
	@PostMapping("/addReserve")
	public Reservation addReserve(@RequestBody Reservation reserve) {
		return reservationService.addReserve(reserve);
	}
	
	// 일반회원: 특정날짜 범위의 예약 조회(예약내역 조회)
	@GetMapping("/findDate")
	public List<Reservation> getReservationsByDate(
			@RequestParam("temaNo") Long temaNo,
			@RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
			@RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
		
		// Service에서 temaNo를 통해 테마 정보를 가져온 후, 해당 테마에 대한 예약정보 조회
        return reservationService.getReservationsByDateRange(temaNo, startDate, endDate);
	}
	
	// 일반회원: 예약번호로 예약정보 조회(예약내역 조회)
	@GetMapping("/findCode")
	public Reservation getReservationByCode(@RequestParam("reservationCode") Long reservationCode) {
		return reservationService.getReservationByCode(reservationCode);
	}
	
	// 일반회원: 예약 취소 요청(결제상태 'C'로 변경)(예약내역  조회)
	@PostMapping("/cancel")
	public Reservation cancelReservation(@RequestParam("reservationCode") Long reservationCode) {
		return reservationService.cancelReservation(reservationCode);
	}
	
	
    // 관리자: 전체 조회 (페이징 지원)
    @GetMapping("/adminFindAll")
    public List<Reservation> getAllReservations(
            @RequestParam(name = "page") int page, 
            @RequestParam(name = "size") int size) {
        return reservationService.getAllReservations(page, size);
    }

    // 관리자: 기간별 예약 조회
    @GetMapping("/adminFindDate")
    public List<Reservation> getReservationsByDate(
            @RequestParam(name = "startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(name = "endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return reservationService.getReservationsByDateRange(startDate, endDate);
    }

    // 관리자: 결제 상태별 조회 ('Y', 'N', 'C')
    @GetMapping("/adminFindByStatus")
    public List<Reservation> getReservationsByStatus(
            @RequestParam(name = "paymentStatus") String paymentStatus) {
        return reservationService.getReservationsByStatus(paymentStatus);
    }
    
    // 관리자: 취소신청된 예약 승인처리('취소완료'로 변경)
    @PostMapping("/approveCancel")
    public Reservation approveCancellation(@RequestParam("reservationCode") Long reservationCode) {
    	return reservationService.approveCancellation(reservationCode);
    }
    
 // 관리자: 취소신청된 예약 승인처리('예약확정'로 변경)
    @PostMapping("/approveReserve")
    public Reservation approveReservation(@RequestParam("reservationCode") Long reservationCode) {
    	return reservationService.approveReservation(reservationCode);
    }

}
