package com.project.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Sort;

import com.project.springboot.domain.Announcement;
import com.project.springboot.service.AnnouncementService;

@RestController
@RequestMapping("/board")
public class AnnouncementController {
	
	@Autowired
	AnnouncementService announcementService;
	
	 // 페이지네이션을 사용한 공지사항 목록 조회
    @GetMapping("/list")
    public Page<Announcement> list(
        @RequestParam(defaultValue = "0") int page, // 기본 페이지는 0
        @RequestParam(defaultValue = "10") int size // 기본 페이지 크기는 10
    ) {
    	Pageable pageable = PageRequest.of(page, size, Sort.by("boardNo").descending());
        return announcementService.findAll(pageable);
    }
	
	@GetMapping("/write")
	public List<Announcement> write() {
		return announcementService.write();
	}
	
	@GetMapping("/form/{boardNo}")
	public Announcement findBYid(@PathVariable(name="boardNo") Long boardNo) {
		return announcementService.findById(boardNo).get();
	}
	
	@PutMapping("/retouch")
	public Announcement retouch(@RequestBody Announcement announcement) {
		return announcementService.retouch(announcement);
	}
	
	@DeleteMapping("/delete/{e}")
	public void delete(@PathVariable(name="e") Long boardNo)	{
		announcementService.delete(boardNo);
	}
	
	@PostMapping("/write2")
	public void write2(@RequestBody Announcement announcement) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
		announcementService.write2(announcement);
	}
	
	
	
}

