package com.project.springboot.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.project.springboot.domain.Announcement;
import com.project.springboot.repository.AnnouncementRepository;

@Service
public class AnnouncementService {

	@Autowired
	AnnouncementRepository announcementRepository;
	
	//모든 공지사항 정보 가져오기
	public List<Announcement> write() {
		return announcementRepository.findAll();
	}
	
	// 페이지네이션 기능 추가
    public Page<Announcement> findAll(int page,int size) {
    	 // Pageable 객체를 생성하여 페이지 번호와 크기 설정
        Pageable pageable = PageRequest.of(page, size);
        // Repository를 통해 페이지네이션 처리된 데이터를 반환
        return announcementRepository.findAll(pageable);
    }

    //공지사항 조회수 증가
	public Optional<Announcement> findById(Long boardNo) {
        Optional<Announcement> announcement = announcementRepository.findById(boardNo);

        // 조회수를 증가시키는 로직 추가
        // 이 코드에서 ifPresent는 announcement에 값이 있을 때만 중괄호 {} 안의 코드를 실행
        announcement.ifPresent(a -> { // 여기서 a는 Optional에 담긴 Announcement 객체 의미
            a.increaseViewCount(); // 조회수 증가
            announcementRepository.save(a); // 변경 사항 저장
        });

        return announcement;
    }
	//공지사항 수정
	public Announcement retouch(Announcement announcement) {
		return announcementRepository.save(announcement);
	}

	//공지사항 삭제
	public void delete(Long boardNo) {
		announcementRepository.deleteById(boardNo);
	}
	//공지사항 등록
	public void write2(Announcement announcement) {
		announcementRepository.save(announcement);
	}

}
