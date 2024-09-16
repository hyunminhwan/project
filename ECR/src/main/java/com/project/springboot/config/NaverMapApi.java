package com.project.springboot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class NaverMapApi {
	@Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
	//지도 api config
}
