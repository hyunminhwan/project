package com.project.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.project.springboot.service.TemaService;

@Controller
public class Temacontroller {
	
	@Autowired
	TemaService temaservice;
	
	
}
