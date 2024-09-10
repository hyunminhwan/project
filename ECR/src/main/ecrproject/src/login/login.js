import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

function Login({ onLoginSuccess }) {
    const [loginType, setLoginType] = useState(1); // 1: 일반, 2: 관계자, 3: 관리자
    const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태
    const [showLinks, setShowLinks] = useState(true); // 링크를 숨기거나 보여줄 상태

    // 로그인 처리 로직
    const handleLogin = (e) => {
        e.preventDefault();

        const memberId = e.target.memberId.value.trim();
        const memberPwd = e.target.memberPwd.value.trim();

        // 유효성 검사: 아이디와 비밀번호가 입력되었는지 확인
        if (!memberId || !memberPwd) {
            setErrorMessage("아이디와 비밀번호를 입력해주세요.");
            return; // 빈 값일 경우 서버 요청 중단
        }

        // let loginUrl = '';

        // // 선택된 로그인 타입에 따라 다른 URL로 요청
        // if (loginType === 1) {
        //     loginUrl = `/api/userlogin/${loginType}`;  // 일반 사용자 로그인 처리
        // } else if (loginType === 2) {
        //     loginUrl = `/api/managerlogin/${loginType}`; // 관계자 로그인 처리
        // } else if (loginType === 3) {
        //     loginUrl = `/api/masterlogin/${loginType}`;  // 관리자 로그인 처리
        // }

        // 선택된 URL로 POST 요청을 보냅니다. (로그인 폼 데이터를 같이 전송)
        axios.post(`/api/userlogin/${loginType}`, {
                memberId: memberId,
                memberPwd: memberPwd,
        })
            .then(response => {
                console.log(response);
                // 서버 응답이 성공적일 때 처리
                if (response.data.memberId != null) {
                    alert('로그인 성공!');
                    const userName = response.data.memberName  // 서버에서 받은 사용자 이름 또는 입력된 아이디 사용
                    onLoginSuccess(userName);  // 로그인 성공 시 사용자 이름 전달
                } else {
                    alert("로그인 실패");
                }
            })
            .catch(error => {
                // 서버에서 오류가 발생했을 때 에러 처리
                if (error.response && error.response.status === 401) {
                    alert("비밀번호가 틀렸습니다.");
                } else if (error.response && error.response.status === 404) {
                    alert("존재하지 않는 아이디입니다.");
                } else {
                    alert("로그인 중 오류가 발생했습니다.");
                }
            });
    };

    return (
        <>
            <div className="login-form">
                <form onSubmit={handleLogin}>
                    <table>
                        <tr>
                            <td>아이디</td>
                            <td><input name="memberId" /></td>
                        </tr>
                        <tr>
                            <td>비밀번호</td>
                            <td><input type="password" name="memberPwd" /></td>
                        </tr>
                        <tr>
                            <td colSpan={3}>


                                <ToggleButtonGroup
                                    className="toggle-button-group"
                                    type="radio"
                                    name="loginType"
                                    value={loginType}
                                    onChange={(val) => setLoginType(val)}
                                >
                                    <ToggleButton id="user" value={1} className="toggle-button-custom">
                                        일반로그인
                                    </ToggleButton>
                                    <ToggleButton id="manager" value={2} className="toggle-button-custom">
                                        관계자로그인
                                    </ToggleButton>
                                    <ToggleButton id="master" value={3} className="toggle-button-custom">
                                        관리자로그인
                                    </ToggleButton>
                                </ToggleButtonGroup>


                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}><button type="submit">로그인</button></td>
                        </tr>
                    </table>

                    {/* 관리자 로그인이 아닐 때만 링크 표시 */}
                    {showLinks && (
                        <div>
                            <a href="아이디찾기_링크" target="_blank" rel="noopener noreferrer">아이디/비밀번호 찾기</a> &emsp;
                            <a href="회원가입_링크" target="_blank" rel="noopener noreferrer">회원가입</a>
                        </div>
                    )}
                </form>
            </div>
        </>
    );
}

export default Login;
