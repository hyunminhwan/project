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
	
	// 해당 날짜에 예약된 시간들을 반환하는 메서드
	@GetMapping("/findReservations")
	public List<Reservation> findReservations(@RequestParam("temaNo") Long temaNo, @RequestParam("useDate") LocalDate useDate) {
		return reservationService.findReservationsByDate(temaNo, useDate);
	}
	
	// 새로운 예약 추가 메서드
	@PostMapping("/addReserve")
	public Reservation addReserve(@RequestBody Reservation reserve) {
		return reservationService.addReserve(reserve);
	}
	
	// 날짜로 예약된 시간 조회
	@GetMapping("/findDate")
	public List<Reservation> getReservationsByDate(
			@RequestParam("temaNo") Long temaNo,
			@RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
			@RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
		
		// 해당 날짜 사이의 예약을 모두 조회하여 반환
        return reservationService.getReservationsByDateRange(temaNo, startDate, endDate);
	}
	
	// 예약번호로 예약 조회
	@GetMapping("/findCode")
	public Reservation getReservationByCode(@RequestParam("reservationCode") Long reservationCode) {
		return reservationService.getReservationByCode(reservationCode);
	}
	
	// 예약 취소 요청 (결제 상태 'C'로 변경)
	@PostMapping("/cancel")
	public Reservation cancelReservation(@RequestParam("reservationCode") Long reservationCode) {
		return reservationService.cancelReservation(reservationCode);
	}
	
}
