import React, { useState } from 'react';
import axios from 'axios';
import './insertTemaCss.css';
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
    const memberId = loginToMember.member.memberId;
    const [temaInsert, setTemaInsert] = useState({
        memberId: memberId,
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
        imgUrl: null
    });

    const TemaSubmit = (event) => {
        event.preventDefault();

        Coordinates(temaInsert.address).then((coordinates) => {
            if (coordinates) {
                const formData = new FormData();
                formData.append('memberId', temaInsert.memberId);
                formData.append('imgUrl', temaInsert.imgUrl);
                formData.append('cafeName', temaInsert.cafeName);
                formData.append('temaName', temaInsert.temaName);
                formData.append('price', temaInsert.price);
                formData.append('timetaken', temaInsert.timetaken);
                formData.append('temaContent', temaInsert.temaContent);
                formData.append('address', temaInsert.address);
                formData.append('personnel', temaInsert.personnel);
                formData.append('difficulty', temaInsert.difficulty);
                formData.append('location', temaInsert.location);
                formData.append('genre', temaInsert.genre);
                formData.append('latitude', coordinates.latitude);
                formData.append('longitude', coordinates.longitude);

                axios.post("/api/tema", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then((response) => {
                        alert("등록이 완료되었습니다.");
                    })
                    .catch((error) => {
                        console.error("실패:", error);
                    });
            }
        });
    };

    const InsertImg = (e) => {
        setTemaInsert({
            ...temaInsert,
            imgUrl: e.target.files[0],
        });
    };

    const TemaData = (e) => {
        setTemaInsert({
            ...temaInsert,
            [e.target.name]: e.target.value
        });
    };

    const AddressClick = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                setTemaInsert({
                    ...temaInsert,
                    address: data.address
                });
            }
        }).open();
    };

    React.useEffect(() => {
        KakaoMap();
    }, []);
    return (
        <div className="insert-tema-form">
            <h2 className="form-title">테마 등록</h2>
            <form onSubmit={TemaSubmit} className="tema-form">
                
                <div className="form-group-center">
                    <label className="form-label">아이디</label>
                    <input name="memberId" type='text' value={temaInsert.memberId} onChange={TemaData} readOnly className="form-input-center" />
                </div>
    
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">카페이름</label>
                        <input name="cafeName" type="text" value={temaInsert.cafeName} onChange={TemaData} required className="form-input" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">테마이름</label>
                        <input name="temaName" type="text" value={temaInsert.temaName} onChange={TemaData} required className="form-input" />
                    </div>
                </div>
    
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">소요시간</label>
                        <input name="timetaken" type="text" value={temaInsert.timetaken} onChange={TemaData} required className="form-input" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">가격</label>
                        <input name="price" type="text" value={temaInsert.price} onChange={TemaData} required className="form-input" />
                    </div>
                </div>
    
                <div className="form-group-center">
                    <label className="form-label">테마설명</label>
                    <textarea name="temaContent" value={temaInsert.temaContent} onChange={TemaData} required className="form-textarea-center"></textarea>
                </div>
    
                <div className="form-group-center">
                    <label className="form-label">지역</label>
                    <select name="location" value={temaInsert.location} onChange={TemaData} className="form-select-center">
                        <option value="서울">서울</option>
                        <option value="부산">부산</option>
                        <option value="대구">대구</option>
                        <option value="인천">인천</option>
                    </select>
                </div>
    
                <div className="form-group-center">
                    <label className="form-label">주소:</label>
                    <input name="address" type="text" value={temaInsert.address} onChange={TemaData} readOnly required className="form-input-center" />
                    <button type="button" onClick={AddressClick} className="form-button">주소 검색</button>
                </div>
    
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">인원수</label>
                        <select name="personnel" value={temaInsert.personnel} onChange={TemaData} className="form-select">
                            <option value={2}>2명</option>
                            <option value={3}>3명</option>
                            <option value={4}>4명</option>
                            <option value={5}>5명</option>
                            <option value={6}>6명</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">난이도</label>
                        <select name="difficulty" value={temaInsert.difficulty} onChange={TemaData} className="form-select">
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    </div>
                </div>
    
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">장르</label>
                        <select name="genre" value={temaInsert.genre} onChange={TemaData} className="form-select">
                            <option value="미스터리">미스터리</option>
                            <option value="호러">호러</option>
                            <option value="SF">SF</option>
                            <option value="추리">추리</option>
                            <option value="판타지">판타지</option>
                            <option value="어드벤처">어드벤처</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">이미지 업로드</label>
                        <input type="file" accept='image/*' onChange={InsertImg} required className="form-input-file" />
                    </div>
                </div>
                <button type="submit" className="form-submit-button">등록</button>
            </form>
        </div>
    );
    
    
}
export default InsertTema;
