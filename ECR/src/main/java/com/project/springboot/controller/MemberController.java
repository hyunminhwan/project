package com.project.springboot.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.springboot.domain.Member;
import com.project.springboot.service.MemberService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")
public class MemberController {

	@Autowired
	MemberService memberService;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	HttpSession session;

	// 일반 로그인 처리
	@PostMapping("/userlogin/{loginType}")
	public Member memberLogin(@PathVariable(name="loginType") int loginType , @RequestBody Member member) {
		Optional<Member> loginuser = memberService.Member(loginType,member.getMemberId());

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
		memberService.memberInsert(member);
	}
	
	@GetMapping("/members")
	public List<Member> getLoginByType(@RequestParam("loginType") int loginType) {
		return memberService.getLoginByType(loginType);
	}
	
	// 관리자: 회원관리, 업체관리에서 회원삭제 클릭 시 회원삭제
	@DeleteMapping("/members/{memberId}")
	public ResponseEntity<Void> deleteMember(@PathVariable("memberId") String memberId) {
		memberService.deleteMemberAndReservations(memberId);	// 회원 및 회원의 예약정보 삭제 호출
		return ResponseEntity.noContent().build();
	}

}
