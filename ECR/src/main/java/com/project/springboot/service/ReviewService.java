package com.project.springboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.springboot.domain.Reviews;
import com.project.springboot.repository.ReviewRepository;

@Service
public class ReviewService {
	
	@Autowired
	ReviewRepository reviewRepository;

	public List<Reviews> reviewByTema(Long temaNo) {
		return reviewRepository.findAllByTemaNoOrderByReviewNoDesc(temaNo);
	}

	public Reviews reviewInsert(Reviews reviews) {
		return reviewRepository.save(reviews);
	}

	public String reviewDelete(Long reviewNo) {
		reviewRepository.deleteById(reviewNo);
		return "성공!";
	}
	
}
