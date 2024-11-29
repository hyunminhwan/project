import axios from "axios";
import { useState } from "react";
import './member.css';
import { useNavigate } from "react-router-dom";


function MemberForm() {
    const navigate = useNavigate()
    // 회원가입 폼 데이터 상태 관리
    const [insertMem, setInsertMem] = useState({
        memberId: '', //아이디
        memberPwd: '',  //비밀번호
        memberPwdCheck: '', //아이디체크
        memberName: '', //이름
        memberPhone: '', //핸드폰 번호
        memberEmail: '',  //이메일
        loginType: 1, // 기본 로그인 타입은 일반 사용자
        birthDate: '', // 생년월일 
        gender: '',     //성별
    });

    // 아이디 중복 체크 상태 관리
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);

    // 비밀번호 일치 여부 상태 관리
    const [isPasswordMatch, setIsPasswordMatch] = useState(null);

    // 정규식 패턴
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 패턴
    const idPattern = /^[a-zA-Z0-9]{5,}$/; // 아이디 패턴: 5자 이상, 영문자와 숫자
    const phonePattern = /^\d{10,11}$/; // 핸드폰 번호 패턴: 숫자만 10~11자  
    // 비밀번호 정규식 영문 + 숫자 + 특수문자 + 최소9자리
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{9,}$/;


    // 폼 데이터 변경 처리
    const insertform = (e) => {
        const { name, value } = e.target;

        setInsertMem({
            ...insertMem,
            [name]: name === 'loginType' ? parseInt(value) : value, // loginType을 숫자로 변환
        });

        // 아이디 중복 체크를 위해 아이디가 변경될 때마다 상태 초기화
        if (name === "memberId") {
            setIsUsernameAvailable(null);
        }

        // 비밀번호 일치 여부 체크
        if (name === "memberPwd" || name === "memberPwdCheck") {
            setIsPasswordMatch(
                name === "memberPwd"
                    ? value === insertMem.memberPwdCheck
                    : value === insertMem.memberPwd
            );
        }
    };

    const checkUsernameAvailability = () => {
        if (!idPattern.test(insertMem.memberId)) {
            alert('아이디는 5자 이상이어야 하며, 영문자와 숫자만 사용할 수 있습니다.');
            return;
        }

        // POST 요청을 통해 서버로 memberId 전송
        axios.post('/api/check-username', { memberId: insertMem.memberId }) // memberId를 JSON 객체로 전송
            .then(response => {
                // 서버에서 반환된 데이터로 상태 업데이트
                setIsUsernameAvailable(response.data); // response.data가 true이면 사용 가능, false이면 사용 중
            })
            .catch(error => {
                console.error("아이디 중복 체크 중 오류 발생", error);
            });
    };

    // 폼 제출 처리 및 유효성 검사
    const insertSubmit = async (e) => {
        e.preventDefault(); // 페이지 새로고침 방지

        // 아이디 중복 여부 확인
        if (isUsernameAvailable === false) {
            alert('이미 사용 중인 아이디입니다.');
            return;
        }

        // 비밀번호 일치 여부 확인
        if (!isPasswordMatch) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        // 비밀번호 유효성검사
        if (!passwordPattern.test(insertMem.memberPwd)) {
            alert('비밀번호는 9자리 이상, 영문자, 숫자, 특수문자를 포함해야 합니다.');
            return;
        }

        // 나머지 유효성 검사
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
            navigate("/login");
        } catch (error) {
            // 서버에서 반환한 에러 메시지를 받아서 처리
            if (error.response && error.response.status === 400) {
                alert(error.response.data); // 서버에서 보내온 메시지 사용
            } else {
                alert('회원가입 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div className="MemberForm_Signup_Container">
            <h2>회원가입</h2>

            <form onSubmit={insertSubmit}>
                <div className="MemberForm_Field_Container full-width">
                    <div className="MemberForm_Field">
                        <label>로그인 타입:</label>
                        <select name="loginType" value={insertMem.loginType} onChange={insertform}>
                            <option value={1}>사용자</option>
                            <option value={2}>관계자</option>
                        </select>
                    </div>
                </div>

                <div className="MemberForm_Field_Container">

                    <div className="MemberForm_Field">
                        <label>아이디</label>
                        <input
                            type="text"
                            name="memberId"
                            value={insertMem.memberId}
                            onChange={insertform}
                            onBlur={checkUsernameAvailability}
                            required
                        />
                        {isUsernameAvailable !== null && (
                            <p style={{ color: isUsernameAvailable ? 'white' : 'white' }}>
                                {isUsernameAvailable ? '사용 가능한 아이디입니다.' : '이미 사용 중인 아이디입니다.'}
                            </p>
                        )}
                    </div>

                    <div className="MemberForm_Field">
                        <label>비밀번호</label>
                        <input
                            type="password"
                            name="memberPwd"
                            value={insertMem.memberPwd}
                            onChange={insertform}
                            required
                        />
                    </div>





                </div>

                <div className="MemberForm_Field_Container">
                    <div className="MemberForm_Field">
                        <label>이름</label>
                        <input
                            type="text"
                            name="memberName"
                            value={insertMem.memberName}
                            onChange={insertform}
                            required
                        />
                    </div>

                    <div className="MemberForm_Field">
                        <label>비밀번호 확인</label>
                        <input
                            type="password"
                            name="memberPwdCheck"
                            value={insertMem.memberPwdCheck}
                            onChange={insertform}
                            required
                        />
                        {isPasswordMatch !== null && (
                            <p style={{ color: isPasswordMatch ? 'white' : 'white' }}>
                                {isPasswordMatch ? '비밀번호가 같습니다.' : '비밀번호가 일치하지 않습니다.'}
                            </p>
                        )}
                    </div>
                </div>

                <div className="MemberForm_Field_Container">

                    <div className="MemberForm_Field">
                        <label>생년월일</label>
                        <input
                            type="date"
                            name="birthDate"
                            value={insertMem.birthDate}
                            onChange={insertform}
                            required
                        />
                    </div>




                    <div className="MemberForm_Field">
                        <label>핸드폰 번호</label>
                        <input
                            type="text"
                            name="memberPhone"
                            value={insertMem.memberPhone}
                            onChange={insertform}
                            required
                        />
                    </div>
                </div>

                <div className="MemberForm_Field_Container">

                    <div className="MemberForm_Field">
                        <label>성별</label>
                        <select name="gender" value={insertMem.gender} onChange={insertform} required>
                            <option value="">성별 선택</option>
                            <option value="male">남성</option>
                            <option value="female">여성</option>
                        </select>
                    </div>


                    <div className="MemberForm_Field">
                        <label>이메일</label>
                        <input
                            type="email"
                            name="memberEmail"
                            value={insertMem.memberEmail}
                            onChange={insertform}
                            required
                        />
                    </div>


                </div>

                <button type="submit">회원가입</button>
            </form>


        </div>
    );
}

export default MemberForm;