package com.example.demo.service;

import com.example.demo.entity.Member;
import com.example.demo.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    public Member registerMember(Member member) {
        // 추가적인 비즈니스 로직 (예: 비밀번호 암호화)도 여기서 처리
        return memberRepository.save(member);
    }

    public Member getMemberByUserid(String userid) {
        return memberRepository.findByUserid(userid);
    }
}
