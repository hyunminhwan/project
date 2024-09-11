import axios from "axios";
import { useState } from "react";
import './member.css';
function MemberForm() {

    // 회원가입 폼 데이터 상태 관리
    const [insertMem, setInsertMem] = useState({
        memberId: '',
        memberPwd: '',
        memberName: '',
        memberPhone: '',
        memberEmail: '',
        shopName: '',
        shopAddress: '',
        shopPhone: '',
        loginType: 1, // 기본 로그인 타입은 일반 사용자
    });

    // 폼 데이터 변경 처리
    const insertform = (e) => {
        setInsertMem({
            ...insertMem,
            [e.target.name]: e.target.value,
        });
    };

    // 폼 제출 처리
    const insertSubmit = async (e) => {
        e.preventDefault(); // 페이지 새로고침 방지

      
            axios.post('/api/insert', insertMem)
                 .then(()=>{
                    alert('회원가입이 완료되었습니다.');
                 })
                 .catch(()=>{
                    alert('회원가입 중 오류가 발생했습니다.');
                 })
        }
    
    return (
        <div className="signup-container">
            <h2>회원가입</h2>

            <form onSubmit={insertSubmit}>

                <label>로그인 타입:</label>
                <select name="loginType" value={insertMem.loginType} onChange={insertform}>
                    <option value={1}>일반 사용자</option>
                    <option value={2}>관계자</option>
                    <option value={3}>관리자</option>
                </select>


                <label>아이디:</label>
                <input
                    type="text"
                    name="memberId"
                    value={insertMem.memberId}
                    onChange={insertform}
                    required
                />

                <label>비밀번호:</label>
                <input
                    type="password"
                    name="memberPwd"
                    value={insertMem.memberPwd}
                    onChange={insertform}
                    required
                />

                <label>이름:</label>
                <input
                    type="text"
                    name="memberName"
                    value={insertMem.memberName}
                    onChange={insertform}
                    required
                />

                <label>핸드폰 번호:</label>
                <input
                    type="text"
                    name="memberPhone"
                    value={insertMem.memberPhone}
                    onChange={insertform}
                    required
                />

                <label>이메일:</label>
                <input
                    type="email"
                    name="memberEmail"
                    value={insertMem.memberEmail}
                    onChange={insertform}
                    required
                />

                <label>가게 이름:</label>
                <input
                    type="text"
                    name="shopName"
                    value={insertMem.shopName}
                    onChange={insertform}
                />

                <label>가게 주소:</label>
                <input
                    type="text"
                    name="shopAddress"
                    value={insertMem.shopAddress}
                    onChange={insertform}
                />

                <label>가게 연락처:</label>
                <input
                    type="text"
                    name="shopPhone"
                    value={insertMem.shopPhone}
                    onChange={insertform}
                />



                <button type="submit">회원가입</button>
            </form>
        </div>
    );

}

export default MemberForm;