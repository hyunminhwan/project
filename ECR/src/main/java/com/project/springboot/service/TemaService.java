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

	public List<Tema> menu() {
		return temarepository.findAllByOrderByTemaNoAsc();
	}

	public Page<Tema> list(PageRequest of) {
		return temarepository.findAll(of);
	}
	
	
}
