package com.project.springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.springboot.domain.Reviews;

public interface ReviewRepository extends JpaRepository<Reviews, Long>{


	List<Reviews> findAllByTemaNoOrderByReviewNoDesc(Long temaNo);

	@Query("SELECT AVG(r.reviewRating) FROM Reviews r WHERE r.temaNo = :temaNo")
	Double findAvgRatingByTemaNo(@Param("temaNo") Long temaNo);

}
