package com.project.springboot.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.springboot.domain.Tema;
import com.project.springboot.service.ReviewService;
import com.project.springboot.service.TemaService;

@RestController
@RequestMapping("/api")
public class Temacontroller {

	@Autowired
	TemaService temaService;

	@Autowired
	ReviewService reviewService;
	
	//모든 tema 메뉴 불러오기
	@GetMapping("/menu")
	public List<Tema> menu() {
		return temaService.menu();
	}
	
	//테마번호로 테마에 대한 정보 가져오기
	@GetMapping("/menu/{temaNo}")
	public Tema findBYId(@PathVariable(name="temaNo") Long temaNo) {
		return temaService.findById(temaNo).get();
	}

	// application.properties 파일에서 설정한 파일 저장 경로
	@Value("${tema.img-Path}")  
	private String temaImg;

	//Tema 저장
	@PostMapping("/tema")
	public void TemaSave(@RequestParam("imgUrl") MultipartFile imgUrl,
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
			@RequestParam("longitude") double longitude,
			@RequestParam("memberId") String memberId)
	{
		// 파일 이름 설정
		try {
			String imgName = System.currentTimeMillis() + "_" +StringUtils.cleanPath(imgUrl.getOriginalFilename());
			String imgPath = temaImg + File.separator + imgName;
			
			// 경로가 없다면 디렉토리 생성
			File dir = new File(temaImg);
			if (!dir.exists()) {
			    dir.mkdirs();  
			}
			Files.copy(imgUrl.getInputStream(), Paths.get(imgPath));

			Tema tema = new Tema();
			tema.setMemberId(memberId);
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


//			File newFile = new File(temaImg);
//			if (!newFile.exists()) {
//				newFile.mkdirs();  
//			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
		//Tema 수정
		@PutMapping("/tema")
		public void TemaEdit(@RequestParam("imgUrl") MultipartFile imgUrl,
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
				@RequestParam("longitude") double longitude,
				@RequestParam("temaNo") Long temaNo,
				@RequestParam("memberId") String memberId
				)
		{
			// 파일 이름 설정
			try {
	            Tema tema = temaService.findById(temaNo)
	            						.orElseThrow(
	            						() -> new IllegalArgumentException("해당 테마를 찾을 수 없습니다."));

	            // 새로운 이미지가 업로드된 경우에만 이미지 갱신
	            if (imgUrl != null && !imgUrl.isEmpty()) {
	                // 기존 이미지 삭제 로직
	                String oldImgPath = temaImg + File.separator + tema.getImgUrl().substring(5); // "/img/" 부분 제거
	                File oldImgFile = new File(oldImgPath);
	                if (oldImgFile.exists()) {
	                    oldImgFile.delete();
	                }

	                // 새 이미지 저장
	                String imgName = System.currentTimeMillis() + "_" + StringUtils.cleanPath(imgUrl.getOriginalFilename());
	                String imgPath = temaImg + File.separator + imgName;
	                Files.copy(imgUrl.getInputStream(), Paths.get(imgPath));
	                tema.setImgUrl("/img/" + imgName); // 이미지 URL 갱신
	            }

				tema.setTemaNo(temaNo);
				tema.setMemberId(memberId);
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

	//memberId 으로 테마가져오기
	@GetMapping("/edittema/{memberId}")
	public List<Tema> edittema(@PathVariable(name="memberId") String memberId) {
		return temaService.edittema(memberId);
	}

	// 평점 높은 테마
	@GetMapping("/topmenu")
	public List<Tema> getTopTema() {
		return temaService.findByOrderByRatingDesc(); 
	}
	
	//테마 , 테마에 있는 리뷰 삭제하기
	@DeleteMapping("/delete/{temaNo}")
	public ResponseEntity<?> deleteTema(@PathVariable(name="temaNo") Long temaNo, @RequestBody Map<String, String> data) {
	    String imgUrl = data.get("imgUrl");

	    
	    // 테마 삭제 로직
	    Tema tema = temaService.findById(temaNo).get();
	    if (tema != null) {
	    	
	    	// 해당 리뷰 전체 삭제
	    	reviewService.delete(temaNo);
	    	
	        // 데이터베이스에서 테마 삭제,해당 리뷰삭제
	        temaService.delete(temaNo);
	        
	        // 이미지 파일 삭제 로직
	        String imgPath = temaImg + File.separator + imgUrl.substring(imgUrl.lastIndexOf("/") + 1);
	        File imgFile = new File(imgPath);
	        
	        if (imgFile.exists()) {
	            if (imgFile.delete()) {
	                System.out.println("이미지 파일이 성공적으로 삭제되었습니다.");
	            } else {
	                System.out.println("이미지 파일 삭제에 실패했습니다.");
	            }
	        } else {
	            System.out.println("이미지 파일을 찾을 수 없습니다.");
	        }

	        return ResponseEntity.ok().build();
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("테마를 찾을 수 없습니다.");
	    }
	}
}

