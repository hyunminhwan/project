import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './passwordCheck.css';
import { useSelector } from "react-redux";

function PasswordCheck() {
  const [memberPwd, setMemberPwd] = useState("");
  const navigate = useNavigate();
  const loginToMember = useSelector((state) => state.loginMember);
  const memberId = loginToMember.member.memberId;
  const checkPassword = (e) => {
    e.preventDefault();

    if (!memberPwd) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    axios.post(`/api/checkpassword/${memberId}`, { memberPwd }) // 비밀번호 확인용 API 호출
      .then((response) => {
        if (response.status === 200) {
          alert("비밀번호가 확인되었습니다.");
          navigate("/editMember",{state:{memberId}}); // 비밀번호가 확인되면 수정 페이지로 이동
        } else {
          alert("비밀번호 확인 실패");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert("비밀번호가 일치하지 않습니다.");
        } else {
          alert("비밀번호 확인 중 오류가 발생했습니다.");
        }
      });
  };

  return (
    <div className="PasswordCheck_Form">
      <h1>비밀번호 확인</h1>
      <form onSubmit={checkPassword}>
        <input
          type="password"
          name="memberPwd"
          placeholder="비밀번호를 입력하세요"
          value={memberPwd}
          onChange={(e) => setMemberPwd(e.target.value)}
        />
        <button type="submit">확인</button>
      </form>
    </div>
  );
}

export default PasswordCheck;
