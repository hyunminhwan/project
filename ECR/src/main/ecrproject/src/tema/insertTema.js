import React, { useState } from 'react';
import axios from 'axios';
import './insertTema.css';


function KakaoMap() {
    const script = document.createElement('script');
    script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.head.appendChild(script);
}
function Coordinates(address) {
    const apiUrl = `/naverapi/Map/${encodeURIComponent(address)}`;

    return axios.get(apiUrl)
        .then((response) => {
            const data = response.data;
            if (data.latitude && data.longitude) {
                return {
                    latitude: data.latitude,
                    longitude: data.longitude,
                };
            } else {
                throw new Error("좌표를 찾을 수 없습니다.");
            }
        })
        .catch((error) => {
            console.error("실패", error);
        });
}

function InsertTema() {
    const [formData, setFormData] = useState({
        cafeName: '',
        temaName: '',
        price: '',
        timetaken: '',
        temaContent: '',
        address: '',
        personnel: 2,
        difficulty: 1,
        location: '서울',
        genre: '미스터리',
    });

    const TemaSubmit = (event) => {
        event.preventDefault();

        // 주소로 좌표 가져오기
        Coordinates(formData.address).then((coordinates) => {
            if (coordinates) {
                const temaData = {
                    ...formData,
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude,
                };

                // 서버로 POST 요청
                axios.post("/api/tema", temaData)
                    .then((response) => {
                        console.log("완료:", response.data);
                        alert("등록이 완료 되었습니다");

                    })
                    .catch((error) => {
                        console.error(" 실패:", error);
                    });
            }
        });
    };

    const TemaData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const AddressClick = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                // 주소가 선택되면, 그 주소를 폼 데이터에 설정
                setFormData({
                    ...formData,
                    address: data.address
                });
            }
        }).open();
    };

    // 처음 컴포넌트가 마운트될 때 카카오 주소 API 로드
    React.useEffect(() => {
        KakaoMap();
    }, []);


    return (
        <div className="create">
            <h2>테마등록</h2>
            <form onSubmit={TemaSubmit}>
                <label>카페이름:</label>
                <input name="cafeName" type="text" value={formData.cafeName} onChange={TemaData} required /> <br />

                <label>테마이름:</label>
                <input name="temaName" type="text" value={formData.temaName} onChange={TemaData} required /><br />

                <label>가격:</label>
                <input name="price" type="text" value={formData.price} onChange={TemaData} required /><br />

                <label>소요시간:</label>
                <input name="timetaken" type="text" value={formData.timetaken} onChange={TemaData} required /><br />

                <label>테마설명:</label>
                <textarea name="temaContent" value={formData.temaContent} onChange={TemaData} required></textarea><br />

                <label>지역:</label>
                <select name="location" value={formData.location} onChange={TemaData}>
                    <option value="서울">서울</option>
                    <option value="부산">부산</option>
                    <option value="대구">대구</option>
                    <option value="인천">인천</option>
                </select>


                <label>주소:</label>
                <input name="address" type="text" value={formData.address} onChange={TemaData} readOnly required />
                <button type="button" onClick={AddressClick}>주소 검색</button><br />

                <label>인원수:</label>
                <select name="personnel" value={formData.personnel} onChange={TemaData}>
                    <option value={2}>2명</option>
                    <option value={3}>3명</option>
                    <option value={4}>4명</option>
                    <option value={5}>5명</option>
                    <option value={6}>6명</option>
                </select><br />

                <label>난이도:</label>
                <select name="difficulty" value={formData.difficulty} onChange={TemaData}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select><br />

                <label>장르:</label>
                <select name="genre" value={formData.genre} onChange={TemaData}>
                    <option value="미스터리">미스터리</option>
                    <option value="호러">호러</option>
                    <option value="SF">SF</option>
                    <option value="추리">추리</option>
                    <option value="판타지">판타지</option>
                    <option value="어드벤처">어드벤처</option>
                </select><br />
                
                <button type="submit">등록</button>
            </form>
        </div>
    );
}

export default InsertTema;
