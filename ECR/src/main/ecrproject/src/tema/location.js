import { useEffect } from "react";
// import { Map, MapMarker } from "react-kakao-maps-sdk";

function Location ({ latitude, longitude }) {
  useEffect(() => {
    const initMap = () => {
      const mapOptions = {
        center: new window.naver.maps.LatLng(latitude, longitude),
        zoom: 18,
      };

      const map = new window.naver.maps.Map("map", mapOptions);

      // 마커 추가 (옵션)
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(latitude, longitude),
        map,
      });
    };

    // 네이버 지도 API 스크립트 로딩 후 initMap 함수 실행
    if (window.naver && window.naver.maps) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=wm9yab1ele`;
      script.async = true;
      script.onload = () => initMap();
      document.head.appendChild(script);
    }
  }, []);
    return (
     

      <div
      id="map"
      style={{ width: "100%", height: "400px" }}
    />

    );
  };
  
  export default Location;