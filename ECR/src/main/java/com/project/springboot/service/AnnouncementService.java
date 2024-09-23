package com.project.springboot.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.springboot.domain.Announcement;
import com.project.springboot.repository.AnnouncementRepository;

@Service
public class AnnouncementService {

    @Autowired
    AnnouncementRepository announcementRepository;

    // 모든 공지사항 정보 가져오기
    public List<Announcement> write() {
        return announcementRepository.findAll();
    }

    // 페이지네이션 기능 추가
    public Page<Announcement> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size); // 페이지 번호와 크기 설정
        return announcementRepository.findAll(pageable); // 페이징된 데이터 반환
    }

    // 공지사항 조회수 증가
    @Transactional
    public Optional<Announcement> findById(Long boardNo) {
        Optional<Announcement> announcement = announcementRepository.findById(boardNo);

        if (announcement.isPresent()) {
            // 조회수만 증가시키는 쿼리 호출
           // 이 코드에서 ifPresent는 announcement에 값이 있을 때만 중괄호 {} 안의 코드를 실행
            announcementRepository.incrementViewCount(boardNo);
        }

        return announcement;
    }

    
    // 공지사항 수정
    @Transactional
    public Announcement retouch(Announcement announcement) {
        return announcementRepository.save(announcement);
    }

    // 공지사항 삭제
    @Transactional
    public void delete(Long boardNo) {
        announcementRepository.deleteById(boardNo);
    }

    // 공지사항 등록
    @Transactional
    public void write2(Announcement announcement) {
        announcementRepository.save(announcement);
    }
}
