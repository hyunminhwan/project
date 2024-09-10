import React from 'react';

function ClientList({ data }) {                               // memberType이 1일 때 표시할 컴포넌트
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
                    <th>회원관리</th>
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
                        <td><input type='button' value='관리'></input></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default ClientList;