package com.project.springboot.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.springboot.domain.Announcement;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
	// 페이지네이션을 위한 메서드
    Page<Announcement> findAll(Pageable pageable);
}
