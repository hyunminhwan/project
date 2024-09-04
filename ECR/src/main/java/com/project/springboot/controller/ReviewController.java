package com.project.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.springboot.domain.Reviews;
import com.project.springboot.service.ReviewService;

@RestController
@RequestMapping("/review")
public class ReviewController {
	
	@Autowired
	ReviewService reviewService;
	
	@GetMapping("/tema/{temaNo}")
	public List<Reviews> reviewByTema(@PathVariable(name="temaNo")  Long temaNo) {
		System.out.println("테마번호는? "+temaNo);
		return reviewService.reviewByTema(temaNo);
	}
	
	@PostMapping
	public Reviews reviewInsert(@RequestBody Reviews reviews) {
		return reviewService.reviewInsert(reviews);
	}
}
