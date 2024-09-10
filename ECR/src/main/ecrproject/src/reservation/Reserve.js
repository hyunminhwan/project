import { useLocation, useNavigate } from 'react-router-dom';
import './Reservation.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
//react-bootstrap
import { Button } from 'react-bootstrap';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Reserve() {
const navigate = useNavigate();
const location = useLocation();
const { menu } = location.state;                                    // 테마 정보

const [startDate, setStartDate] = useState(null);                   // 예약날짜
const [useTime, setUseTime] = useState();                           // 선택한 이용 시간
const [userName, setUserName] = useState();                         // 사용자 이름
const [userPhone, setUserPhone] = useState();                       // 사용자 전화번호
const [reservedTimes, setReservedTimes] = useState([]);             // 예약된 시간대

// 사용자가 날짜를 선택하면 해당 날짜의 예약된 시간 정보를 서버로부터 받아옴
useEffect(() => {
    if(startDate) {
        axios.get('/res/findReservations', {
            params: { temaNo: menu.temaNo, useDate: startDate.toISOString().split('T')[0] }
        })
        .then(response => {
            setReservedTimes(response.data);                        // 예약된 시간대 설정
        })
        .catch(error => {
            alert('예약정보를 가져오는데 실패했습니다');
            console.log('error msg : ', error);
        });
    }
}, [startDate]);

// 시간대 버튼을 비활성화할지 여부를 확인하는 함수
const isTimeReserved = (time => { reservedTimes.includes(time); })  // 이미 예약된 시간대인지 여부 확인

// 예약 요청을 처리하는 함수
const handleReserve = () => {
    axios.post('/res/addReserve', {
        userId: 1,                                                  // 예시! 임의 값 사용
        temaNo: menu.temaNo,
        paymentStatus: 'N',
        reservationDate: new Date().toISOString().split('T')[0],    // 오늘 날짜 0000-00-00 형식
        useDate: startDate.toISOString().split('T')[0],             // 선택한 날짜 0000-00-00 형식
        useTime: useTime
    })
    .then(response => {
        alert('예약되었습니다');
        navigate('/payment', { state: { response } });              // 예약완료 페이지로 이동(+ 값 보내기)
    })
    .catch(error => {
        alert('다시 확인해주세요');
        console.log('예약 중 오류발생 : ', error);
    })
};

    return(
        <>
            <form onSubmit={e => { e.preventDefault() }}>           {/* 날짜 선택시 랜더링 방지 */}
                <table className="reserveForm">
                    <tr>
                        <th>선택 테마</th>
                        <td>{menu.temaName}</td>
                    </tr>
                    <tr>
                        <th>선택사항</th>
                        <td>
                            장르:#{menu.genre}&ensp;지점:#{menu.cafeName}&ensp;난이도:#{menu.difficulty}&ensp;인원수:#{menu.personnel}
                        </td>
                    </tr>
                    <tr>
                        <th>예약 날짜</th>
                        <td>
                            <DatePicker
                                showIcon
                                selected={startDate}
                                onChange={(date) => setStartDate(date)} // 날짜 선택 시 상태 업데이트
                                dateFormat="yyyy-MM-dd"                 // 날짜형식 0000-00-00으로 포매팅
                                placeholder='날짜를 선택하세요'
                                minDate={new Date()}                    // 오늘날짜부터 선택가능
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>이용 시간</th>
                        <td>
                            <p>
                            <Button 
                                variant="primary"
                                disabled={isTimeReserved('09:00 ~ 11:00')}                              // 예약된 시간은 버튼 비활성화
                                onClick={() => {setUseTime('09:00 ~ 11:00')}}                           // 선택한 시간으로 값 설정
                                style={{ background: isTimeReserved('09:00 ~ 11:00') ? 'gray' : '' }}   // 예약되어 있는 시간 스타일 변경
                            >09:00 ~ 11:00</Button>&ensp;
                            <Button 
                                variant="primary"
                                disabled={isTimeReserved('11:00 ~ 13:00')}                              // 예약된 시간은 버튼 비활성화
                                onClick={() => {setUseTime('11:00 ~ 13:00')}}                           // 선택한 시간으로 값 설정
                                style={{ background: isTimeReserved('11:00 ~ 13:00') ? 'gray' : '' }}   // 예약되어 있는 시간 스타일 변경
                            >11:00 ~ 13:00</Button>
                            </p>
                            <p>
                            <Button 
                                variant="primary"
                                disabled={isTimeReserved('13:00 ~ 15:00')}                              // 예약된 시간은 버튼 비활성화
                                onClick={() => {setUseTime('13:00 ~ 15:00')}}                           // 선택한 시간으로 값 설정
                                style={{ background: isTimeReserved('13:00 ~ 15:00') ? 'gray' : '' }}   // 예약되어 있는 시간 스타일 변경
                            >13:00 ~ 15:00</Button>&ensp;
                            <Button 
                                variant="primary"
                                disabled={isTimeReserved('15:00 ~ 17:00')}                              // 예약된 시간은 버튼 비활성화
                                onClick={() => {setUseTime('15:00 ~ 17:00')}}                           // 선택한 시간으로 값 설정
                                style={{ background: isTimeReserved('15:00 ~ 17:00') ? 'gray' : '' }}   // 예약되어 있는 시간 스타일 변경
                            >15:00 ~ 17:00</Button>
                            </p> 
                            <p>
                            <Button 
                                variant="primary"
                                disabled={isTimeReserved('17:00 ~ 19:00')}                              // 예약된 시간은 버튼 비활성화
                                onClick={() => {setUseTime('17:00 ~ 19:00')}}                           // 선택한 시간으로 값 설정
                                style={{ background: isTimeReserved('17:00 ~ 19:00') ? 'gray' : '' }}   // 예약되어 있는 시간 스타일 변경
                            >17:00 ~ 19:00</Button>&ensp;
                            <Button 
                                variant="primary"
                                disabled={isTimeReserved('19:00 ~ 21:00')}                              // 예약된 시간은 버튼 비활성화
                                onClick={() => {setUseTime('19:00 ~ 21:00')}}                           // 선택한 시간으로 값 설정
                                style={{ background: isTimeReserved('19:00 ~ 21:00') ? 'gray' : '' }}   // 예약되어 있는 시간 스타일 변경
                            >19:00 ~ 21:00</Button>
                            </p>     
                        </td>
                    </tr>
                    <tr>
                        <th>이름*</th>
                        <input name={userName} onChange={e => {setUserName(e.target.value)}} placeholder="예약자 성함" required></input>
                    </tr>
                    <tr>
                        <th>이용요금</th>
                        <td>
                            {menu.price}원 <b>※ 예약금 {menu.price*0.5}원 국민은행 00000000000 / 예금주:OOO</b>
                        </td>
                        <th></th>
                    </tr>
                    <tr>
                        <th>연락처*</th>
                        <input name={userPhone} onChange={e => {setUserPhone(e.target.value)}} placeholder="010-1234-5678" required></input>
                    </tr>
                    <tr>
                        <td colSpan='2'>
                            <input type="submit" value='예약하기' onClick={ handleReserve }/>&emsp;
                            <input type="button" value='취소하기' onClick={() => { navigate('/') }} />
                        </td>
                    </tr>
                </table>
            </form>
        </>
    )
}

export default Reserve;