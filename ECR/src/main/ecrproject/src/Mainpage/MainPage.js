import React, { useEffect, useState } from 'react';
import axios from 'axios'; // axios 임포트
import './MainPage.css'; // CSS 파일
import { Link } from 'react-router-dom';

function MainPage() {
  const [themes, setThemes] = useState([]);
  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // 테마 API 호출 & 평점 순으로 상위 5개 띄움
    axios.get('/api/menu')
      .then(response => {
        const sortedThemes = response.data
          .sort((a, b) => b.rating - a.rating) // rating을 기준으로 내림차순 정렬
          .slice(0, 5); // 상위 5개 선택
        setThemes(sortedThemes);
      })
      .catch(error => console.error('Error fetching themes:', error));

    // 공지사항 board 호출 (상위 5개만 가져오기)
    axios.get('/board/write') // 공지사항 목록을 반환 호출
      .then(response => {
        const topNotices = response.data.slice(0, 5); // 상위 5개 공지사항만 선택
        setNotices(topNotices);
      })
      .catch(error => console.error('Error fetching notices:', error));

    // 이벤트 API 호출
    axios.get('/api/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    <>
      <header>
        <h1>메인이미지 1~3(?)</h1>
        <p>메인 테마 컷 이미지<br />사이트 소개 메인 이미지<br />이벤트</p>
      </header>

      {/* 테마 카드 섹션 */}
      <section className="theme-cards">
        {themes.map((theme, index) => (
          <div className="theme-card" key={index}>
            <img src={theme.imageUrl} alt="테마 이미지" />
            <p>{theme.temaName}<br />장르 : {theme.genre}<br />난이도 : {theme.difficulty}<br />인원수 : {theme.personnel}</p>
          </div>
        ))}
      </section>

      {/* 공지사항과 이벤트 섹션 */}
      <section className="notice-event">
        <div className="notice">
          <h2>공지사항</h2>
          <ul>
          {console.log(notices)}
            {notices.map((a, index) => (
              <li key={index}>{a.boardTitle}</li> // 공지사항 제목만 표시
              
            ))}
          </ul>
        </div>
        <div className="event">
          <h2>이벤트</h2>
          <ul>
            {events.map((b, index) => (
              <li key={index}>{b.title}</li>
            ))}
          </ul>
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
