package com.project.springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.springboot.domain.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

	List<Member> findByMemberType(Long memberType);

}
