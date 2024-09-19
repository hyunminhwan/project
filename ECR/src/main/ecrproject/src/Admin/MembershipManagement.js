import { useEffect, useState } from 'react';

import './Admin.css';

import axios from 'axios';

// 각 회원정보 컴포넌트
import ClientList from './Component/ClientList';                // 일반회원 컴포넌트 

function MembershipManagement() {
    const [data, setData] = useState([]);                       // 데이터 저장할 상태

    // 회원 데이터를 가져오는 함수(리렌더링 용)
    const refreshData = () => {
            axios.get(`/api/members?loginType=1`)               // 일반회원 데이터
                .then(response => {
                    setData(response.data);                     // 데이터 설정
                })
                .catch(error => {
                    alert('데이터 불러오기 실패');
                    console.log('데이터 불러오기 실패 : ', error);
                });
    };

    // mode가 변경될 때 마다 데이터를 가져오는 함수
    useEffect(() => {
        refreshData();                                          // 컴포넌트 로드 시 데이터 가져오기
    }, []);                                                

    return(
        <>
            <ClientList mode='members' data={data} refreshData={refreshData} />                                       {/* 선택한 탭에 따라 담기는 컴포넌트가 다름 */}
        </>
    )
}

export default MembershipManagement;