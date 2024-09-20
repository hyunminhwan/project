import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
// import './MyPage.css'; // 마이페이지 CSS

function MyPage() {
  // Redux에서 로그인한 유저 정보 가져오기
  const loginToMember = useSelector((state) => state.loginMember);

  // formData는 사용자가 입력한 데이터를 관리하기 위한 상태
  const [formData, setFormData] = useState({
    memberId: '', // 아이디
    name: '', // 이름
    email: '', // 이메일
    phoneNumber: '', // 전화번호
    password: '', // 새 비밀번호
    checkPassword: '', // 새 비밀번호 확인
  });

  // 컴포넌트가 마운트될 때, 로그인된 회원 정보를 formData 상태로 설정
  useEffect(() => {
    if (loginToMember.member) {
      setFormData({
        memberId: loginToMember.member.memberId,
        email: loginToMember.member.email,
        phoneNumber: loginToMember.member.phoneNumber,
      });
    }
  }, [loginToMember]); // loginToMember가 변경될 때마다 실행

  // input 필드의 값이 변경될 때 호출되는 핸들러
  const handleChange = (e) => {
    setFormData({
      ...formData, // 기존 formData를 유지
      [e.target.name]: e.target.value, // 변경된 필드 업데이트
    });
  };

  // form 제출 시 호출되는 핸들러
  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 form 제출 동작 막기

    // 백엔드로 PUT 요청을 보내 회원 정보를 업데이트
    axios.put(`/api/members/${loginToMember.member.memberId}`, formData)
      .then(response => {
        alert('회원 정보가 수정되었습니다.'); // 성공 메시지
      })
      .catch(error => {
        console.error('Error updating member information:', error); // 오류 로그
        alert('회원 정보 수정 중 오류가 발생했습니다.'); // 실패 메시지
      });
  };

  return (
    <div className="mypage">
      <h2>회원 정보 수정</h2>
      <form onSubmit={handleSubmit}>

        {/* 이름은 읽기 전용 */}
        <div>
          <label>이름:</label>
          <input type="text" value={formData.name} readOnly />
        </div>

        {/* 아이디도 읽기 전용 */}
        <div>
          <label>아이디:</label>
          <input type="text" value={formData.memberId} readOnly />
        </div>

        {/* 비밀번호 수정 */}
        <div>
          <label>비밀번호:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange} // 값 변경 시 handleChange 호출
          />
        </div>

        {/* 이메일 수정 */}
        <div>
          <label>이메일:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange} // 값 변경 시 handleChange 호출
          />
        </div>

        {/* 전화번호 수정 */}
        <div>
          <label>전화번호:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange} // 값 변경 시 handleChange 호출
          />
        </div>

        {/* 제출 버튼 */}
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
}

export default MyPage;