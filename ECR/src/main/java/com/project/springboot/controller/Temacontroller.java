package com.project.springboot.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.springboot.domain.Tema;
import com.project.springboot.service.TemaService;

@RestController
@RequestMapping("/api")
public class Temacontroller {
	
	@Autowired
	TemaService temaService;
	
	//모든 tema 메뉴 불러오기
	@GetMapping("/menu")
	public List<Tema> menu() {
		return temaService.menu();
	}
	
	 @Value("${tema.img-Path}")  // application.properties 파일에서 설정한 파일 저장 경로
	    private String temaImg;
	
	//Tema 모두저장
	@PostMapping("/tema")
	public void TemaAllsave(@RequestParam("imgUrl") MultipartFile imgUrl,
				            @RequestParam("cafeName") String cafeName,
				            @RequestParam("temaName") String temaName,
				            @RequestParam("price") Long price,
				            @RequestParam("timetaken") Long timetaken,
				            @RequestParam("temaContent") String temaContent,
				            @RequestParam("address") String address,
				            @RequestParam("personnel") Long personnel,
				            @RequestParam("difficulty") Long difficulty,
				            @RequestParam("location") String location,
				            @RequestParam("genre") String genre,
				            @RequestParam("latitude") double latitude,
				            @RequestParam("longitude") double longitude) 
	{
		 // 파일 이름 설정
        try {
        	String imgName = System.currentTimeMillis() + "_" +StringUtils.cleanPath(imgUrl.getOriginalFilename());
            String imgPath = temaImg + File.separator + imgName;
			Files.copy(imgUrl.getInputStream(), Paths.get(imgPath));
			
			Tema tema = new Tema();
            tema.setCafeName(cafeName);
            tema.setTemaName(temaName);
            tema.setPrice(price);
            tema.setTimetaken(timetaken);
            tema.setTemaContent(temaContent);
            tema.setAddress(address);
            tema.setPersonnel(personnel);
            tema.setDifficulty(difficulty);
            tema.setLocation(location);
            tema.setGenre(genre);
            tema.setLatitude(latitude);
            tema.setLongitude(longitude);
            tema.setImgUrl("/img/" + imgName);
			
            // DB에 테마 정보 저장
            temaService.Allsave(tema);
            
            
            File newFile = new File(temaImg);
            if (!newFile.exists()) {
            	newFile.mkdirs();  
            }
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	//Tema 조회수 증가
	@PutMapping("/{temaNo}/count")
	public Tema Temacount(@PathVariable(name="temaNo") Long temaNo){
		return temaService.TemaCount(temaNo);
		
	}
	
	
	//tema 평점 계산
	@GetMapping("/tema/{temaNo}/avgRating")
    public ResponseEntity<Double> avgRating(@PathVariable(name="temaNo") Long temaNo) {
        Double avgRating = temaService.avgRating(temaNo);
        return ResponseEntity.ok(avgRating);
    }
	
	
	// 평점 높은 테마
	@GetMapping("/topmenu")
	public List<Tema> getTopTema() {
		return temaService.findByOrderByRatingDesc(); 
	}
	
}

