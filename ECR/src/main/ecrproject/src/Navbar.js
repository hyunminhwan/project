
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // 방탈출 느낌의 무서운 테마 스타일
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './store/loginStore';

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
        <li><Link to="/">Home</Link></li>
        <li><Link to="/list">Theme</Link></li>
        <li><Link to="/Anc_Board">Announcement</Link></li>
        {loginToMember.member?.loginType ===2 &&( 
        <li className="dropdown">
          <Link to="/">Manager</Link> 
            <ul className="dropdown-content">
              <li><Link to="/InsertTema">Register theme</Link></li> {/* 테마 등록 */}
              <li><Link to="/edit-theme">Tema Management</Link></li> {/* 테마 관리 */}
            </ul>
          
        </li>
        )}
        {loginToMember.member?.loginType ===3 &&( 
        <li className="dropdown">
          <Link>Official</Link>  {/* 관리자 */}
            <ul className="dropdown-content"> 
              <li><Link to="/manage-members">Membership Management</Link></li> {/* 회원 관리 */}
              <li><Link to="/manage-companies">Manage vendors</Link></li> {/* 업체 관리 */}
              <li><Link to="/manage-reservations">Tema Management</Link></li> {/* 테마 관리 */}
            </ul>
        </li>
          )}
      </ul>
  

      <ul className="nav-right">
        {loginToMember?.member ?(
            <>
          <li>{loginToMember.member.memberId}</li>
          <li>
            <Link to="/mypage">My Page</Link>
          </li>
           <li>
           <Link to="/" onClick={Logout}>logout</Link>
         </li>
         </>
          ):(
           <>
        <li>
          <Link to="/login">Sign In</Link>
        </li>
        <li >
          <Link to="/signup">Sign Up</Link>
        </li>
          </>
          )}
      </ul>
    </div>
  );
}

export default Navbar;
