package com.project.springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.springboot.domain.Tema;

@Repository
public interface TemaRepository extends JpaRepository<Tema, Long>{

	List<Tema> findAllByOrderByTemaNoAsc();

	 List<Tema> findByOrderByRatingDesc();
}
