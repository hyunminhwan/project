package com.project.springboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.springboot.domain.Reviews;
import com.project.springboot.repository.ReviewRepository;

import jakarta.transaction.Transactional;

@Service
public class ReviewService {
	
	@Autowired
	ReviewRepository reviewRepository;

	//해당 테마에대한 모든 리뷰를 내림차순으로 가져오기(최신 리뷰가 맨위)
	public List<Reviews> reviewByTema(Long temaNo) {
		return reviewRepository.findAllByTemaNoOrderByReviewNoDesc(temaNo);
	}

	//리뷰 등록
	public Reviews reviewInsert(Reviews reviews) {
		return reviewRepository.save(reviews);
	}

	//리뷰 삭제
	public String reviewDelete(Long reviewNo) {
		reviewRepository.deleteById(reviewNo);
		return "성공!";
	}

	//테마에 있는 모든 리뷰 삭제
	@Transactional
	public void delete(Long temaNo) {
		reviewRepository.deleteByTemaNo(temaNo);
	}

	//리뷰 수정 
	public Reviews reviewEdit(Long reviewNo, Reviews reviews) {
		Reviews rev=reviewRepository.findById(reviewNo).get();
		rev.setReviewContent(reviews.getReviewContent());
		rev.setReviewRating(reviews.getReviewRating());
		return reviewRepository.save(rev);
	}
	
}
