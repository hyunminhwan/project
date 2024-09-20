import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './remember.css';


function Remember() {
    const loginToMember = useSelector((state) => state.loginMember) || null; // Redux에서 상태를 가져옴
    const memberId =loginToMember.member.memberId;
    const navigate = useNavigate();

    // 회원 정보 상태 관리
    const [memberData, setMemberData] = useState({
        memberId: '',
        memberName: '',
        memberBirthDate: '',
        memberGender: '',
        memberPwd: '',
        memberPwdCheck: '',
        memberPhone: '',
        memberEmail: ''
    });

    // 비밀번호 일치 여부 상태 관리
    const [isPwdMatch, setIsPwdMatch] = useState(null);

    // 컴포넌트 마운트 시 기존 회원 정보를 가져옴
    useEffect(() => {
        // 실제 API 주소에 맞게 호출
        axios.get(`/api/current/${memberId}`) // 현재 로그인된 사용자의 정보를 가져와야 합니다.
            .then(response => {
                setMemberData({
                    memberId: response.data.memberId,
                    memberName: response.data.memberName,
                    memberBirthDate: response.data.memberBirthDate,
                    memberGender: response.data.memberGender,
                    memberPwd: '', // 비밀번호는 빈칸으로 두기
                    memberPwdCheck: '',
                    memberPhone: response.data.memberPhone,
                    memberEmail: response.data.memberEmail
                });
            })
            .catch(error => console.error('회원 정보 불러오기 오류:', error));
    }, []);

    // 폼 데이터 변경 처리
    const handleChange = (e) => {
        const { name, value } = e.target; 
        setMemberData({
            ...memberData,
            [name]: value
        });

        // 비밀번호 일치 여부 체크
        if (name === "memberPwd" || name === "memberPwdCheck") {
            setIsPwdMatch(
                name === "memberPwd" 
                ? value === memberData.memberPwdCheck 
                : value === memberData.memberPwd
            );
        }
    };

    // 폼 제출 처리 및 유효성 검사
    const handleSubmit = async (e) => {
        e.preventDefault(); // 페이지 새로고침 방지

        // 비밀번호 일치 여부 확인
        if (!isPwdMatch) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        // 나머지 유효성 검사
        const phonePattern = /^\d{10,11}$/; // 핸드폰 번호 패턴
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 패턴

        if (!phonePattern.test(memberData.memberPhone)) {
            alert('핸드폰 번호는 10~11자의 숫자만 입력해야 합니다.');
            return;
        }
 
        if (!emailPattern.test(memberData.memberEmail)) {
            alert('유효하지 않은 이메일 주소입니다.');
            return;
        }

        
            axios.put('/api/update', memberData)
                .then((result)=>{
                    if(result){
                        alert('회원 정보가 성공적으로 수정되었습니다.');
                        navigate("/")
                    }else{
                        alert("회원 정보 수정에 실패하였습니다 ")
                    }
                })
                .catch(()=>{
                    alert('회원 정보 수정 중 오류가 발생했습니다.');
                })
            
        }
    

    // 회원탈퇴
    const deleteMember = (memberId) => {
        if(window.confirm("회원을 삭제하시겠습니까?")) {
            axios.delete(`/api/members/${memberId}`)
                .then(() => {
                    localStorage.clear();
                    alert('회원이 삭제되었습니다');
                    navigate('/') // 회원탈퇴후 홈으로이동
                    window.location.reload();
                   
                    
                })
                .catch(error => {
                    alert('회원 삭제 중 오류가 발생했습니다');
                    console.log('회원 삭제 오류 : ', error);
                });
        }
    };

    return (

<div className="signup-container">
    <h2>회원 정보 수정</h2>
    <form onSubmit={handleSubmit}>
        <div className="form-columns">
            <div className="left-column">
                <div className="field">
                    <label>아이디</label>
                    <input
                        value={loginToMember.member.memberId}
                        readOnly
                    />
                </div>

                <div className="field">
                    <label>이름</label>
                    <input 
                        value={loginToMember.member.memberName}
                        readOnly
                    />
                </div>

                <div className="field">
                    <label>생년월일</label>
                    <input 
                        value={loginToMember.member.birthDate}
                        readOnly
                    />
                </div>

                <div className="field">
                    <label>성별</label>
                    <input 
                        type="gender"
                        name="gender"
                        value={loginToMember.member.gender}
                        readOnly
                    />
                </div>
            </div>

            <div className="right-column">
                <div className="field">
                    <label>비밀번호</label>
                    <input
                        type="password"
                        name="memberPwd"
                        value={memberData.memberPwd}
                        onChange={handleChange}
                        placeholder="새 비밀번호를 입력하세요."
                        required
                    />
                </div>

                <div className="field">
                    <label>비밀번호 확인</label>
                    <input
                        type="password"
                        name="memberPwdCheck"
                        value={memberData.memberPwdCheck}
                        onChange={handleChange}
                        placeholder="비밀번호를 다시 입력하세요."
                        required
                    />
                    {isPwdMatch !== null && (
                        <p style={{ color: isPwdMatch ? 'black' : 'black' }}>
                            {isPwdMatch ? '비밀번호 확인과 일치합니다.' : '비밀번호 확인과 일치하지 않습니다.'}
                        </p>
                    )}
                </div>

                <div className="field">
                    <label>핸드폰 번호</label>
                    <input
                        type="text"
                        name="memberPhone"
                        value={memberData.memberPhone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="field">
                    <label>이메일</label>
                    <input
                        type="email"
                        name="memberEmail"
                        value={memberData.memberEmail}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
        </div>

        <button type="submit">수정하기</button>
        <br></br>
        <button onClick={() => { deleteMember(loginToMember.member.memberId) }}>회원탈퇴</button>
    </form>
</div>

    );

};
export default Remember;
