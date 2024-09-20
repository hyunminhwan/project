package com.project.springboot.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.springboot.domain.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {

	//로그인타입과 해당 맴버 아이디 일치한 정보 가져오기(일반,관계자,관리자를 나누기위함)
	Optional<Member> findMemberByLoginTypeAndMemberId(int loginType, String memberId);

	//로그인타입별로 정보 가져오기
	List<Member> findByLoginType(Long loginType);

	// 아이디 중복체크
	boolean existsByMemberId(String memberId);

	//아이디찾기 (MemberName,MemberPhone,MemberEmail,LoginType 일치하는 값 가져오기)
	Optional<Member> findByMemberNameAndMemberPhoneAndMemberEmailAndLoginType(String memberName, Long memberPhone,
			String memberEmail, int loginType);

	//비밀번호 변경(MemberId,MemberPhone,MemberEmail,LoginType 일치하는 값 가져오기)
	Optional<Member> findByMemberIdAndMemberPhoneAndMemberEmailAndLoginType(String memberId, Long memberPhone,
			String memberEmail, int loginType);

	// 관리자: 일반회원 전체조회
	Page<Member> findByLoginTypeOrderByMemberIdAsc(int loginType, PageRequest pageRequest);

}


