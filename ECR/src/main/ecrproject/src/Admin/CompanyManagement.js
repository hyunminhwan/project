import { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import './Admin.css';

import axios from 'axios';

// 각 회원정보 컴포넌트
import CompanyList from './Component/CompanyList';              // 업체회원 컴포넌트
import PerformanceList from './Component/PerformanceList';      // 실적관리 컴포넌트


function CompanyManagement() {
    const [mode, setMode] = useState('');                       // 기본값 설정(최초 컴포넌트 표시 안함)
    const [data, setData] = useState([]);                       // 데이터 저장할 상태

    // mode가 변경될 때 마다 데이터를 가져오는 함수
    useEffect(() => {
        if(mode === 'vendors') {
            axios.get(`/api/members?loginType=2`)               // 업체회원 데이터
                .then(response => {
                    setData(response.data);                     // 데이터 설정
                })
                .catch(error => {
                    alert('데이터 불러오기 실패');
                    console.log('데이터 불러오기 실패 : ', error);
                });
        }
    }, [mode]);                                                 // mode 변경마다 useEffect 실행

    let content = null;                                         // CompanyList, PerformanceList 담을 변수

    if(mode === 'vendors') {
        content = <CompanyList data={data} />                   // 업체관리 컴포넌트
    } else if(mode === 'performance') {
        content = <PerformanceList data={data} />               // 실적관리 컴포넌트
    }

    return(
        <>
            <Tabs
                defaultActiveKey=""                         // 기본값 없음(빈 페이지 표시)
                id="uncontrolled-tab-example"
                className="mb-3"
                onSelect={k => { setMode(k) }}              // 탭 선택 시 mode 설정
            >
                <Tab eventKey="vendors" title="업체관리" />
                <Tab eventKey="performance" title="실적관리" />
            </Tabs>
            {content}                                       {/* 선택한 탭에 따라 담기는 컴포넌트가 다름 */}
        </>
    )
}

export default CompanyManagement;