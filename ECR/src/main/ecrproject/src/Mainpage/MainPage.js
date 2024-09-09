import React, { useEffect, useState } from 'react';
import './MainPage.css'; // CSS 파일

function MainPage() {
  const [themes, setThemes] = useState([]);
  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);

  // useEffect(() => {
  //   // 테마 API 호출
  //   fetch('/api/themes')
  //     .then(response => response.json())
  //     .then(data => setThemes(data));

  //   // 공지사항 API 호출
  //   fetch('/api/notices')
  //     .then(response => response.json())
  //     .then(data => setNotices(data));

  //   // 이벤트 API 호출
  //   fetch('/api/events')
  //     .then(response => response.json())
  //     .then(data => setEvents(data));
  // }, []);

  return (
    <>
      <header>
        <h1>메인이미지 1~3(?)</h1>
        <p>메인 테마 컷 이미지<br/>사이트 소개 메인 이미지<br/>이벤트</p>
      </header>

      {/* 테마 카드 섹션 */}
      <section className="theme-cards">
        {themes.map((theme, index) => (
          <div className="theme-card" key={index}>
            <img src={theme.imageUrl} alt="테마 이미지" />
            <p>{theme.name}<br/>{theme.genre}<br/>{theme.difficulty}<br/>{theme.description}</p>
          </div>
        ))}
      </section>

      {/* 공지사항과 이벤트 섹션 */}
      <section className="notice-event">
        <div className="notice">
          <h2>공지사항</h2>
          <ul>
            {notices.map((notice, index) => (
              <li key={index}>{notice.title}</li>
            ))}
          </ul>
        </div>
        <div className="event">
          <h2>이벤트</h2>
          <ul>
            {events.map((event, index) => (
              <li key={index}>{event.title}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 지도 섹션 */}
      <section className="map">
        <h2>오시는 길 (지도 - 네이버 API)</h2>
        <div id="map-container">
          {/* 네이버 지도 API 연동 */}
        </div>
      </section>

      {/* 푸터 */}
      <footer>
        <p>상호: OOOOOOOO | 대표자: OOO | 대표전화: 010-1234-5678</p>
        <p>이메일: OOOOO@naver.com | 주소: 서울시 강남구 역삼동 OOO</p>
        <p>사업자번호: 000-00-00000</p>
      </footer>
    </>
  );
}

export default MainPage;