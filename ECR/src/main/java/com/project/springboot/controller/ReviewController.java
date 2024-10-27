package com.project.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.springboot.domain.Reviews;
import com.project.springboot.service.ReviewService;

@RestController
@RequestMapping("/review")
public class ReviewController {
	
	@Autowired
	ReviewService reviewService;
	
	//테마에 등록된 모든 리뷰 가져오기
	@GetMapping("/tema/{temaNo}")
	public List<Reviews> reviewByTema(@PathVariable(name="temaNo")  Long temaNo) {
		return reviewService.reviewByTema(temaNo);
	}
	
	//리뷰 등록
	@PostMapping("/insert")
	public Reviews reviewInsert(@RequestBody Reviews reviews) {
		return reviewService.reviewInsert(reviews);
	}
	
	//리뷰 삭제
	@DeleteMapping("/delete/{reviewNo}")
	public String reviewDelete(@PathVariable(name="reviewNo") Long reviewNo) {
		return reviewService.reviewDelete(reviewNo);
	}
	
	//리뷰수정
	@PutMapping("/edit/{reviewNo}")
	public Reviews reviewEdit(@PathVariable(name="reviewNo") Long reviewNo,@RequestBody Reviews reviews) {
		return reviewService.reviewEdit(reviewNo,reviews);
	}
	
	
}
