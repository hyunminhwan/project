package com.project.springboot.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.springboot.domain.Member;
import com.project.springboot.repository.MemberRepository;
import com.project.springboot.repository.ReservationRepository;
import com.project.springboot.repository.ReviewRepository;
import com.project.springboot.repository.TemaRepository;

import jakarta.transaction.Transactional;


@Service
public class MemberService {

	@Autowired
	MemberRepository memberRepository;

	@Autowired
	ReservationRepository reservationRepository;

	@Autowired
	ReviewRepository reviewRepository;

	@Autowired
	TemaRepository temaRepository; 
	
	
	@Autowired
	PasswordEncoder passwordencoder;

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
	public void deleteMemberAndReviewsAndTemas(String memberId) {
		if(memberRepository.existsById(memberId)) {
			temaRepository.deleteByMemberId(memberId);
			reviewRepository.deleteByUserId(memberId);
			memberRepository.deleteById(memberId);
		} else {
			throw new IllegalArgumentException("해당 회원을 찾을 수 없습니다");
		}

	}

	//아이디중복체크
	public boolean isMemberIdAvailable(String memberId) {
		boolean exists = memberRepository.existsByMemberId(memberId);
		return !exists; // 사용 가능한 경우 true 반환, 중복인 경우 false 반환
	}

	//아이디찾기
	public Optional<Member> findId(String memberName, Long memberPhone, String memberEmail, int loginType) {
		return memberRepository.findByMemberNameAndMemberPhoneAndMemberEmailAndLoginType(memberName,memberPhone,memberEmail,loginType);
	}

	//비밀번호찾기
	public Optional<Member> findpwd(String memberId, Long memberPhone, String memberEmail,int loginType) {
		return memberRepository.findByMemberIdAndMemberPhoneAndMemberEmailAndLoginType(memberId,memberPhone,memberEmail,loginType);
	}


	public Optional<Member> findById(String memberId) {
		return memberRepository.findById(memberId);
	}

	// 관리자: 일반회원 전체조회
	public List<Member> getAllClients(int loginType, int page, int size) {
		PageRequest pageRequest = PageRequest.of(page - 1, size);
		return memberRepository.findByLoginTypeOrderByMemberIdAsc(loginType, pageRequest).getContent();
	}


	// 개인정보 수정 전 비밀번호 확인
	public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
		this.memberRepository = memberRepository;
		this.passwordencoder = passwordEncoder;
	}

	public boolean checkPassword(String memberId, String inputPassword) {
		// memberId를 사용하여 DB에서 해당 회원 정보 조회
		Optional<Member> memberOpt = memberRepository.findById(memberId);

		if (memberOpt.isPresent()) {
			Member member = memberOpt.get();
			// 비밀번호가 일치하는지 확인
			return passwordencoder.matches(inputPassword,member.getMemberPwd());
		}

		return false; // 회원 정보가 없으면 false 반환
	}
	
	// 회원 정보를 업데이트하는 메서드
    public Member updateMember(Member member) {
        return memberRepository.save(member); // 변경된 회원 정보를 저장
    }

}