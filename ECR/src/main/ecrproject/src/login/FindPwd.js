import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './find.css'; // CSS 파일 import

function FindPwd() {
    const [FindPwd, setFindPwd] = useState("");
    const navigate = useNavigate();

    const findpwd = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const loginType = formData.get("loginType");
        const memberId = formData.get("memberId").trim();
        const memberPhone = formData.get("memberPhone").trim();
        const memberEmail = formData.get("memberEmail").trim();

        axios.post("/api/findpwd", null, {
            params: {
                memberId,
                memberPhone,
                memberEmail,
                loginType,
            }
        })
        .then(response => {
            setFindPwd(response.data);
            if (response.data !== "") {
                alert("비밀번호를 변경해주세요.");
            } else {
                alert("입력하신 정보가 다릅니다.");
            }
        })
        .catch(() => {
            alert("비밀번호 찾기에 실패했습니다.");
        });
    };

    const changePwd = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const memberId = formData.get("memberId").trim();
        const memberPwd = formData.get("memberPwd").trim();
        const memberPwdCheck = formData.get("memberPwdCheck").trim();

        if (memberPwdCheck !== memberPwd) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        axios.post("/api/changepwd", null, {
            params: {
                memberId,
                memberPwd,
            }
        })
        .then(() => {
            alert("비밀번호가 변경되었습니다.");
            navigate("/login");
        })
        .catch(() => {
            alert("비밀번호 변경에 실패했습니다.");
        });
    };

    return (
        <div className="find-container">
            <h2>비밀번호 찾기</h2>
            <form onSubmit={findpwd}>
                <select name="loginType">
                    <option value={1}>일반 사용자</option>
                    <option value={2}>관계자</option>
                </select>
                <table>
                    <tbody>
                        <tr>
                            <td>아이디</td>
                            <td><input type="text" placeholder="아이디를 입력하세요" name="memberId" /></td>
                        </tr>
                        <tr>
                            <td>전화번호</td>
                            <td><input type="number" placeholder="'-'를 제외하고 입력하세요" name="memberPhone" /></td>
                        </tr>
                        <tr>
                            <td>이메일</td>
                            <td><input type="email" placeholder="ex)name@naver.com" name="memberEmail" /></td>
                        </tr>
                        <tr>
                            <td colSpan={2}><button type="submit">비밀번호 찾기</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>

            {FindPwd !== "" && (
                <form onSubmit={changePwd}>
                    <table>
                        <tbody>
                            <tr>
                                <td>아이디</td>
                                <td><input type="text" name="memberId" value={FindPwd} readOnly /></td>
                            </tr>
                            <tr>
                                <td>비밀번호</td>
                                <td><input type="password" name="memberPwd" placeholder="새 비밀번호를 입력하세요" /></td>
                            </tr>
                            <tr>
                                <td>비밀번호 확인</td>
                                <td><input type="password" name="memberPwdCheck" placeholder="비밀번호 확인" /></td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <button type="submit">비밀번호 변경</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            )}
        </div>
    );
}

export default FindPwd;

