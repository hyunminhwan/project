package com.project.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.springboot.domain.MasterLogin;

@Repository
public interface MasterLoginRepository extends JpaRepository<MasterLogin, String> {

}
