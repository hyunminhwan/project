import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { useDispatch } from "react-redux";
import { login } from "../../store/loginStore";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Login() {
    const [loginType, setLoginType] = useState(3); // 1: 일반, 2: 관계자, 3: 관리자
    let dispatch = useDispatch();
    const navigate = useNavigate();

    // 로그인 처리 로직
    const loginOn = (e) => {
        e.preventDefault();

        const memberId = e.target.memberId.value.trim();
        const memberPwd = e.target.memberPwd.value.trim();

        if (!memberId || !memberPwd) {
            alert("아이디와 비밀번호를 입력해주세요.");
            return;
        }

        axios.post(`/api/memberLogin/${loginType}`, {
            memberId: memberId,
            memberPwd: memberPwd,
        })
            .then(response => {
                if (response.status === 200) {
                    const memberData = response.data;
                    dispatch(login(memberData));
                    navigate("/");
                } else {
                    alert("로그인 실패");
                }
            })
            .catch(error => {
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
        <div className="Login_Form">
            <h1>Login</h1>
            <form onSubmit={loginOn}>
                <input name="memberId" placeholder="아이디" />
                <input type="password" name="memberPwd" placeholder="비밀번호" />
                
                <ToggleButtonGroup
                    className="Login_Toggle_Button_Group"
                    type="radio"
                    name="loginType"
                    value={loginType}
                    onChange={(val) => setLoginType(val)}
                >
                    <ToggleButton variant="outline-danger" id="user" value={1} className="Login_Toggle_Button">
                        일반로그인
                    </ToggleButton>
                    <ToggleButton variant="outline-danger" id="manager" value={2} className="Login_Toggle_Button">
                        관계자로그인
                    </ToggleButton>
                </ToggleButtonGroup>

                <button type="submit">로그인</button>

                <div>
                    <Button type="button" variant="outline-danger" onClick={() => navigate("/signup")}>회원가입</Button>
                    <Button type="button" variant="outline-danger" onClick={() => navigate("/findid")}>아이디 찾기</Button>
                    <Button type="button" variant="outline-danger" onClick={() => navigate("/findpwd")}>비밀번호 찾기</Button>
                </div>
            </form>
        </div>
    );
}

export default Login;
