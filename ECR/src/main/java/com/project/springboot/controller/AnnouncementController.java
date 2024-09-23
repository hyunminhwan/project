package com.project.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.springboot.domain.Announcement;
import com.project.springboot.service.AnnouncementService;

@RestController
@RequestMapping("/board")
public class AnnouncementController {

    @Autowired
    AnnouncementService announcementService;

    // 페이지네이션을 사용한 공지사항 목록 조회
    @GetMapping("/list/{page}/{size}")
    public Page<Announcement> list(
            @PathVariable(name = "page") int page,   // URL 경로에서 페이지 번호를 받아옴
            @PathVariable(name = "size") int size    // URL 경로에서 페이지 크기를 받아옴
    ) {
        return announcementService.findAll(page, size);
    }

    // 공지사항 호출
    @GetMapping("/write")
    public List<Announcement> write() {
        return announcementService.write();
    }

    // 게시물 상세 조회
    @GetMapping("/form/{boardNo}")
    public Announcement findById(@PathVariable(name = "boardNo") Long boardNo) {
        return announcementService.findById(boardNo).get();
    }

    // 수정하기
    @PutMapping("/retouch")
    public Announcement retouch(@RequestBody Announcement announcement) {
        return announcementService.retouch(announcement);
    }

    // 삭제하기
    @DeleteMapping("/delete/{e}")
    public void delete(@PathVariable(name = "e") Long boardNo) {
        announcementService.delete(boardNo);
    }

    // 공지사항 작성
    @PostMapping("/write2")
    public void write2(@RequestBody Announcement announcement) {
        announcementService.write2(announcement);
    }
}
