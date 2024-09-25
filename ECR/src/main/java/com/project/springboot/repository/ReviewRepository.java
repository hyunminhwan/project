package com.project.springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.springboot.domain.Reviews;

import jakarta.transaction.Transactional;

public interface ReviewRepository extends JpaRepository<Reviews, Long>{


	//해당테마에있는 리뷰를 내림차순으로 가져오기
	List<Reviews> findAllByTemaNoOrderByReviewNoDesc(Long temaNo);

	//해당 테마에있는 리뷰 평균을내서 가져오기
	@Query("SELECT AVG(r.reviewRating) FROM Reviews r WHERE r.temaNo = :temaNo")
	Double findAvgRatingByTemaNo(@Param("temaNo") Long temaNo);


	//해당 테마에대한 모든리뷰 삭제
	void deleteByTemaNo(Long temaNo);

	@Transactional  // 트랜잭션 설정 추가
	void deleteByUserId(String memberId);

}