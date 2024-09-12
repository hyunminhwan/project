package com.project.springboot.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.springboot.domain.Member;
import com.project.springboot.service.MemberService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")
public class MemberController {

	@Autowired
	MemberService loginService;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	HttpSession session;

	// 일반 로그인 처리
	@PostMapping("/userlogin/{loginType}")
	public ResponseEntity<Member> memberLogin(@PathVariable(name="loginType") int loginType , @RequestBody Member member) {
		Optional<Member> loginuser = loginService.Member(loginType,member.getMemberId());
		System.out.println(loginuser.get().getMemberId());
		if (loginuser.isPresent()) {
			Member log = loginuser.get();
			if (passwordEncoder.matches(member.getMemberPwd(),log.getMemberPwd())) {
				  session.setAttribute("loginUser", log);
		            return new ResponseEntity<>(log, HttpStatus.OK);
		        } else {
		            // 비밀번호가 틀린 경우 401 오류 반환
		            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		        }
		    } else {
		        // 아이디가 존재하지 않는 경우 404 오류 반환
		        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		    }
	}

	@PostMapping("/insert")
	public void memberInsert(@RequestBody Member member) {
		String enPass = passwordEncoder.encode(member.getMemberPwd());
		member.setMemberPwd(enPass);
		loginService.memberInsert(member);
	}
	
	
	
	
	
	
	
	
	
	

}
