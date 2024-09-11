package com.project.springboot.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.springboot.domain.Member;
import com.project.springboot.repository.MemberRepository;


@Service
public class MemberService {
	 
	@Autowired
	MemberRepository memberRepository;


	public Optional<Member> Member(int loginType , String memberId) {
		return memberRepository.findMemberByLoginTypeAndMemberId(loginType,memberId);
	}


	public void memberInsert(Member member) {
		memberRepository.save(member);
		
	}
	
	
	public List<Member> getLoginByType(Long loginType) {
		return memberRepository.findByLoginType(loginType);


	}

}