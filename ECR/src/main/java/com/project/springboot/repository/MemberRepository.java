package com.project.springboot.repository;

import java.util.List;
import java.util.Optional;

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
	
}


