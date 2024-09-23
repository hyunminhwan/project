import axios from 'axios';
import React, { useEffect, useState } from 'react';

// css import
import '../css/CompanyList.css';

function CompanyList({ data, refreshData }) {                                  // loginType이 2인 데이터를 표시할 컴포넌트
    const [members, setMembers] = useState([]);   // 조회한 예약 리스트
    const [page, setPage] = useState(1);                    // 페이지 번호(더 보기 기능)
    const [hasMore, setHasMore] = useState(true);           // 더 불러올 데이터 여부
    const [isRefreshing, setIsRefreshing] = useState(false);// 데이터 리렌더링 여부 확인

    // 페이지가 처음 로드될 때 전체 예약 데이터를 불러오는 useEffect
    useEffect(() => {
        fetchMembers();  // 페이지 로드 시 첫 페이지 전체 조회
    }, []);  // 빈 배열을 사용해 컴포넌트가 처음 로드될 때만 실행

    // 전체 회원 데이터를 불러오는 함수
    const fetchMembers = (isLoadMore = false) => {
        axios.get('/api/findClientAll', {
            params: {
                loginType: 2,
                page: isLoadMore ? page : 1,
                size: 20,
            }
        })
        .then(response => {
            const fetchedData = response.data;
            if (isLoadMore) {
                // 기존 데이터에 추가
                setMembers(prev => [...prev, ...fetchedData]);
            } else {
                // 새 조회 결과 덮어쓰기
                setMembers(fetchedData);
            }
                setHasMore(fetchedData.length >= 20);
                setIsRefreshing(false); // 리렌더링 완료
        })
        .catch(error => {
            alert('회원정보를 불러오는데 실패했습니다');
            console.log('일반회원 조회 오류: ', error);
            setIsRefreshing(false);
        });
    };

    // 페이지 번호가 변경될 때 추가 회원조회
    useEffect(() => {
        if(page > 1) {
        fetchMembers(true);
        }
    }, [page]);

    // 회원삭제 클릭 시 호출된 메서드
    const deleteMember = (memberId) => {
        if(window.confirm("회원을 삭제하시겠습니까?")) {
            axios.delete(`/api/members/${memberId}`)
                .then(() => {
                    alert('회원이 삭제되었습니다');
                    setPage(1);     // 삭제 후 페이지 초기화
                    setIsRefreshing(true);  // 데이터 리렌더링 시작
                    fetchMembers(); // 삭제 후 새로고침을 통해 최신 데이터 불러오기
                })
                .catch(error => {
                    alert('회원 삭제 중 오류가 발생했습니다');
                    console.log('회원 삭제 오류 : ', error);
                });
        }
    };
    // {userInfo.memberPhone} 연락처 형식으로 변환
    const formatPhoneNumber = (phoneNumeber) => {
        const str = '0' + phoneNumeber;
        return `${str.slice(0,3)}-${str.slice(3,7)}-${str.slice(7)}`;
    }
    // member###Date 형식포맷 함수
    const formatDate = (date) => {
        return date.slice(0,10);
    }

    return(
        <article>
            <div className='CompanyList_Title_Div'>
                <h1>관계자 회원 관리</h1>
            </div>
            <div className='CompanyList_List_Div'>
                <table className='CompanyList_List_Table'>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>아이디</th>
                            <th>이름</th>
                            <th>성별</th>
                            <th>생년월일</th>
                            <th>전화번호</th>
                            <th>이메일</th>
                            <th>가입일</th>
                            <th>비밀번호 변경 날짜</th>
                            <th>회원삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{member.memberId}</td>
                                <td>{member.memberName}</td>
                                <td>{member.gender}</td>
                                <td>{member.birthDate}</td>
                                <td>{formatPhoneNumber(member.memberPhone)}</td>
                                <td>{member.memberEmail}</td>
                                <td>{formatDate(member.memberCreateDate)}</td>
                                <td>{formatDate(member.memberUpdateDate)}</td>
                                <td>
                                    <button onClick={() => deleteMember(member.memberId)}>회원삭제</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* '더 보기' 버튼 */}
                {hasMore && !isRefreshing && (
                    <button className='CompanyList_MoreButton' onClick={() => setPage(prevPage => prevPage + 1)}>more</button>
                )}
            </div>
        </article>
    )
}
export default CompanyList;