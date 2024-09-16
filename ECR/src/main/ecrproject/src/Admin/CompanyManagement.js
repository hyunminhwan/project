import { useEffect, useState } from 'react';

import './Admin.css';

import axios from 'axios';

// 각 회원정보 컴포넌트
import CompanyList from './Component/CompanyList';              // 업체회원 컴포넌트

function CompanyManagement() {
    const [data, setData] = useState([]);                       // 데이터 저장할 상태

    const refreshData = () => {
        axios.get(`/api/members?loginType=2`)                   // 업체회원 데이터
        .then(response => { 
            setData(response.data);                             // 데이터 설정
        })
        .catch(error => {
            alert('데이터 불러오기 실패');
            console.log('데이터 불러오기 실패 : ', error);
        });
    }

    useEffect(() => {
        refreshData();
    }, []);

    return(
        <>
            <CompanyList data={data} refreshData={refreshData} />
        </>
    )
}

export default CompanyManagement;