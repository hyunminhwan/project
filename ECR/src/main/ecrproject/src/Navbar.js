import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // 방탈출 느낌의 무서운 테마 스타일

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);

  return (
    <div className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/list">테마</Link></li>
        <li className="dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}>
          <Link to="#">관리자 메뉴</Link>
          {dropdownOpen && (
            <ul className="dropdown-content">
              <li><Link to="/InsertTema">테마 등록</Link></li>
              <li><Link to="/edit-theme">테마 수정</Link></li>
              <li><Link to="/real-check">실적 조회</Link></li>
            </ul>
          )}
        </li>

        <li className="dropdown"
            onMouseEnter={() => setDropdownOpen2(true)}
            onMouseLeave={() => setDropdownOpen2(false)}>
          <Link to="#">관계자 메뉴</Link>
          {dropdownOpen2 && (
            <ul className="dropdown-content">
              <li><Link to="/manage-members">회원 관리</Link></li>
              <li><Link to="/manage-companies">업체 관리</Link></li>
              <li><Link to="/manage-reservations">예약 관리</Link></li>
            </ul>
          )}
        </li>
      </ul>

      <ul className="nav-right">
        <li><Link to="/mypage">마이페이지</Link></li>
        <li><Link to="/login">로그인</Link></li>
        <li><Link to="/signup">회원가입</Link></li>
      </ul>
    </div>
  );
}

export default Navbar;
