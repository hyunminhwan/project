import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

// react-DatePicker api
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './css/CheckReservationDetails.css';


// react DatePicker 사용하기
// npm install react-datepicker --save 
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

function CheckReservationDetails() {
    // 날짜로 조회 변수
    const [dateRange, setDateRange] = useState([null, null]);       // 날짜 범위
    const [startDate, endDate] = dateRange;                         // startDate, endDate 가져오기
    // 예약코드로 조회 변수
    const [reservationCode, setReservationCode] = useState("");     // 입력한 예약번호
    const [reservations, setReservations] = useState([]);           // 조회한 예약 리스트
    // 전체조회 페이지 처리
    const [page, setPage] = useState(1);                    // 페이지 번호(더 보기 기능)
    const [hasMore, setHasMore] = useState(true);           // 더 불러올 데이터 여부

    // Redux에서 로그인된 사용자 정보 가져오기
    const userInfo = useSelector(state => state.loginMember.member);

    // 로그인 유저의 전체 예약 데이터 가져오기
    const userReservationAll = (isLoadMore = false) => {
        axios.get('/res/findUserReserveAll', {
            params: {
                userId: userInfo.memberId,
                page,
                size: 20,                                   // 20개씩 불러오기
            }
        })
        .then(response => {
            // 데이터를 배열로 변환 (예기치 않게 단일 객체로 올 경우 대비)
            const formattedData = Array.isArray(response.data) ? response.data : [response.data];
            console.log(formattedData);
            if (isLoadMore) {
                // 기존 데이터에 추가
                setReservations(prev => [...prev, ...formattedData]); // 기존 데이터에 추가
            } else {
                // 새 조회 결과 덮어쓰기
                setReservations(formattedData);                       // 새 데이터로 덮어쓰기
            }
                setHasMore(formattedData.length >= 20);                                             
                console.log(formattedData); 
            })
        .catch(error => {
            console.error('전체 조회 오류: ', error);
        });
    };

    // 컴포넌트 로드시 전체 예약 조회
    useEffect(() => {
        userReservationAll();  // 페이지 로드 시 첫 페이지 전체 조회
    }, []);  // 빈 배열을 사용해 컴포넌트가 처음 로드될 때만 실행

    // 페이지 번호가 변경될 때 추가 예약 조회
    useEffect(() => {
        if(page === 1) return;
        userReservationAll(true);
    }, [page]);

    // 날짜를 통한 예약 조회
    const searchByDate = () => {
        if(!startDate || !endDate) {
            alert('날짜를 선택하세요');
            return ;
        }
        
        // 종료일에 하루 더하기
        const adjustedEndDate = new Date(endDate);
        adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);
        
        console.log('요청한 시작날짜: ', startDate);    // 디버그용 로그
        console.log('요청한 끝날짜: ', adjustedEndDate);

        setReservations([]);
        setPage(1);
        setHasMore(false);

        axios.get('/res/findDate', {
            params : {
                startDate : startDate.toISOString().split('T')[0],  // toISOString()는 YYYY-MM-ddTHH:mm:ss...로 반환됨 
                endDate : adjustedEndDate.toISOString().split('T')[0],      // split('T')[0]를 통해 ddTHH에서 T를 기준으로 잘라 날짜 형식만 가져옴
                userId: userInfo.memberId                           // Redux에서 가져온 user 정보
            }
        })
        .then(response => {
            // 데이터를 배열로 변환 (예기치 않게 단일 객체로 올 경우 대비)
            const formattedData = Array.isArray(response.data) ? response.data : [response.data];
            setReservations(formattedData);                         // 예약 정보 설정
            setHasMore(formattedData.length >= 20);
        })
        .catch(error => {
            console.log('날짜별 조회 error: ', error)
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
                // 데이터를 배열로 변환 (예기치 않게 단일 객체로 올 경우 대비)
                const formattedData = Array.isArray(response.data) ? response.data : [response.data];

                // 데이터가 배열이 아니면 배열로 변환(searchByCode로 인해 배열로 출력하도록 코드를 짜서 배열로 만드는 부분임)
                if(Array.isArray(formattedData)) {
                    setReservations(formattedData);  // 배열이면 그대로 설정
                } else {
                    setReservations([formattedData]);    // 단일 객체이면 배열로 감싸서 설정
                }
            })
            .catch(error => {
                alert('예약번호를 다시 입력하세요');
                console.log('searchByCode error :', error);
            })
    };

    // 취소신청 확인창 열기
    const handleCancelClick = (reservation) => {
        if(window.confirm("예약을 취소하시겠습니까?")) {
            handleConfirmCancel(reservation);
        }
    }
    
    // window.confirm "예" 클릭시 함수
    const handleConfirmCancel = (reservation) => {
        axios.post('/res/cancel', {reservationCode : reservation.reservationCode})
            .then(response => {
                // 취소신청 성공햇을 때 paymentStatus를 '취소신청'로 변경
                const updatedReservations = reservations.map(reserve =>
                    reserve.reservationCode === reservation.reservationCode ?
                    {...reserve, paymentStatus: '취소신청'} :
                    reserve
                );
                setReservations(updatedReservations);
            })
            .catch(error => {
                alert('취소신청 중 오류가 발생했습니다');
                console.log('취소신청 에러: ', error.response);
            })
    }

    // {reservation.useTime} 이용시간 포맷 함수
    const formatStartUseTime = (time) => {
        return time.slice(0,5);
    }


    return(
        <>

            <article>
                <div className="CRD_Find_Div">
                    <table className="CRD_Find_Table">
                        <thead>
                            <tr>
                                <th>🧾전체조회</th>
                                <th colSpan={2}>📅날짜별 조회</th>
                                <th colSpan={2}>🖊️예약번호로 조회</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td> {/* 예약 전체 조회 버튼 */}
                                    <button type="button" onClick={() => userReservationAll(false)}>조회</button>
                                </td>

                                {/*https://reactdatepicker.com/->Date Range with Portal*/}
                                {/* 날짜지정 컴포넌트 */}
                                <td>
                                    <DatePicker 
                                        selectsRange={true}
                                        startDate={startDate}
                                        endDate={endDate}
                                        onChange={update => {
                                            setDateRange(update);                   // 지정날짜 상태 수정
                                        }}
                                        withPortal
                                        dateFormat="yyyy-MM-dd"                     // 날짜 형식
                                        placeholderText="날짜를 지정하세요"
                                    />
                                </td>
                                <td>
                                    <button type="button" onClick={ searchByDate }>조회</button>
                                </td>
                                
                                {/* 예약번호로 조회 */}
                                <td>
                                    <input 
                                        name='reservationCode' 
                                        value={ reservationCode } 
                                        onChange={e => {
                                            setReservationCode(e.target.value);     // 입력한 예약번호 상태수정
                                        }}
                                        placeholder='예약번호 입력'
                                    />
                                </td>
                                <td>
                                    <button type="button" onClick={ searchByCode }>조회</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            
            
            <br/>

                <div className="CRD_ResultList_Div">
                    <table className="CRD_ResultList_Table">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>예약번호</th>
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
                                        <td>{reserve.reservationCode}</td>
                                        <td>{reserve.tema?.cafeName}</td>
                                        <td>{reserve.tema?.temaName}</td>
                                        <td>{reserve.useDate}</td>
                                        <td>{`${formatStartUseTime(reserve.useTime)} ~ ${parseInt(reserve.useTime)+2}:00`}</td>
                                        <td>{reserve.paymentStatus}</td>
                                        <td>
                                            {reserve.paymentStatus === '취소신청' ? 
                                                (<span>취소신청완료</span>) : 
                                                reserve.paymentStatus === '취소완료' ?
                                                (<button disabled>취소하기</button>) :
                                                (<button onClick={() => {handleCancelClick(reserve)}}>
                                                    취소하기
                                                </button>)}
                                            
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {/* '더 보기' 버튼 */}
                {hasMore && (
                    <button className="CRD_MoreButton" onClick={() => setPage(prevPage => prevPage + 1)}>more</button>
                )}
            </article>
        </>
    )
}

export default CheckReservationDetails;