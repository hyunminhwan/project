package com.project.springboot.configService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class NaverMapApiService {
	 private final RestTemplate restTemplate;

	    // application.properties 또는 application.yml에 설정된 API 키를 불러옵니다.
	    @Value("${naver.api.client-id}")
	    private String clientId;

	    @Value("${naver.api.client-secret}")
	    private String clientSecret;

	    public NaverMapApiService(RestTemplate restTemplate) {
	        this.restTemplate = restTemplate;
	    }

	    public Map<String, Object> NaverMapApi(String address) {
	        String apiUrl = "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=" + address;

	        // 헤더에 API 키를 설정합니다.
	        HttpHeaders headers = new HttpHeaders();
	        headers.set("X-NCP-APIGW-API-KEY-ID", clientId);
	        headers.set("X-NCP-APIGW-API-KEY", clientSecret);

	        HttpEntity<String> entity = new HttpEntity<>(headers);

	        // Naver API에 GET 요청을 보냅니다.
	        ResponseEntity<Map> response = restTemplate.exchange(apiUrl, HttpMethod.GET, entity, Map.class);

	        if (response.getBody() != null) {
	            // 필요한 데이터를 추출하여 반환합니다.
	            Map<String, Object> result = new HashMap<>();
	            Map<String, Object> responseBody = response.getBody();
	            if (responseBody.get("addresses") != null) {
	                Map<String, Object> firstAddress = ((List<Map<String, Object>>) responseBody.get("addresses")).get(0);
	                result.put("latitude", firstAddress.get("y"));
	                result.put("longitude", firstAddress.get("x"));
	                return result;
	            }
	        }
	        
	        return null; // 좌표가 없으면 null 반환
	    }
}
