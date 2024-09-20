import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FindId() {

    const [FindId, setFoundId] = useState("");
    const navigate = useNavigate();

    const findId = (e) => {
        e.preventDefault();

        // 데이터 넣어주기
        const formData = new FormData(e.target);
        const loginType = formData.get("loginType");
        const memberName = formData.get("memberName").trim();
        const memberPhone = formData.get("memberPhone").trim();
        const memberEmail = formData.get("memberEmail").trim();

        // 서버에 요청 보내기
        axios.post("/api/findid", null, {
            params: {
                memberName,
                memberPhone,
                memberEmail,
                loginType,
            }
        })
        .then(response => {
            // 서버에서 가져온 아이디값 넣기
            setFoundId(response.data);
            if(response.data != ""){
                alert("아이디 찾기를 완료했습니다.")
            }else{
                alert("아이디가 없습니다")
            }
         
        })
        .catch(() => {
          alert("아이디찾기에 실패했습니다");
        });
    };
    return (
        <>
            <h2>아이디 찾기</h2>
            <form onSubmit={findId}>
                <select name="loginType">
                    <option value={1}>일반 사용자</option>
                    <option value={2}>관계자</option>
                </select>
                <table>
                    <tr>
                        <td>이름</td>
                        <td><input type="text" placeholder="이름을 입력하세요" name="memberName" /></td>
                    </tr>
                    <tr>
                        <td>전화번호</td>
                        <td><input type="number" placeholder="'-'를제외하고 입력하세요" name="memberPhone"/></td>
                    </tr>
                    <tr>
                        <td>이메일</td>
                        <td><input type="email" placeholder="ex)name@naver.com" name="memberEmail"/></td>
                    </tr>
                    <tr>
                        <td ><button type="submit">아이디찾기</button></td>
                        <td><button type="button" onClick={()=>{navigate("/findpwd")}}>비밀번호찾기</button></td>
                    </tr>
                </table>
            </form>
            {FindId&&( <div>{FindId}</div>)}
          

        </>
    )
}

export default FindId;