package com.project.springboot.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.springboot.domain.MasterLogin;
import com.project.springboot.repository.MasterLoginRepository;


@Service
public class MasterLoginService {
	 
	@Autowired
	MasterLoginRepository masterloginRepository;


	public Optional<MasterLogin> masterlogin(MasterLogin masterlogin) {
		return masterloginRepository.findById(masterlogin.getMasterid());
	}
}