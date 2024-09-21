import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { useDispatch } from "react-redux";
import { login } from "../store/loginStore";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Login() {
    const [loginType, setLoginType] = useState(1); // 1: 일반, 2: 관계자, 3: 관리자
    let dispatch = useDispatch();
    const navigate = useNavigate();
    // 로그인 처리 로직
    const loginOn = (e) => {
        e.preventDefault();

        const memberId = e.target.memberId.value.trim();
        const memberPwd = e.target.memberPwd.value.trim();

        // 유효성 검사: 아이디와 비밀번호가 입력되었는지 확인
        if (!memberId || !memberPwd) {
            alert("아이디와 비밀번호를 입력해주세요.");
            return; // 빈 값일 경우 서버 요청 중단
        }


        axios.post(`/api/memberLogin/${loginType}`, {
            memberId: memberId,
            memberPwd: memberPwd,
        })
            .then(response => {
                // 서버 응답이 성공적일 때 처리
                if (response.status === 200) {
                    // 로그인 성공 시
                    const memberData = response.data; // 서버에서 받은 사용자 정보           
                    dispatch(login(memberData)); // 리덕스에 사용자 정보 저장
                    navigate("/");
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
            <div className="Login_Form">
                <form onSubmit={loginOn}>
                    <table>
                        <tr>
                            <td>아이디</td>
                            <td><input name="memberId" /></td>
                            <td rowSpan={2} >
                                <button type="submit">로그인</button>
                            </td>
                        </tr>
                        <tr>
                            <td>비밀번호</td>
                            <td><input type="password" name="memberPwd" /></td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <ToggleButtonGroup
                                    className="Login_Toggle_Button_Group"
                                    type="radio"
                                    name="loginType"
                                    value={loginType}
                                    onChange={(val) => setLoginType(val)}
                                >
                                    <ToggleButton id="user" value={1} className="Login_Toggle_Button">
                                        일반로그인
                                    </ToggleButton>
                                    <ToggleButton id="manager" value={2} className="Login_Toggle_Button">
                                        관계자로그인
                                    </ToggleButton>
                                    <ToggleButton id="master" value={3} className="Login_Toggle_Button">
                                        관리자로그인
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </td>
                        </tr>

                    </table>
                    <br />


                    <div>
                        <Button type="button" onClick={() => navigate("/signup")}>회원가입&emsp;&emsp;</Button>
                        <Button type="button" onClick={() => navigate("/findid")}>아이디 찾기</Button>
                        <Button type="button" onClick={() => navigate("/findpwd")}>비밀번호 찾기</Button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;
