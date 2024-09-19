package com.project.springboot.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
	@PostMapping("/memberLogin/{loginType}")
	public ResponseEntity<?> memberLogin(@PathVariable(name="loginType") int loginType , @RequestBody Member member) {
		Optional<Member> loginMember = memberService.Member(loginType,member.getMemberId());

		if (loginMember.isPresent()) {
			Member log = loginMember.get();
			if (passwordEncoder.matches(member.getMemberPwd(),log.getMemberPwd())) {

				session.setAttribute("member", log);
				return ResponseEntity.ok(log); // 로그인 성공, 사용자 정보 반환
			} else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("비밀번호가 틀렸습니다."); // 비밀번호 오류
			}
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("존재하지 않는 아이디입니다."); // 아이디 오류
		}
	}

	//로그아웃 처리
	@PostMapping("/logout")
	public ResponseEntity<?> logout(HttpSession session) {
		session.invalidate(); // 세션 초기화 하여 로그아웃하기
		return ResponseEntity.ok("로그아웃 성공");
	}


	//멤버 회원가입
	@PostMapping("/insert")
	public void memberInsert(@RequestBody Member member) {
		String enPass = passwordEncoder.encode(member.getMemberPwd());
		member.setMemberPwd(enPass);
		memberService.memberInsert(member);
	}

	//타입별로 회원가져오기
	@GetMapping("/members")
	public List<Member> getLoginByType(@RequestParam("loginType") Long loginType) {
		return memberService.getLoginByType(loginType);
	}

	// 관리자: 회원관리, 업체관리에서 회원삭제 클릭 시 회원삭제
	@DeleteMapping("/members/{memberId}")
	public ResponseEntity<Void> deleteMember(@PathVariable("memberId") String memberId) {
		memberService.deleteMemberAndReservations(memberId);	// 회원 및 회원의 예약정보 삭제 호출
		return ResponseEntity.noContent().build();
	}

	@PostMapping("/check-username")
	public ResponseEntity<Boolean> checkUsernameAvailability(@RequestBody Map<String, String> payload) {
		String memberId = payload.get("memberId");

		// 아이디 중복 여부 확인
		boolean isAvailable = memberService.isMemberIdAvailable(memberId);

		// 로그로 반환 값 확인
		System.out.println("아이디 사용 가능 여부: " + isAvailable);

		// 사용 가능하면 true, 이미 사용 중이면 false 반환
		return ResponseEntity.ok(isAvailable);
	}
	
	// 관리자: 회원 전체조회
	@GetMapping("/findClientAll")
	public List<Member> getAllClients(
			@RequestParam(name = "loginType") int loginType,
			@RequestParam(name = "page") int page,
			@RequestParam(name = "size") int size) {
		return memberService.getAllClients(loginType, page, size);
	}

}
