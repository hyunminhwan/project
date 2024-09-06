package com.project.springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.springboot.domain.Reviews;

public interface ReviewRepository extends JpaRepository<Reviews, Long>{

	List<Reviews> findAllByTemaNoOrderByReviewNoDesc(Long temaNo);

}
