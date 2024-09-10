package com.project.springboot.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.springboot.domain.Member;
import com.project.springboot.repository.MemberRepository;


@Service
public class MemberService {
	 
	@Autowired
	MemberRepository loginRepository;


	public Optional<Member> Member(int loginType , String memberId) {
		return loginRepository.findMemberByLoginTypeAndMemberId(loginType,memberId);
	}


	public void memberInsert(Member member) {
		loginRepository.save(member);
		
	}
	
	





}