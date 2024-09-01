package com.project.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	//페이징처리
	@PostMapping("/list")
	public Model list(@RequestParam(value="nowPage", defaultValue="0") int nowPage, Model model) {
		Page<Tema> pageList = temaService.list(PageRequest.of(nowPage, 10, Sort.by(Sort.Direction.DESC, "tema_no")));
		
		int pagePerBlock = 5;	// [1][2][3][4][5]
		int endPage = Math.min(pageList.getTotalPages(), nowPage + pagePerBlock);

		model.addAttribute("temaPage", pageList);
		model.addAttribute("nowPage", nowPage);
		model.addAttribute("endPage", endPage);
		return model;
	}
	
}
