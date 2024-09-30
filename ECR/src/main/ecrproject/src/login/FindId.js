import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './find.css'; // CSS 파일 import

function FindId() {
    const [FindId, setFoundId] = useState("");
    const navigate = useNavigate();

    const findId = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const loginType = formData.get("loginType");
        const memberName = formData.get("memberName").trim();
        const memberPhone = formData.get("memberPhone").trim();
        const memberEmail = formData.get("memberEmail").trim();

        axios.post("/api/findid", null, {
            params: {
                memberName,
                memberPhone,
                memberEmail,
                loginType,
            }
        })
            .then(response => {
                setFoundId(response.data);
                if (response.data !== "") {
                    alert("아이디 찾기를 완료했습니다.");
                } else {
                    alert("아이디가 없습니다.");
                }
            })
            .catch(() => {
                alert("아이디 찾기에 실패했습니다.");
            });
    };

    return (
        <div className="find-container">
            <h2>아이디 찾기</h2>
            <form onSubmit={findId}>
                <select name="loginType">
                    <option value={1}>일반 사용자</option>
                    <option value={2}>관계자</option>
                </select>
                <table>
                    <tbody>
                        <tr>
                            <td>이름</td>
                            <td><input type="text" placeholder="이름을 입력하세요" name="memberName" /></td>
                        </tr>
                        <tr>
                            <td>전화번호</td>
                            <td><input type="number" placeholder="'-'를 제외하고 입력하세요" name="memberPhone" /></td>
                        </tr>
                        <tr>
                            <td>이메일</td>
                            <td><input type="email" placeholder="ex)name@naver.com" name="memberEmail" /></td>
                        </tr>
                    </tbody>
                </table>
                <div className="button-container">
                    <button type="submit">아이디 찾기</button>
                    <button type="button" onClick={() => navigate("/findpwd")}>비밀번호 찾기</button>
                </div>
            </form>
            {FindId && <p>{FindId}</p>}
        </div>
    );
}

export default FindId;
