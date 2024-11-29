
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // 방탈출 느낌의 무서운 테마 스타일
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/loginStore';


function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginToMember = useSelector((state) => state.loginMember);
  const Logout = () => {
    dispatch(logout());
    alert("로그아웃 되었습니다.")
    localStorage.clear();
    navigate('/login')
  };

  return (
    <div className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li> {/* 메인페이지 */}
        <li><Link to="/list">TEMA</Link></li> {/* 테마리스트 */}
        <li><Link to="/Anc_Board">Announcement</Link></li> {/* 공지사항 */}
        {loginToMember.member?.loginType === 2 && (
          <li className="dropdown">
            <div >Manager</div>
            <ul className="dropdown-content">
              <li><Link to="/InsertTema">Register theme</Link></li> {/* 테마 등록 */}
              <li><Link to="/edit-theme">Tema Management</Link></li> {/* 테마 관리 */}
            </ul>

          </li>
        )}
        {loginToMember.member?.loginType === 3 && (
          <li className="dropdown">
            <div >Official</div>  {/* 관리자 */}
            <ul className="dropdown-content">
              <li><Link to="/manage-members">Membership Management</Link></li> {/* 회원 관리 */}
              <li><Link to="/manage-companies">Manage vendors</Link></li> {/* 업체 관리 */}
              <li><Link to="/manage-temas">Tema Management</Link></li> {/* 테마 관리 */}
              <li><Link to="/manage-reservations">ReservationList</Link></li> {/* 예약 관리 */}
            </ul>
          </li>
        )}
      </ul>

      <ul className="nav-right">
        {loginToMember?.member ? (
          <>
            <li>{loginToMember.member.memberId}</li>
            {loginToMember.member.loginType === 2 ? ( // 관계자 로그인일 때 'change information'만 보이게 처리
              <li className="dropdown">
                <div >My Page</div>
                <ul className="dropdown-content">
                  <li><Link to="/passwordCheck">change information</Link></li> {/* 관계자에게만 보임 */} {/* 관계자 개인정보수정 */}
                </ul>
              </li>
            ) : (
              loginToMember.member.loginType === 1 && ( // 일반 사용자 로그인일 때 My Page 전체 메뉴 보이기
                <li className="dropdown">
                  <div>My Page</div>
                  <ul className="dropdown-content">
                    <li><Link to="/checkReserve">Reservation confirmation</Link></li> {/* 개인회원 예약확인*/}
                    <li><Link to="/passwordCheck">change information</Link></li> {/* 개인회원 개인정보수정 */}
                  </ul>
                </li>
              )
            )}
            <li>
              <Link to="/" onClick={Logout}>log out</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">sign in</Link> {/* 로그인 */}
            </li>
            <li>
              <Link to="/signup">sign up</Link> {/* 회원가입 */}
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar;