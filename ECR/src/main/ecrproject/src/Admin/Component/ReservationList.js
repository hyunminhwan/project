import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/ReservationList.css";

function ReservationList() {
    // 날짜로 조회 변수
    const [dateRange, setDateRange] = useState([null, null]);       // 날짜 범위
    const [startDate, endDate] = dateRange;                         // startDate, endDate 가져오기

    const [paymentStatus, setPaymentStatus] = useState(""); // 결제 상태

    const [reservations, setReservations] = useState([]);   // 조회한 예약 리스트
    const [page, setPage] = useState(1);                    // 페이지 번호(더 보기 기능)
    const [hasMore, setHasMore] = useState(true);           // 더 불러올 데이터 여부

    // 페이지가 처음 로드될 때 전체 예약 데이터를 불러오는 useEffect
    useEffect(() => {
        fetchReservations();  // 페이지 로드 시 첫 페이지 전체 조회
    }, []);  // 빈 배열을 사용해 컴포넌트가 처음 로드될 때만 실행

    // 전체 예약 데이터를 불러오는 함수
    const fetchReservations = (isLoadMore = false) => {
        axios.get('/res/adminFindAll', {
            params: {
                page,
                size: 20,                                   // 20개씩 불러오기
            }
        })
            .then(response => {
                const fetchedData = response.data;
                if (isLoadMore) {
                    // 기존 데이터에 추가
                    setReservations(prev => [...prev, ...fetchedData]); // 기존 데이터에 추가
                } else {
                    // 새 조회 결과 덮어쓰기
                    setReservations(fetchedData);                       // 새 데이터로 덮어쓰기
                }
                setHasMore(fetchedData.length >= 20);
            })
            .catch(error => {
                console.error('전체 조회 오류: ', error);
            });
    };

    // 날짜를 통한 예약 조회
    const searchByDate = () => {
        if (!startDate || !endDate) {
            alert('날짜를 선택하세요');
            return;
        }

        // 종료일에 하루 더하기
        const adjustedEndDate = new Date(endDate);
        adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

        // 조회시 기존 reservations, page 상태를 초기화
        setReservations([]);    // 기존 데이터 초기화
        setPage(1);             // 페이지 초기화
        setHasMore(false);      // 더보기 버튼 비활성화

        axios.get('/res/adminFindDate', {
            params: {
                startDate: startDate.toISOString().split('T')[0],  // toISOString()는 YYYY-MM-ddTHH:mm:ss...로 반환됨 
                endDate: adjustedEndDate.toISOString().split('T')[0]       // split('T')[0]를 통해 ddTHH에서 T를 기준으로 잘라 날짜 형식만 가져옴
            }
        })
            .then(response => {
                setReservations(response.data);                         // 조회한 예약정보 덮어쓰기
                setHasMore(response.data.length >= 20);                 // 검색 후 데이터가 20개 이상일 경우 more 버튼 활성화

                console.log('response.data: ', response.data);
                console.log('reservations: ', reservations);
            })
            .catch(() => {
                alert('날짜를 다시 선택하세요');
            });
    };

    // 결제 상태를 통한 예약 조회
    const searchByStatus = () => {
        if (!paymentStatus) {
            alert('결제 상태를 선택하세요');
            return;
        }
        axios.get('/res/adminFindByStatus', {
            params: { paymentStatus }
        })
            .then(response => {
                setReservations(response.data);
                setHasMore(response.data.length >= 20);                 // 검색 후 데이터가 20개 이상일 경우 more 버튼 활성화
                setPage(1);                                             // 조회 후 페이지 번호 초기화
            })
            .catch(() => {
                alert('결제 상태 조회 중 오류 발생');
            });
    };

    // 취소신청 된 예약에 취소승인
    const approveCancellation = (reservationCode) => {
        axios.post('/res/approveCancel', null, { params: { reservationCode } })
            .then(response => {
                setReservations(prevReservations =>
                    prevReservations.map(reservation =>
                        reservation.reservationCode === reservationCode ?
                            { ...reservation, paymentStatus: '취소완료' } :
                            reservation
                    )
                );
            })
            .catch(error => {
                alert('취소승인을 처리하는 중 오류가 발생했습니다');
                console.log('취소 승인 오류 :', error);
            });
    };

    // 결제대기인 예약 승인하기
    const approveReservation = (reservationCode) => {
        axios.post('res/approveReserve', null, { params: { reservationCode } })
            .then(response => {
                setReservations(prevReservations =>
                    prevReservations.map(reservation =>
                        reservation.reservationCode === reservationCode ?
                            { ...reservation, paymentStatus: '예약확정' } :
                            reservation
                    )
                );
            })
            .catch(error => {
                alert('예약승인을 처리하는 중 오류가 발생했습니다');
                console.log('예약 승인 오류 :', error);
            });
    };

    // 페이지 번호가 변경될 때 추가 예약 조회
    useEffect(() => {
        if (page === 1) return;
        fetchReservations(true);
    }, [page]);

    // 날짜 포맷 함수
    const formatDate = (date) => {
        return date.slice(2, 10);
    }
    // 이용시간 포맷 함수
    const formatUseTime = (time) => {
        return time.slice(0, 5);
    }

    return (
        <>
            <article>
                <div className="ReservationList_Find_Div">
                    <h1>예약관리</h1>
                    <table className="ReservationList_Title_Find_Table">
                        <thead>
                            <tr>
                                <th>전체조회</th>
                                <th colSpan={2}>날짜로 찾기</th>
                                <th colSpan={2}>결제상태로 찾기</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {/* 예약 전체 조회 버튼 */}
                                <td>
                                    <button onClick={() => fetchReservations(false)}>조회</button>
                                </td>

                                {/* 날짜별 조회 */}
                                <td>
                                    {/*https://reactdatepicker.com/->Default*/}
                                    <DatePicker
                                        className="ReservationList_DatePiceker"
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
                                    <button onClick={searchByDate}>조회</button>
                                </td>

                                {/* 결제 상태별 조회 */}
                                <td>
                                    <select value={paymentStatus} onChange={e => {
                                        setPaymentStatus(e.target.value)
                                    }} >
                                        <option value=''>결제상태 선택</option>
                                        <option value='예약확정'>예약확정</option>
                                        <option value='결제대기'>결제대기</option>
                                        <option value='취소신청'>취소신청</option>
                                        <option value='취소완료'>취소완료</option>
                                    </select>
                                </td>
                                <td>
                                    <button onClick={searchByStatus}>조회</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="ReservationList_List_Div">
                    {/* 예약 목록 테이블 */}
                    <table className="ReservationList_List_Table">
                        <thead>
                            <tr>
                                <th>NO</th>
                                <th>예약날짜</th>
                                <th>번호</th>
                                <th>지역</th>
                                <th>지점명</th>
                                <th>테마이름</th>
                                <th>아이디</th>
                                <th>사용날짜</th>
                                <th>사용시간</th>
                                <th>가격</th>
                                <th>결제상태</th>
                                <th>취소승인</th>
                                <th>예약승인</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((reservation, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{formatDate(reservation.reservationDate)}</td>
                                    <td>{reservation.reservationCode}</td>
                                    <td>{reservation.tema?.location || 'N/A'}</td>   {/* tema가 null일 수 있으므로 안전하게 접근 */}
                                    <td>{reservation.tema?.cafeName || 'N/A'}</td>   {/* Optional chaining 사용 */}
                                    <td>{reservation.tema?.temaName || 'N/A'}</td>   {/* tema 정보 없을 시 'N/A' 표시 */}
                                    <td>{reservation.userId}</td>
                                    <td>
                                        {new Date(reservation.useDate)
                                            .toISOString()
                                            .slice(2, 10)
                                            .replace(/-/g, '-')}
                                    </td>
                                    <td>{`${formatUseTime(reservation.useTime)} ~ ${parseInt(reservation.useTime) + 2}:00`}</td>
                                    <td>{reservation.tema?.price || 'N/A'}</td>
                                    <td>{reservation.paymentStatus}</td>
                                    <td>
                                        {reservation.paymentStatus === '취소신청' ?
                                            (<button onClick={() => approveCancellation(reservation.reservationCode)}>승인</button>) :
                                            (<button disabled>승인</button>)
                                        }
                                    </td>
                                    <td>
                                        {reservation.paymentStatus === '결제대기' ?
                                            (<button onClick={() => approveReservation(reservation.reservationCode)}>승인</button>) :
                                            (<button disabled>승인</button>)
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* '더 보기' 버튼 */}
                {hasMore && (
                    <button className="ReservationList_MoreButton" onClick={() => setPage(prevPage => prevPage + 1)}>more</button>
                )}
            </article>
        </>
    )
}

export default ReservationList;