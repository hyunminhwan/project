import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './ModifyTemaCss.css';

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
        memberId: '',
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

    const Modify = (e) => {
        setTemaEdit({
            ...temaEdit,
            [e.target.name]: e.target.value
        });
    };

    const ModifyImg = (e) => {
        setTemaEdit({
            ...temaEdit,
            imgUrl: e.target.files[0],  // 파일 선택
        });
    };

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

    useEffect(() => {
        KakaoMap();
    }, []);

    return (
        <div className="Modifytema_Form">
            <h2 className="Modifytema_Title">테마 수정</h2>
            <form onSubmit={ModifySubmit} className="Modifytema_Submit">

                <div className="Modifytema_One">
                    <label className="Modifytema_Label">테마 번호:</label>
                    <input name="temaNo" type="text" value={temaEdit.temaNo} onChange={Modify} readOnly className="Modifytema_Center" />
                </div>

                <div className="Modifytema_One">
                    <label className="Modifytema_Label">아이디:</label>
                    <input name="memberId" type="text" value={temaEdit.memberId} onChange={Modify} readOnly className="Modifytema_Center" />
                </div>

                <div className="Modifytema_Two">
                    <div className="Modifytema_Group">
                        <label className="Modifytema_Label">카페이름:</label>
                        <input name="cafeName" type="text" value={temaEdit.cafeName} onChange={Modify} required className="Modifytema_Input" />
                    </div>
                    <div className="Modifytema_Group">
                        <label className="Modifytema_Label">테마이름:</label>
                        <input name="temaName" type="text" value={temaEdit.temaName} onChange={Modify} required className="Modifytema_Input" />
                    </div>
                </div>

                <div className="Modifytema_Two">
                    <div className="Modifytema_Group">
                        <label className="Modifytema_Label">소요시간:</label>
                        <input name="timetaken" type="number" value={temaEdit.timetaken} onChange={Modify} required className="Modifytema_Input" />
                    </div>
                    <div className="Modifytema_Group">
                        <label className="Modifytema_Label">가격:</label>
                        <input name="price" type="number" value={temaEdit.price} onChange={Modify} required className="Modifytema_Input" />
                    </div>
                </div>

                <div className="Modifytema_One">
                    <label className="Modifytema_Label">테마설명:</label>
                    <textarea name="temaContent" value={temaEdit.temaContent} onChange={Modify} required className="Modifytema_Textarea"></textarea>
                </div>

                <div className="Modifytema_One">
                    <label className="Modifytema_Label">지역:</label>
                    <select name="location" value={temaEdit.location} onChange={Modify} className="Modifytema_Select_Center">
                        <option value="서울">서울</option>
                        <option value="경기">경기</option>
                        <option value="인천">인천</option>
                        <option value="대구">대구</option>
                        <option value="부산">부산</option>
                    </select>
                </div>

                <div className="Modifytema_One">
                    <label className="Modifytema_Label">주소:</label>
                    <input name="address" type="text" value={temaEdit.address} onChange={Modify} readOnly required className="Modifytema_Center" />
                    <button type="button" onClick={AddressClick} className="form-button">주소 검색</button>
                </div>

                <div className="Modifytema_Two">
                    <div className="Modifytema_Group">
                        <label className="Modifytema_Label">인원수:</label>
                        <select name="personnel" value={temaEdit.personnel} onChange={Modify} className="Modifytema_Select">
                            <option value={2}>2명</option>
                            <option value={3}>3명</option>
                            <option value={4}>4명</option>
                            <option value={5}>5명</option>
                            <option value={6}>6명</option>
                        </select>
                    </div>
                    <div className="Modifytema_Group">
                        <label className="Modifytema_Label">난이도:</label>
                        <select name="difficulty" value={temaEdit.difficulty} onChange={Modify} className="Modifytema_Select">
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    </div>
                </div>

                <div className="Modifytema_Two">
                    <div className="Modifytema_Group">
                        <label className="Modifytema_Label">장르:</label>
                        <select name="genre" value={temaEdit.genre} onChange={Modify} className="Modifytema_Select">
                            <option value="미스터리">미스터리</option>
                            <option value="호러">호러</option>
                            <option value="스릴러">스릴러</option>
                            <option value="추리">추리</option>
                            <option value="판타지">판타지</option>
                            <option value="어드벤처">어드벤처</option>
                        </select>
                    </div>
                    <div className="Modifytema_Group">
                        <label className="Modifytema_Label">이미지 업로드</label>
                        <input type="file" accept='image/*' onChange={ModifyImg} required className="Modifytema_Input_File" />
                    </div>
                </div>
                <button type="submit" className="form-submit-button">수정 하기</button>
            </form>
        </div>
    );
}

export default ModifyTema;
