package com.project.springboot.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.project.springboot.domain.Announcement;
import com.project.springboot.repository.AnnouncementRepository;

@Service
public class AnnouncementService {

	@Autowired
	AnnouncementRepository announcementRepository;
	
	public List<Announcement> write() {
		return announcementRepository.findAll();
	}
	
	// 페이지네이션 기능 추가
    public Page<Announcement> findAll(Pageable pageable) {
        return announcementRepository.findAll(pageable);
    }

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
	public Announcement retouch(Announcement announcement) {
		return announcementRepository.save(announcement);
	}

	public void delete(Long boardNo) {
		announcementRepository.deleteById(boardNo);
	}

	public void write2(Announcement announcement) {
		announcementRepository.save(announcement);
	}

}
