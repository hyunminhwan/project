package com.project.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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
	
}

