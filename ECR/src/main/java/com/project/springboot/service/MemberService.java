package com.project.springboot.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.springboot.domain.Member;
import com.project.springboot.repository.MemberRepository;
import com.project.springboot.repository.ReservationRepository;

import jakarta.transaction.Transactional;

@Service
public class MemberService {
    
    @Autowired
    MemberRepository memberRepository;
    
    @Autowired
    ReservationRepository reservationRepository;

    public Optional<Member> Member(int loginType, String memberId) {
        return memberRepository.findMemberByLoginTypeAndMemberId(loginType, memberId);
    }

    // ...

    public void memberInsert(Member member) {
        // 중복 아이디 체크를 서비스 레벨에서도 진행 (보안 강화를 위해)
        if (memberRepository.existsByMemberId(member.getMemberId())) {
            throw new IllegalArgumentException("중복된 아이디입니다..");
        }
        memberRepository.save(member);
    }

    // ...


    
    public List<Member> getLoginByType(Long loginType) {
        return memberRepository.findByLoginType(loginType);
    }

    // 관리자: 회원삭제
    @Transactional
    public void deleteMemberAndReservations(String memberId) {
        if (memberRepository.existsById(memberId)) {
            reservationRepository.deleteByUserId(memberId);
            memberRepository.deleteById(memberId);
        } else {
            throw new IllegalArgumentException("해당 회원을 찾을 수 없습니다");
        }
    }


	
    public boolean isMemberIdAvailable(String memberId) {
        boolean exists = memberRepository.existsByMemberId(memberId);
        return !exists; // 사용 가능한 경우 true 반환, 중복인 경우 false 반환
    }
    
    
}
