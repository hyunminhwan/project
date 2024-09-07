package com.project.springboot.configController;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.springboot.configService.NaverMapApiService;

@RestController
@RequestMapping("/naverapi")
public class NaverMapApiController {
	
	@Autowired
	NaverMapApiService  naverMapApiService;
	
	@GetMapping("/Map/{address}")
	public Map<String,Object> NaverMapApi(@PathVariable(name="address") String address){
		return naverMapApiService.NaverMapApi(address);
	}
}
