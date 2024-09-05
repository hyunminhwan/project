package com.project.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.springboot.domain.Announcement;
import com.project.springboot.service.AnnouncementService;

@RestController
@RequestMapping("/board")
public class AnnouncementController {
	
	@Autowired
	AnnouncementService announcementService;
	
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
	
	
}

