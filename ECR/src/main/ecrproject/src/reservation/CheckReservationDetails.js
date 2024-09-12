import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './Reservation.css';

import axios from "axios";


// react DatePicker 사용하기
// npm install react-datepicker --save 
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";


function CheckReservationDetails() {
    const [dateRange, setDateRange] = useState([null, null]);       // 날짜 범위
    const [startDate, endDate] = dateRange;                         // startDate, endDate 가져오기
    
    const [reservationCode, setReservationCode] = useState("");     // 입력한 예약번호
    const [reservations, setReservations] = useState([]);           // 조회한 예약 리스트

    const [isModalOpen, setIsModalOpen] = useState(false);          // 모달 상태
    const [selectedReservation, setSelectedReservation] = useState(null);   // 선택한 예약 데이터

    // 날짜를 통한 예약 조회
    const searchByDate = () => {
        if(!startDate || !endDate) {
            alert('날짜를 선택하세요');
            return ;
        }
        axios.get('/res/findDate', {
            params : {
                startDate : startDate.toISOString().split('T')[0],  // toISOString()는 YYYY-MM-ddTHH:mm:ss...로 반환됨 
                endDate : endDate.toISOString().split('T')[0]       // split('T')[0]를 통해 ddTHH에서 T를 기준으로 잘라 날짜 형식만 가져옴
            }
        })
        .then(response => {
            setReservations(response.data);                         // 예약 정보 설정
        })
        .catch(() => {
            alert('날짜를 다시 선택하세요');
        });
    };

    // 예약 번호로 조회
    const searchByCode = () => {
        if(!reservationCode) {
            alert('예약번호를 입력하세요');
            return ;
        }
        axios.get('/res/findCode', { params : { reservationCode } })
            .then(response => {
                setReservations(response.data);                     // 예약 정보 설정
            })
            .catch(() => {
                alert('예약번호를 다시 입력하세요');
            });
    };

    // 취소신청 모달 열기
    const handleCancelClick = (reservation) => {
        setSelectedReservation(reservation);                        // 선택한 예약 데이터 설정
        setIsModalOpen(true);                                       // 모달 상태 설정
    }
    
    // 모달 "예" 클릭시 함수
    const handleConfirmCancel = () => {
        axios.post('/res/cancel', {reservationCode : selectedReservation.reservationCode})
            .then(response => {
                // 취소신청 성공햇을 때 paymentState를 '취소신청'로 변경
                const updatedReservations = reservations.map(reserve =>
                    reserve.reservationCode === selectedReservation.reservationCode ?
                    {...reserve, paymentState: '취소신청'} :
                    reserve
                );
                setReservations(updatedReservations);               // 예약 상태 업데이트
                setIsModalOpen(false);                              // 모달 닫기
            })
    }

    // 모달 컴포넌트
    const ConfirmationModal = () => {
        isModalOpen && (
            <div className="modal">
                <div className="modal-content">
                    <p>취소신청을 하시겠습니까?</p>
                    <button onClick={ handleConfirmCancel }>예</button>
                    <button onClick={() => { setIsModalOpen(false) }}>아니오</button>
                </div>
            </div>
        )
    }

    return(
        <>
            {/* 모달 컴포넌트 */}
            <ConfirmationModal />

            <article>
                <div>
                    <table className="CheckReservationDetails">
                        <tbody>
                            <tr>
                                <td>
                                    <p>📅날짜로 찾기</p>
                                    {/*https://reactdatepicker.com/->Date Range with Portal*/}
                                    {/* 날짜지정 컴포넌트 */}
                                    <DatePicker 
                                        selectsRange={true}
                                        startDate={startDate}
                                        endDate={endDate}
                                        onChange={update => {
                                            setDateRange(update);                   // 지정날짜 상태 수정
                                        }}
                                        withPortal
                                        dateFormat="yyyy-mm-dd"                     // 날짜 형식
                                        placeholderText="날짜를 지정하세요"
                                    />
                                    <button onClick={ searchByDate }>검색</button>
                                </td>
                                <td>
                                    <p>🖊️예약번호로 찾기</p>
                                    <input 
                                        name='reservationCode' 
                                        value={ reservationCode } 
                                        onChange={e => {
                                            setReservationCode(e.target.value);     // 입력한 예약번호 상태수정
                                        }}
                                        placeholder='예약번호 입력'
                                    />
                                    <button onClick={ searchByCode }>검색</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </article>
            
            <br/>

            <article>
                <table className="ResultList">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>지점</th>
                            <th>테마명</th>
                            <th>날짜</th>
                            <th>시간</th>
                            <th>상태</th>
                            <th>취소신청</th>
                        </tr>
                    </thead>
                    <tbody>
                        { reservations.length === 0 ? (
                            <tr>
                                <td colSpan='7'>조회된 내역이 없습니다</td>
                            </tr>
                        ) : (
                            reservations.map((reserve, index) => (
                                <tr key={reserve.reservationCode}>
                                    <td>{index + 1}</td>
                                    <td>{reserve.cafeName}</td>
                                    <td>{reserve.temaName}</td>
                                    <td>{reserve.useDate}</td>
                                    <td>{reserve.useTime}</td>
                                    <td>{reserve.paymentState}</td>
                                    <td>
                                        {reserve.paymentState === '취소신청' ? 
                                            (<span>취소신청완료</span>) : 
                                            (<button onClick={() => {handleCancelClick(reserve)}}>
                                                취소하기
                                            </button>)}
                                        
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </article>
        </>
    )
}

export default CheckReservationDetails;