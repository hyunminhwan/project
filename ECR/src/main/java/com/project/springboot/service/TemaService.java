package com.project.springboot.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.project.springboot.domain.Tema;
import com.project.springboot.repository.TemaRepository;

@Service
public class TemaService {
	
	@Autowired
	TemaRepository temaRepository;
	
	//모든메뉴를 테마번호 오름차순으로 정렬해서 가지고오기
	public List<Tema> menu() {
		return temaRepository.findAllByOrderByTemaNoAsc();
	}

	public Tema Allsave(Tema tema) {
		return temaRepository.save(tema);
	}

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

	
	
}
