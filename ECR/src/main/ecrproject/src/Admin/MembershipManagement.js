import { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import './Admin.css';

import axios from 'axios';

// 각 회원정보 컴포넌트
import ClientList from './Component/ClientList';                // 일반회원 컴포넌트 
import ReservationList from './Component/ReservationList';      // 예약관리 컴포넌트

function MembershipManagement() {
    const [mode, setMode] = useState('');                       // 기본값 설정(최초 컴포넌트 표시 안함)
    const [data, setData] = useState([]);                       // 데이터 저장할 상태

    // 회원 데이터를 가져오는 함수(리렌더링 용)
    const refreshData = () => {
        if(mode === 'members') {
            axios.get(`/api/members?loginType=1`)               // 일반회원 데이터
                .then(response => {
                    setData(response.data);                     // 데이터 설정
                })
                .catch(error => {
                    alert('데이터 불러오기 실패');
                    console.log('데이터 불러오기 실패 : ', error);
                });
        }
    };

    // mode가 변경될 때 마다 데이터를 가져오는 함수
    useEffect(() => {
        refreshData();
        if( mode === 'reservations') {
            axios.get('/res/adminFindAll', {                    // 예약관리 데이터 불러오기
                params: {
                    page: 1,                                    // 첫 페이지 로드
                    size: 20,                                   // 20개씩 불러오기
                }
            })
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                alert('예약 데이터를 불러오지 못했습니다');
                console.error('예약 데이터 불러오기 실패 : ', error);
            });
        }
    }, [mode]);                                                 // mode 변경마다 useEffect 실행

    let content = null;                                         // ClientList, ReservationList 담을 변수

    if(mode === 'members') {
        content = <ClientList data={data} />                    // 회원관리 컴포넌트
    } else if(mode === 'reservations') {
        content = <ReservationList data={data} />               // 예약관리 컴포넌트
    }

    return(
        <>
            <Tabs
                defaultActiveKey=""                         // 기본값 없음(빈 페이지 표시)
                id="uncontrolled-tab-example"
                className="mb-3"
                onSelect={k => { setMode(k) }}              // 탭 선택 시 mode 설정
            >
                <Tab eventKey="members" title="회원관리" />
                <Tab eventKey="reservations" title="예약관리" />
            </Tabs>
            {content}                                       {/* 선택한 탭에 따라 담기는 컴포넌트가 다름 */}
        </>
    )
}

export default MembershipManagement;