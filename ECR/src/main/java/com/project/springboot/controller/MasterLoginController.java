package com.project.springboot.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.springboot.domain.MasterLogin;
import com.project.springboot.service.MasterLoginService;

import ch.qos.logback.core.model.Model;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")
public class MasterLoginController {
	
	@Autowired
	MasterLoginService masterloginService;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	HttpSession session;
	
	@PostMapping("/masterlogin")
	public MasterLogin  masterlogin(MasterLogin masterlogin) {
		Optional<MasterLogin> masterloginuser = masterloginService.masterlogin(masterlogin);
		if(masterloginuser.isPresent()) {
			MasterLogin log = masterloginuser.get();
			if(passwordEncoder.matches(masterlogin.getMasterpassword(), log.getMasterpassword())) {
				return log;
			}
		}
		return null; // 아이디 또는 비밀번호를 확인해주세요
		
		
	}
	
	
	
	      
}
