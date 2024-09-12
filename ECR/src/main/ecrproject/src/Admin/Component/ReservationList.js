import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ReservationList() {
    const [startDate, setStartDate] = useState(new Date()); // 시작날짜 설정
    const [endDate, setEndDate] = useState(new Date());     // 종료날짜 설정

    const [paymentStatus, setPaymentStatus] = useState(""); // 결제 상태

    const [reservations, setReservations] = useState([]);   // 조회한 예약 리스트
    const [page, setPage] = useState(1);                    // 페이지 번호(더 보기 기능)
    const [hasMore, setHasMore] = useState(true);           // 더 불러올 데이터 여부

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

            // 불러온 데이터가 20개 미만일 경우 더 불러올 데이터가 없다고 판단
            if (fetchedData.length < 20) {
                setHasMore(false);                                  // 더 이상 불러올 데이터가 없을 때
            } else {
                setHasMore(true);
            }
        })
        .catch(error => {
            console.error('전체 조회 오류: ', error);
        });
    };

    // 날짜를 통한 예약 조회
    const searchByDate = () => {
        if(!startDate || !endDate) {
            alert('날짜를 선택하세요');
            return ;
        }
        axios.get('/res/adminFindDate', {
            params : {
                startDate : startDate.toISOString().split('T')[0],  // toISOString()는 YYYY-MM-ddTHH:mm:ss...로 반환됨 
                endDate : endDate.toISOString().split('T')[0]       // split('T')[0]를 통해 ddTHH에서 T를 기준으로 잘라 날짜 형식만 가져옴
            }
        })
        .then(response => {
            setReservations(response.data);                         // 예약 정보 설정
            // 검색 후 데이터가 20개 이상일 경우 more 버튼 활성화
            setHasMore(response.data.length >= 20);                 // 검색 시 더 보기 버튼 비활성화
            setPage(1);                                             // 조회 후 페이지 번호 초기화
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
            params: {paymentStatus}
        })
        .then(response => {
            setReservations(response.data);
            // 검색 후 데이터가 20개 이상일 경우 more 버튼 활성화
            setHasMore(response.data.length >= 20);
            setPage(1);                                             // 조회 후 페이지 번호 초기화
        })
        .catch(() => {
            alert('결제 상태 조회 중 오류 발생');
        });
    };

    // 취소신청 된 예약에 취소승인
    const approveCancellation = (reservationCode) => {
        axios.post('/res/approveCancel', null, {params : {reservationCode}})
            .then(response => {
                setReservations(prevReservations =>
                    prevReservations.map(reservation => 
                    reservation.reservationCode === reservationCode ?
                    {...reservation, paymentStatus : '취소완료'} :
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
        axios.post('res/approveReserve', null, {params : {reservationCode}})
            .then(response => {
                setReservations(prevReservations => 
                    prevReservations.map(reservation =>
                    reservation.reservationCode === reservationCode ?
                    {...reservation, paymentStatus : '예약확정'} :
                    reservation
                    )
                );
            })
            .catch(error => {
                alert('예약승인을 처리하는 중 오류가 발생했습니다');
                console.log('예약 승인 오류 :', error);
            });
    };

    // 페이지가 로드될 때 전체 예약 데이터를 20개 가져옴
    useEffect(() => {
        fetchReservations(true);
    }, [page]);

    return(
        <>
            <h2>예약관리</h2>
            <hr />

            <article>
                <div>
                    <table className="CheckReser">
                        <tbody>
                            <tr>
                                {/* 예약 전체 조회 버튼 */}
                                <td>
                                    <p>🧾전체조회</p>
                                    <button onClick={() => fetchReservations(false)}>조회</button>
                                </td>

                                {/* 날짜별 조회 */}
                                <td>
                                    <p>📅날짜로 찾기</p>
                                    {/*https://reactdatepicker.com/->Default*/}
                                    <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    dateFormat="yyyy-MM-dd"                     // 날짜 형식
                                    placeholderText="시작 날짜"
                                    />
                                    ~
                                    <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    dateFormat="yyyy-MM-dd"                     // 날짜 형식
                                    placeholderText="종료 날짜"
                                    minDate={startDate}                         // endDate는 startDate 이후만 선택하도록
                                    />
                                    <button onClick={searchByDate}>조회</button>
                                </td>

                                {/* 결제 상태별 조회 */}
                                <td>
                                    <p>🖊️결제상태로 찾기</p>
                                    <select value={paymentStatus} onChange={e => {
                                        setPaymentStatus(e.target.value)
                                    }} >
                                        <option value=''>결제상태 선택</option>
                                        <option value='예약확정'>예약확정</option>
                                        <option value='결제대기'>결제대기</option>
                                        <option value='취소신청'>취소신청</option>
                                        <option value='취소완료'>취소완료</option>
                                    </select>
                                    <button onClick={searchByStatus}>조회</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </article>

            {/* 예약 목록 테이블 */}
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>예약날짜</th>
                        <th>예약번호</th>
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
                        <td>{reservation.reservationDate}</td>
                        <td>{reservation.reservationCode}</td>
                        <td>{reservation.tema?.location || 'N/A'}</td>   {/* tema가 null일 수 있으므로 안전하게 접근 */}
                        <td>{reservation.tema?.cafeName || 'N/A'}</td>   {/* Optional chaining 사용 */}
                        <td>{reservation.tema?.temaName || 'N/A'}</td>   {/* tema 정보 없을 시 'N/A' 표시 */}
                        <td>{reservation.userId}</td>
                        <td>{reservation.useDate}</td>
                        <td>{reservation.useTime}</td>
                        <td>{reservation.tema?.price || 'N/A'}</td>
                        <td>{reservation.paymentStatus}</td>
                        <td>
                            {reservation.paymentStatus === '취소신청' ? 
                                ( <button onClick={() => approveCancellation(reservation.reservationCode)}>승인</button> ) : 
                                ( <button disabled>승인</button> )
                            }
                        </td>
                        <td>
                            {reservation.paymentStatus === '결제대기' ? 
                                ( <button onClick={() => approveReservation(reservation.reservationCode)}>승인</button> ) : 
                                ( <button disabled>승인</button> )
                            }
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>

            {/* '더 보기' 버튼 */}
            {hasMore && (
                <button onClick={() => setPage((prevPage) => prevPage + 1)}>more</button>
            )}
        </>
    )
}

export default ReservationList;