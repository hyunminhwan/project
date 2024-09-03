package com.project.springboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.springboot.domain.Announcement;
import com.project.springboot.repository.AnnouncementRepository;

@Service
public class AnnouncementService {

	@Autowired
	AnnouncementRepository announcementRepository;
	
	public List<Announcement> write() {
		return announcementRepository.findAll();
	}

}
