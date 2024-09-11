import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // 방탈출 느낌의 무서운 테마 스타일

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [loginOn, setLoginOn] = useState(false);

  useEffect(() => {
    // 여기서 로그인 상태를 확인하는 로직 (예: 세션 또는 API 호출)
    const loggedIn = true; // 임시로 true, 실제로는 로그인 여부 확인
    setLoginOn(loginOn);
  }, []);


  return (
    <div className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/list">Theme</Link></li>
        <li><Link to="/Anc_Board">Announcement</Link></li>
        <li className="dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}>
              
          <Link >Manager</Link>   {/* 관계자 */}
          {dropdownOpen && (
            <ul className="dropdown-content">
              <li><Link to="/InsertTema">Register theme</Link></li> {/* 테마 등록 */}
              <li><Link to="/edit-theme">Edit theme</Link></li> {/* 테마 수정 */}
              <li><Link to="/real-check">Performance inquiry</Link></li> {/* 실적 조회 */}
            </ul>
          )}
        </li>

        <li className="dropdown"
            onMouseEnter={() => setDropdownOpen2(true)}
            onMouseLeave={() => setDropdownOpen2(false)}>
          <Link >Official</Link>  {/* 관리자 */}
          {dropdownOpen2 && (
            <ul className="dropdown-content"> 
              <li><Link to="/manage-members">Membership Management</Link></li> {/* 회원 관리 */}
              <li><Link to="/manage-companies">Manage vendors</Link></li> {/* 업체 관리 */}
              <li><Link to="/manage-reservations">Tema Management</Link></li> {/* 테마 관리 */}
            </ul>
          )}
        </li>
      </ul>

      <ul className="nav-right"> 
        <li style={{ display: loginOn ? 'block' : 'none' }}>
          <Link to="/mypage">My Page</Link>
        </li>
        <li style={{ display: !loginOn ? 'block' : 'none' }}>
          <Link to="/login">Sign In</Link>
        </li>
        <li style={{ display: !loginOn ? 'block' : 'none' }}>
          <Link to="/signup">Sign Up</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
