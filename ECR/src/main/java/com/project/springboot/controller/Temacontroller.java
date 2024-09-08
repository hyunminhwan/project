package com.project.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.springboot.domain.Tema;
import com.project.springboot.service.TemaService;

@RestController
@RequestMapping("/api")
public class Temacontroller {
	
	@Autowired
	TemaService temaService;
	
	//모든 tema 메뉴 불러오기
	@GetMapping("/menu")
	public List<Tema> menu() {
		return temaService.menu();
	}
	
	//Tema 모두저장
	@PostMapping("/tema")
	public Tema TemaAllsave(@RequestBody Tema tema) {
		return temaService.Allsave(tema);
	}
	
	//Tema 조회수 증가
	@PutMapping("/{temaNo}/count")
	public Tema Temacount(@PathVariable(name="temaNo") Long temaNo){
		return temaService.TemaCount(temaNo);
		
	}
	
	
	//tema 평점 계산
	@GetMapping("/tema/{temaNo}/avgRating")
    public ResponseEntity<Double> avgRating(@PathVariable(name="temaNo") Long temaNo) {
        Double avgRating = temaService.avgRating(temaNo);
        return ResponseEntity.ok(avgRating);
    }
}

