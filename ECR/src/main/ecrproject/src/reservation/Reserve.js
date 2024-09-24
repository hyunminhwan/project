import { useLocation, useNavigate } from 'react-router-dom';
import './css/Reserve.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
//react-bootstrap
import { Button } from 'react-bootstrap';

// DatePicker 캘린더 사용
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// redux
import { useSelector } from 'react-redux';


function Reserve() {
const navigate = useNavigate();
const location = useLocation();
const { menus } = location.state;                                    // 테마 정보

const [startDate, setStartDate] = useState(null);                   // 예약날짜
const [useTime, setUseTime] = useState(null);                           // 선택한 이용 시간
const [reservedTimes, setReservedTimes] = useState([]);             // 예약된 시간대

// 사용자가 날짜를 선택하면 해당 날짜의 예약된 시간 정보를 서버로부터 받아옴
useEffect(() => {
    setUseTime(null);
    if(startDate && menus.temaNo) {
        // startDate에 하루를 더함
        const nextDay = new Date(startDate);
        nextDay.setDate(nextDay.getDate());

        // YYYY-MM-DD 형식으로 직접 포맷팅
        const year = nextDay.getFullYear();
        const month = String(nextDay.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
        const day = String(nextDay.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        
        console.log('요청한 날짜: ', formattedDate);    // 디버그용 로그
        console.log('요청할 temaNo: ', menus.temaNo);   // 디버그용 로그
        
        axios.get('/res/findReservations', {
            params: { temaNo: menus.temaNo, useDate: formattedDate }
        })
        .then(response => {
            console.log('예약된 시간대: ', response.data);
            const reserved = response.data.map(item => item.useTime.split('T')[0]); // 예약된 시간대만 가져옴
            setReservedTimes(reserved);                                             // 예약된 시간대 설정
        })
        .catch(error => {
            alert('예약정보를 가져오는데 실패했습니다');
            console.log('error msg : ', error);
        });
    }
}, [startDate]);

// 시간대 버튼을 비활성화할지 여부를 확인하는 함수
const isTimeReserved = (time) => { 
    return reservedTimes.includes(time);                                            // 시간대를 예약된 목록에 있는지 확인
}  

// 선택된 시간대인지 확인
const isSelected = (time) => {
    return useTime === time;
}

// Redux에서 로그인된 사용자 정보 가져오기
const userInfo = useSelector(state => state.loginMember.member);

// 예약 요청을 처리하는 함수
const handleReserve = () => {
    // 날짜와 시간을 선택했는지 확인
    if(!startDate) {
        alert('날짜를 선택하세요');
        return;
    }
    if(!useTime) {
        alert('시간을 선택하세요');
        return;
    }
    // 날짜를 로컬 타임존으로 변환하여 YYYY-MM-DD 형식으로 전달
    const useDateFormatted = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
    
    const reservationData = {
        userId: userInfo.memberId,                                  // loginStore.js로 로그인 되어있는 아이디 넣기
        tema: { temaNo: menus.temaNo },
        paymentStatus: '결제대기',
        reservationDate: new Date().toISOString(),                  // 오늘 날짜 0000-00-00 형식
        useDate: useDateFormatted,                                  // 선택한 날짜 0000-00-00 형식
        useTime: useTime                                            // HH:mm:ss 형식
    };

    axios.post('/res/addReserve', reservationData)
    .then(response => {
        console.log('예약 성공: ', response.data);
        alert('예약되었습니다');
        navigate('/payment', { state: { reservation: response.data, menu: menus } }); // 예약완료 페이지로 이동(+ 값 보내기)
    })
    .catch(error => {
        alert('예약 중 오류가 발생했습니다');
        console.log('예약 중 오류발생 : ', error);
    })
};

    return(
        <>
            <div className='Reserve-Container_Div'>
                <form onSubmit={e => { e.preventDefault() }}>   {/* 날짜 선택시 랜더링 방지 */}
                    <h1>예약하기</h1>
                    <table className="Reserve_Form_Table">
                        <tr>
                            <th>선택 테마</th>
                            <td>{menus.temaName}</td>
                        </tr>
                        <tr>
                            <th>지 점</th>
                            <td>{menus.cafeName}</td>
                        </tr>
                        <tr>
                            <th>선택사항</th>
                            <td id='Reserve_Table_Tema_Details'>
                                장르: #{menus.genre}&emsp;난이도: #⭐×{menus.difficulty}&emsp;인원수: #🙋‍♂️×{menus.personnel}
                            </td>
                        </tr>
                        <tr>
                            <th>사용 날짜</th>
                            <td>
                                <DatePicker
                                    selected={startDate}
                                    onChange={date => setStartDate(date)}   // 날짜 선택 시 상태 업데이트
                                    dateFormat="yyyy-MM-dd"                 // 날짜형식 0000-00-00으로 포매팅
                                    placeholderText='날짜를 선택하세요'
                                    minDate={new Date()}                    // 오늘날짜부터 선택가능
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>사용 시간</th>
                            <td>
                                <p>
                                <Button
                                    id="Reserve_Custom_Button"
                                    size="lg" 
                                    variant="dark"
                                    disabled={isTimeReserved('09:00:00')}                              // 예약된 시간은 버튼 비활성화
                                    onClick={() => { setUseTime('09:00:00'); }}           // 선택한 시간으로 값 설정
                                    style={{ background: isSelected('09:00:00') ? 'red' : isTimeReserved('09:00:00') ? 'gray' : '' }}  // 선택된 시간일 때는 빨간색, 예약된 시간일 때는 회색
                                >09:00 ~ 11:00</Button>&emsp;&emsp;
                                <Button
                                    id="Reserve_Custom_Button"
                                    size="lg"  
                                    variant="dark"
                                    disabled={isTimeReserved('11:00:00')}                              // 예약된 시간은 버튼 비활성화
                                    onClick={() => { setUseTime('11:00:00'); }}                        // 선택한 시간으로 값 설정
                                    style={{ background: isSelected('11:00:00') ? 'red' : isTimeReserved('11:00:00') ? 'gray' : '' }}  // 선택된 시간일 때는 빨간색, 예약된 시간일 때는 회색
                                >11:00 ~ 13:00</Button>
                                </p>
                                <p>
                                <Button
                                    id="Reserve_Custom_Button"
                                    size="lg" 
                                    variant="dark"
                                    disabled={isTimeReserved('13:00:00')}                              // 예약된 시간은 버튼 비활성화
                                    onClick={() => { setUseTime('13:00:00'); }}                        // 선택한 시간으로 값 설정
                                    style={{ background: isSelected('13:00:00') ? 'red' : isTimeReserved('13:00:00') ? 'gray' : '' }}  // 선택된 시간일 때는 빨간색, 예약된 시간일 때는 회색
                                >13:00 ~ 15:00</Button>&emsp;&emsp;
                                <Button
                                    id="Reserve_Custom_Button"
                                    size="lg"
                                    variant="dark"
                                    disabled={isTimeReserved('15:00:00')}                              // 예약된 시간은 버튼 비활성화
                                    onClick={() => { setUseTime('15:00:00'); }}                        // 선택한 시간으로 값 설정
                                    style={{ background: isSelected('15:00:00') ? 'red' : isTimeReserved('15:00:00') ? 'gray' : '' }}  // 선택된 시간일 때는 빨간색, 예약된 시간일 때는 회색
                                >15:00 ~ 17:00</Button>
                                </p> 
                                <p>
                                <Button
                                    id="Reserve_Custom_Button"
                                    size='lg'  
                                    variant="dark"
                                    disabled={isTimeReserved('17:00:00')}                              // 예약된 시간은 버튼 비활성화
                                    onClick={() => { setUseTime('17:00:00'); }}                        // 선택한 시간으로 값 설정
                                    style={{ background: isSelected('17:00:00') ? 'red' : isTimeReserved('17:00:00') ? 'gray' : '' }}  // 선택된 시간일 때는 빨간색, 예약된 시간일 때는 회색
                                >17:00 ~ 19:00</Button>&emsp;&emsp;
                                <Button
                                    id="Reserve_Custom_Button"
                                    size='lg' 
                                    variant="dark"
                                    disabled={isTimeReserved('19:00:00')}                              // 예약된 시간은 버튼 비활성화
                                    onClick={() => { setUseTime('19:00:00'); }}                        // 선택한 시간으로 값 설정
                                    style={{ background: isSelected('19:00:00') ? 'red' : isTimeReserved('19:00:00') ? 'gray' : '' }}  // 선택된 시간일 때는 빨간색, 예약된 시간일 때는 회색
                                >19:00 ~ 21:00</Button>
                                </p>     
                            </td>
                        </tr>
                        <tr>
                            <th>이용요금</th>
                                <td>
                                    <b>총 {menus.price}원 ※ 예약금 {menus.price*0.5}원</b>
                                </td>
                        </tr>
                        <tr>
                            <td colSpan='2'>
                                <p><input type="submit" value='예약하기' onClick={ handleReserve }/></p>
                                <p><input type="button" value='취소하기' onClick={() => { navigate('/') }} /></p>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
        </>
    )
}

export default Reserve;