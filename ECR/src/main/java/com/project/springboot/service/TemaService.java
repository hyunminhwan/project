package com.project.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.springboot.repository.TemaRepository;

@Service
public class TemaService {
	
	@Autowired
	TemaRepository temarepository;
	
	
}
