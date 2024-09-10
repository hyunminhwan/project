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
	TemaRepository temarepository;
	
	//모든메뉴를 테마번호 오름차순으로 정렬해서 가지고오기
	public List<Tema> menu() {
		return temarepository.findAllByOrderByTemaNoAsc();
	}

	
	
}
