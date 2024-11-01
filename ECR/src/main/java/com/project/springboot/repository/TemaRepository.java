package com.project.springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.springboot.domain.Tema;

import jakarta.transaction.Transactional;

@Repository
public interface TemaRepository extends JpaRepository<Tema, Long>{

	//
	List<Tema> findAllByOrderByTemaNoDesc();
	//
	List<Tema> findByOrderByRatingDesc();
	//
	List<Tema> findAllByMemberIdOrderByTemaNoDesc(String memberId);
	
	@Transactional  // 트랜잭션 설정 추가
	void deleteByMemberId(String memberId);	// 관계자 계정 삭제시 등록한 테마 지우려고 넣음


}