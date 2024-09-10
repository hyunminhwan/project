import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

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
          <Link to="#">Manager</Link>
          {dropdownOpen && (
            <ul className="dropdown-content">
              <li><Link to="/InsertTema">Register theme</Link></li>
              <li><Link to="/edit-theme">Edit theme</Link></li>
              <li><Link to="/real-check">Performance inquiry</Link></li>
            </ul>
          )}
        </li>

        <li className="dropdown"
            onMouseEnter={() => setDropdownOpen2(true)}
            onMouseLeave={() => setDropdownOpen2(false)}>
          <Link to="#">Official</Link>
          {dropdownOpen2 && (
            <ul className="dropdown-content"> 
              <li><Link to="/manage-members">Membership Management</Link></li>
              <li><Link to="/manage-companies">Business Management</Link></li>
              <li><Link to="/manage-reservations">Reservation registration</Link></li>
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
