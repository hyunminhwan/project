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

	//로그인시 타입과 아이디를 비교해서 일반회원,관계자,관리자 비교
	public Optional<Member> Member(int loginType , String memberId) {
		return memberRepository.findMemberByLoginTypeAndMemberId(loginType,memberId);
	}


	//회원가입
	public void memberInsert(Member member) {
		memberRepository.save(member);

	}

	//로그인 타입에 해당하는 모든 회원 가져오기
	public List<Member> getLoginByType(Long loginType) {
		return memberRepository.findByLoginType(loginType);


	}

	// 관리자: 회원삭제
	@Transactional  // 트랜잭션 설정 추가
	public void deleteMemberAndReservations(String memberId) {
		if(memberRepository.existsById(memberId)) {
			reservationRepository.deleteByUserId(memberId);
			memberRepository.deleteById(memberId);
		} else {
			throw new IllegalArgumentException("해당 회원을 찾을 수 없습니다");
		}

	}
}