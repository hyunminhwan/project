package com.project.springboot.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.repository.query.Param;

import com.project.springboot.domain.Announcement;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {

    // 페이지네이션을 위한 메서드
    Page<Announcement> findAll(Pageable pageable);

    // 조회수만 증가시키는 쿼리
    @Modifying
    @Transactional
    @Query("UPDATE Announcement a SET a.boardCount = a.boardCount + 1 WHERE a.boardNo = :boardNo")
    void incrementViewCount(@Param("boardNo") Long boardNo);
    // boardCount만 증가시키고, boardUpdateDate는 변경하지 않음
}

/*
  @Modifying : 데이터베이스의 데이터를 수정(업데이트)하는 쿼리에서 사용
  @Transactional : 메서드가 트랜잭션 내에서 실행되어야 하므로 @Transactional을 추가
  @Query : JPQL을 사용하여 직접 업데이트 쿼리를 작성 (이 경우, boardCount만 증가시키도록 쿼리를 작성) 
  
  조회수만 증가시키는 쿼리를 직접 실행하기 때문에, boardUpdateDate는 변경되지 않고 조회수만 업데이트됨.
 */