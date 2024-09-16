import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';


// 주소 API 로드 함수
function KakaoMap() {
    const script = document.createElement('script');
    script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.head.appendChild(script);
}

// 주소를 입력 시 좌표로 변환하는 함수
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

function ModifyTema() { 
    const location = useLocation();
    const { tema } = location.state || {};
    const navigate = useNavigate();
    const [temaEdit, setTemaEdit] = useState({
        temaNo: '',
        memberId:'',
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
        imgUrl: null,
        latitude: null,
        longitude: null
    });

    // 수정할 테마 데이터 불러오기
    useEffect(() => {
        axios.get(`/api/menu/${tema.temaNo}`)
            .then(result => {
                console.log(result)
                setTemaEdit(result.data);
            })
            .catch(error => {
                console.error("데이터 로드 실패:", error);
            });
    }, [tema.temaNo]);

    // 수정 제출 핸들러
    const ModifySubmit = (event) => {
        event.preventDefault();

        Coordinates(temaEdit.address).then((coordinates) => {
            if (coordinates) {
                const formData = new FormData();
                formData.append('temaNo', temaEdit.temaNo);
                formData.append('memberId', temaEdit.memberId);
                formData.append('imgUrl', temaEdit.imgUrl);
                formData.append('cafeName', temaEdit.cafeName);
                formData.append('temaName', temaEdit.temaName);
                formData.append('price', temaEdit.price);
                formData.append('timetaken', temaEdit.timetaken);
                formData.append('temaContent', temaEdit.temaContent);
                formData.append('address', temaEdit.address);
                formData.append('personnel', temaEdit.personnel);
                formData.append('difficulty', temaEdit.difficulty);
                formData.append('location', temaEdit.location);
                formData.append('genre', temaEdit.genre);
                formData.append('latitude', coordinates.latitude);
                formData.append('longitude', coordinates.longitude);

                // 수정된 데이터 서버에 전송
                axios.put(`/api/tema`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        console.log("수정 완료:", response.data);
                        alert("수정이 완료되었습니다.");
                        navigate("/edit-theme");
                    })
                    .catch(error => {
                        console.error("수정 실패:", error);
                    });
            }
        });
    };

    // 입력 값 변경 핸들러
    const Modify = (e) => {
        setTemaEdit({
            ...temaEdit,
            [e.target.name]: e.target.value
        });
    };

    // 이미지 변경 핸들러
    const ModifyImg = (e) => {
        setTemaEdit({
            ...temaEdit,
            imgUrl: e.target.files[0],  // 파일 선택
        });
    };

    // 주소 검색 버튼 핸들러
    const AddressClick = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                setTemaEdit({
                    ...temaEdit,
                    address: data.address
                });
            }
        }).open();
    };

    // 컴포넌트 마운트 시 카카오 주소 API 로드
    useEffect(() => {
        KakaoMap();
    }, []);

    return (
        <div className="edit-tema">
            <h2>테마 수정</h2>
            <form onSubmit={ModifySubmit}>
                <label>테마 번호:</label>
                <input name="temaNo" type="text" value={temaEdit.temaNo} onChange={Modify} readOnly /> <br />

                <label>아이디:</label>
                <input name="temaNo" type="text" value={temaEdit.memberId} onChange={Modify} readOnly /> <br />

                <label>카페이름:</label>
                <input name="cafeName" type="text" value={temaEdit.cafeName} onChange={Modify} required /> <br />

                <label>테마이름:</label>
                <input name="temaName" type="text" value={temaEdit.temaName} onChange={Modify} required /><br />

                <label>가격:</label>
                <input name="price" type="text" value={temaEdit.price} onChange={Modify} required /><br />

                <label>소요시간:</label>
                <input name="timetaken" type="text" value={temaEdit.timetaken} onChange={Modify} required /><br />

                <label>테마설명:</label>
                <textarea name="temaContent" value={temaEdit.temaContent} onChange={Modify} required></textarea><br />

                <label>지역:</label>
                <select name="location" value={temaEdit.location} onChange={Modify}>
                    <option value="서울">서울</option>
                    <option value="부산">부산</option>
                    <option value="대구">대구</option>
                    <option value="인천">인천</option>
                </select><br />

                <label>주소:</label>
                <input name="address" type="text" value={temaEdit.address} onChange={Modify} readOnly required />
                <button type="button" onClick={AddressClick}>주소 검색</button><br />

                <label>인원수:</label>
                <select name="personnel" value={temaEdit.personnel} onChange={Modify}>
                    <option value={2}>2명</option>
                    <option value={3}>3명</option>
                    <option value={4}>4명</option>
                    <option value={5}>5명</option>
                    <option value={6}>6명</option>
                </select><br />

                <label>난이도:</label>
                <select name="difficulty" value={temaEdit.difficulty} onChange={Modify}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select><br />

                <label>장르:</label>
                <select name="genre" value={temaEdit.genre} onChange={Modify}>
                    <option value="미스터리">미스터리</option>
                    <option value="호러">호러</option>
                    <option value="SF">SF</option>
                    <option value="추리">추리</option>
                    <option value="판타지">판타지</option>
                    <option value="어드벤처">어드벤처</option>
                </select><br />

                <input type="file" accept='image/*' onChange={ModifyImg}></input>
                <button type="submit">수정 하기</button>
            </form>
        </div>
    );


}

export default ModifyTema;