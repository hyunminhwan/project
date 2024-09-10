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
	public Member memberLogin(@PathVariable(name="loginType") int loginType , @RequestBody Member member) {
		Optional<Member> loginuser = loginService.Member(loginType,member.getMemberId());

		if (loginuser.isPresent()) {
			Member log = loginuser.get();
			if (passwordEncoder.matches(log.getMemberPwd(), member.getMemberPwd())) {
				return log;
			} else {
				return null; // 비밀번호 오류
			}
		} else {
			return null; // 아이디오류
		}
	}


	@PostMapping("/insert")
	public void memberInsert(@RequestBody Member member) {
		String enPass = passwordEncoder.encode(member.getMemberPwd());
		member.setMemberPwd(enPass);
		loginService.memberInsert(member);
	}

}
