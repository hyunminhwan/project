import React, { useState } from 'react';
import axios from 'axios';
import './insertTema.css';
import { useSelector } from 'react-redux';

//주소 api
function KakaoMap() {
    
    const script = document.createElement('script');
    script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.head.appendChild(script);
}

//주소를 입력시 좌표로 바꾸어줌
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
    const loginToMember = useSelector((state) => state.loginMember);
    const shopName = loginToMember?.member?.shopName;
    const [temaInsert, settemaInsert] = useState({
        cafeName: shopName,
        temaName: '',
        price: '',
        timetaken: '',
        temaContent: '',
        address: '',
        personnel: 2,
        difficulty: 1,
        location: '서울',
        genre: '미스터리',
        imgUrl:null,
    });

    const TemaSubmit = (event) => {
        event.preventDefault();

        // 주소로 좌표 가져오기 & 모든 내용 저장하기
        Coordinates(temaInsert.address).then((coordinates) => {
            if (coordinates) {
                //이미지를 같이 넣어서 보내주려면  FormData 함수를 사용해야함
                const formData = new FormData();
                formData.append('imgUrl', temaInsert.imgUrl);             // 이미지
                formData.append('cafeName', temaInsert.cafeName);       //카페이름
                formData.append('temaName', temaInsert.temaName);       //테마이름
                formData.append('price', temaInsert.price);             //가격
                formData.append('timetaken', temaInsert.timetaken);     //소요시간
                formData.append('temaContent', temaInsert.temaContent); //조회수
                formData.append('address', temaInsert.address);         //주소
                formData.append('personnel', temaInsert.personnel);     //인원수
                formData.append('difficulty', temaInsert.difficulty);   //난이도
                formData.append('location', temaInsert.location);       //지역
                formData.append('genre', temaInsert.genre);             //장르
                formData.append('latitude', coordinates.latitude);      //좌표
                formData.append('longitude', coordinates.longitude);    //좌표

                // 서버에 데이터값 보내주기
                axios.post("/api/tema", formData,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    } 
                })
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
    
    const InsertImg = (e) => {
        settemaInsert({
            ...temaInsert,
            imgUrl: e.target.files[0],  // 파일 선택
        });
    };

    const TemaData = (e) => {
        settemaInsert({
            ...temaInsert,
            [e.target.name]: e.target.value
        });
    };
    


    const AddressClick = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                // 주소가 선택되면, 그 주소를 폼 데이터에 설정
                settemaInsert({
                    ...temaInsert,
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
                <input name="cafeName" type="text" value={temaInsert.cafeName} onChange={TemaData}  readOnly/> <br />

                <label>테마이름:</label>
                <input name="temaName" type="text" value={temaInsert.temaName} onChange={TemaData} required/><br />

                <label>가격:</label>
                <input name="price" type="text" value={temaInsert.price} onChange={TemaData} required /><br />

                <label>소요시간:</label>
                <input name="timetaken" type="text" value={temaInsert.timetaken} onChange={TemaData} required /><br />

                <label>테마설명:</label>
                <textarea name="temaContent" value={temaInsert.temaContent} onChange={TemaData} required></textarea><br />

                <label>지역:</label>
                <select name="location" value={temaInsert.location} onChange={TemaData}>
                    <option value="서울">서울</option>
                    <option value="부산">부산</option>
                    <option value="대구">대구</option>
                    <option value="인천">인천</option>
                </select>


                <label>주소:</label>
                <input name="address" type="text" value={temaInsert.address} onChange={TemaData} readOnly required />
                <button type="button" onClick={AddressClick}>주소 검색</button><br />

                <label>인원수:</label>
                <select name="personnel" value={temaInsert.personnel} onChange={TemaData}>
                    <option value={2}>2명</option>
                    <option value={3}>3명</option>
                    <option value={4}>4명</option>
                    <option value={5}>5명</option>
                    <option value={6}>6명</option>
                </select><br />

                <label>난이도:</label>
                <select name="difficulty" value={temaInsert.difficulty} onChange={TemaData}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select><br />

                <label>장르:</label>
                <select name="genre" value={temaInsert.genre} onChange={TemaData}>
                    <option value="미스터리">미스터리</option>
                    <option value="호러">호러</option>
                    <option value="SF">SF</option>
                    <option value="추리">추리</option>
                    <option value="판타지">판타지</option>
                    <option value="어드벤처">어드벤처</option>
                </select><br />
                
                <input type="file" accept='image/*' onChange={InsertImg} required></input>
                <button type="submit">등록</button>
            </form>
        </div>
    );
}

export default InsertTema;
