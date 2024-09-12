import axios from "axios";
import { useState } from "react";
import './member.css';

function MemberForm() {

    // 회원가입 폼 데이터 상태 관리
    const [insertMem, setInsertMem] = useState({
        memberId: '',
        memberPwd: '',
        memberPwdCheck: '',
        memberName: '',
        memberPhone: '',
        memberEmail: '',
        shopName: '',
        shopAddress: '',
        shopPhone: '',
        loginType: 1, // 기본 로그인 타입은 일반 사용자
    });

    // 정규식 패턴
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 패턴
    const idPattern = /^[a-zA-Z0-9]{5,}$/; // 아이디 패턴: 5자 이상, 영문자와 숫자
    // const pwdPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/; // 비밀번호 패턴: 최소 8자, 영문자, 숫자, 특수문자 포함
    const phonePattern = /^\d{10,11}$/; // 핸드폰 번호 패턴: 숫자만 10~11자

    // 폼 데이터 변경 처리
    const insertform = (e) => {
        const { name, value } = e.target;

        setInsertMem({
            ...insertMem,
            [name]: value,
        });
    };

    // 폼 제출 처리 및 유효성 검사
    const insertSubmit = async (e) => {
        e.preventDefault(); // 페이지 새로고침 방지

        // 유효성 검사
        if (!idPattern.test(insertMem.memberId)) {
            alert('아이디는 5자 이상이어야 하며, 영문자와 숫자만 사용할 수 있습니다.');
            return;
        }

        // if (!pwdPattern.test(insertMem.memberPwd)) {
        //     alert('비밀번호는 최소 8자이며, 영문자, 숫자, 특수문자를 포함해야 합니다.');
        //     return;
        // }

        if (insertMem.memberPwd !== insertMem.memberPwdCheck) {
            alert('비밀번호와 비밀번호확인이 일치하지 않습니다');
            return;
        }

        if (!phonePattern.test(insertMem.memberPhone)) {
            alert('핸드폰 번호는 10~11자의 숫자만 입력해야 합니다.');
            return;
        }

        if (!emailPattern.test(insertMem.memberEmail)) {
            alert('유효하지 않은 이메일 주소입니다.');
            return;
        }

        try {
            await axios.post('/api/insert', insertMem);
            alert('회원가입이 완료되었습니다.');
        } catch (error) {
            alert('회원가입 중 오류가 발생했습니다.');
        }
    };

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

                <label>비밀번호 확인:</label>
                <input
                    type="password"
                    name="memberPwdCheck"
                    value={insertMem.memberPwdCheck}
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
