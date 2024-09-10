import { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import './Admin.css';

import axios from 'axios';

// 각 회원정보 컴포넌트
import ClientList from './Component/ClientList';            // 일반회원 컴포넌트 
import CompanyList from './Component/CompanyList';          // 업체회원 컴포넌트


function MembershipManagement() {
    const [mode, setMode] = useState('');                   // 기본값 설정(최초 컴포넌트 표시 안함)
    const [data, setData] = useState([]);                   // 데이터 저장할 상태

    // mode가 변경될 때 마다 데이터를 가져오는 함수
    useEffect(() => {
        if(mode) {
            let memberType = mode === 'client' ? 1 : 2;         // 일반회원은 1, 업체회원은 2
            axios.get(`/mem/members?memberType=${memberType}`)
                .then(response => {
                    setData(response.data);                     // 데이터 설정
                })
                .catch(error => {
                    alert('데이터 불러오기 실패');
                    console.log('데이터 불러오기 실패 : ', error);
                });
        }
    }, [mode]);                                                 // mode 변경마다 useEffect 실행

    let content = null;                                         // ClientList, CompanyList 담을 변수

    if(mode === 'client') {
        content = <ClientList data={data} />
        console.log({data});
    } else if(mode === 'company') {
        content = <CompanyList data={data} />
    }

    return(
        <>
            <Tabs
                defaultActiveKey=""                         // 기본값 없음(빈 페이지 표시)
                id="uncontrolled-tab-example"
                className="mb-3"
                onSelect={k => { setMode(k) }}              // 탭 선택 시 mode 설정
            >
                <Tab eventKey="client" title="일반회원" />
                <Tab eventKey="company" title="업체회원" />
            </Tabs>
            {content}                                       {/* 선택한 탭에 따라 담기는 컴포넌트가 다름 */}
        </>
    )
}

export default MembershipManagement;