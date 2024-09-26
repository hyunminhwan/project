import { useLocation, useNavigate } from 'react-router-dom';
import './css/Payment.css';
import { useSelector } from 'react-redux';

function Payment() {
    const navigate = useNavigate();
    const location = useLocation();

    // location.state에서 menu와 reservation의 정보를 가져오기
    const { menu, reservation } = location.state;
    // Redux 로그인 유저 정보 가져오기
    const userInfo = useSelector(state => state.loginMember.member);
    // {userInfo.memberPhone} 연락처 형식으로 변환
    const formatPhoneNumber = (phoneNumeber) => {
        const str = '0' + phoneNumeber;
        return `${str.slice(0,3)}-${str.slice(3,7)}-${str.slice(7)}`;
    }
    // {reservation.useTime} 이용시간 포맷 함수
    const formatStartUseTime = (time) => {
        return time.slice(0,5);
    }

    return(
        <>
            <div className='Payment-Container_Div'>
                <form>
                    <h1>예약내역</h1>

                    <table className="Payment_Table">
                        <tbody>
                            <tr>
                                <th>예약번호</th>
                                <td>
                                    {reservation.reservationCode}                        {/* 예약테이블에서 가져온 예약번호 */}
                                </td>
                            </tr>
                            <tr>
                                <th>선택 테마</th>
                                <td>{menu.temaName}</td>                                {/* 선택한 테마 이름 */}
                            </tr>
                            <tr>
                                <th>지 점</th>
                                <td>{menu.cafeName}</td>
                            </tr>
                            <tr>
                                <th>선택사항</th>
                                <td>
                                장르: #{menu.genre}&emsp;난이도: #⭐×{menu.difficulty}&emsp;인원수: #🙋‍♂️×{menu.personnel} {/* 해당 테마에 테마테이블에 들어가 있는 정보 */}
                                </td>
                            </tr>
                            <tr>
                                <th>이용시간</th>
                                <td>
                                    {`${reservation.useDate}  ${formatStartUseTime(reservation.useTime)} ~ ${parseInt(reservation.useTime)+2}:00`}    {/* 예약된 날짜 및 시간 */}
                                </td>                             
                            </tr>
                            <tr>
                                <th>예약자 명</th>
                                <td>{ userInfo.memberName }</td>                       {/* 예약자 이름 */}
                            </tr>
                            <tr>
                                <th>연락처</th>
                                <td>{ formatPhoneNumber(userInfo.memberPhone) }</td>                      {/* 예약자 번호 */}
                            </tr>
                            <tr>
                                <th>이용요금</th>
                                <td>
                                    <b>총 {menu.price}원 ※ 예약금 {menu.price*0.5}원<br />국민은행 457800-04-772802 / 예금주:현민환</b>
                                </td>
                            </tr>
                            <tr>
                                <th>예약상태</th>
                                <td>
                                    { reservation.paymentStatus }                       {/* 결제 상태 */}
                                </td>
                            </tr>
                            <tr>
                                <th colSpan='2'>※ 예약 후 1시간 이내에 입금 확인이 되지 않으면 예약이 취소됩니다!!!</th>
                            </tr>
                            <tr>
                                <td colSpan='2'>
                                    <button type='button' onClick={() => { navigate('/checkReserve') }}>확인하기</button>  {/* 클릭시 루트페이지('/')로 이동 */}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </>
    )
}

export default Payment;