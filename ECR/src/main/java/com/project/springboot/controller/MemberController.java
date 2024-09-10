package com.project.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.springboot.domain.Member;
import com.project.springboot.service.MemberService;

@RestController
@RequestMapping("/mem")
public class MemberController {

	@Autowired
	MemberService memberService;
	
	@GetMapping("/members")
	public List<Member> getMembersByType(@RequestParam("memberType") Long memberType) {
		return memberService.getMemberByType(memberType);
	}
}
