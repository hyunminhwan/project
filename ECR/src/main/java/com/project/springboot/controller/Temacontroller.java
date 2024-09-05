package com.project.springboot.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.springboot.domain.Tema;
import com.project.springboot.service.TemaService;

@RestController
@RequestMapping("/api")
public class Temacontroller {
	
	@Autowired
	TemaService temaService;
	
	//모든 tema 메뉴 불러오기
	@GetMapping("/menu")
	public List<Tema> menu() {
		return temaService.menu();
	}
}
