package com.project.springboot.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.springboot.domain.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {
    Optional<Member> findMemberByLoginTypeAndMemberId(int loginType, String memberId);
    
    List<Member> findByLoginType(Long loginType);
    
    // 아이디 중복체크
//    boolean existsByUsername(String username);

    // 아이디 중복체크
    boolean existsByMemberId(String memberId);
    
}
