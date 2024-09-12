package com.project.springboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.springboot.domain.Tema;
import com.project.springboot.repository.ReviewRepository;
import com.project.springboot.repository.TemaRepository;

@Service
public class TemaService {
	
	//테마레파지토리
	@Autowired
	TemaRepository temaRepository;
	
	//리뷰레파지토리
	@Autowired
	ReviewRepository reviewRepository;
	
	//모든메뉴를 테마번호 오름차순으로 정렬해서 가지고오기
	public List<Tema> menu() {
		return temaRepository.findAllByOrderByTemaNoAsc();
	}
	
	//모든테마관련 저장 서비스
	public Tema Allsave(Tema tema) {
		return temaRepository.save(tema);
	}
	
	//조회수 증가 서비스
	@Transactional
	public Tema TemaCount(Long temaNo) {
		 // temaNo에 대한 값을 가져오고 없으면 예외처리
        Tema tema = temaRepository.findById(temaNo)
                				  .orElseThrow(() -> new IllegalArgumentException("해당 테마를 찾을 수 없습니다."));
        							//IllegalArgumentException 테마가 없을 경우에 발생하도록 하는 매서드
        // 조회수를 +1증가
        tema.setTemaCount(tema.getTemaCount() + 1);
        
        // 변경된 테마를 저장함
        temaRepository.save(tema);
        
        return tema;
	}

	public Double avgRating(Long temaNo) {
		 Double avgRating = reviewRepository.findAvgRatingByTemaNo(temaNo);
	        
	        // 테마를 조회하고 평균 평점을 저장
	        Tema tema = temaRepository.findById(temaNo)
	                       .orElseThrow(() -> new RuntimeException("테마를 찾을 수 없습니다."));
	        
	        tema.setRating(avgRating != null ? Math.round(avgRating) : 0L); // null일 경우 0으로 설정
	        temaRepository.save(tema);
	        return avgRating != null ? avgRating:0.0;
	}

	//카페이름으로 모든 테마 가져오기
	public List<Tema> edittema(String cafeName) {
		return temaRepository.findAllByCafeName(cafeName);
		
	}
	
	// 평점 높은 테마
	public List<Tema> findByOrderByRatingDesc() {
		return temaRepository.findByOrderByRatingDesc();
	}

	
}
