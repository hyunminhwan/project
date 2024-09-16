import axios from 'axios';
import React from 'react';

function ClientList({ data, refreshData }) {                               // loginType이 1인 데이터를 표시할 컴포넌트

    // 회원삭제 클릭 시 호출된 메서드
    const deleteMember = (memberId) => {
        if(window.confirm("회원을 삭제하시겠습니까?")) {
            axios.delete(`/api/members/${memberId}`)
                .then(() => {
                    alert('회원이 삭제되었습니다');
                    refreshData();
                })
                .catch(error => {
                    alert('회원 삭제 중 오류가 발생했습니다');
                    console.log('회원 삭제 오류 : ', error);
                });
        }
    };

    return(
        <table className='clientList'>
            <thead>
                <tr>
                    <th>유저아이디</th>
                    <th>이름</th>
                    <th>전화번호</th>
                    <th>이메일</th>
                    <th>가입일</th>
                    <th>비밀번호 변경 날짜</th>
                    <th>회원삭제</th>
                </tr>
            </thead>
            <tbody>
                {data.map ((member,index) => (
                    <tr key={index}>
                        <td>{member.memberId}</td>
                        <td>{member.memberName}</td>
                        <td>{member.memberPhone}</td>
                        <td>{member.memberEmail}</td>
                        <td>{member.memberCreateDate}</td>
                        <td>{member.lastPwdDate}</td>
                        <td>
                            <button onClick={() => deleteMember(member.memberId)}>회원삭제</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default ClientList;