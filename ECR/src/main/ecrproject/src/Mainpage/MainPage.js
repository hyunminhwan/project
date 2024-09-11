import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MainPage.css';
import { Link } from 'react-router-dom';
import Fullpage from 'fullpage.js'; // Fullpage.js 클래스 임포트

function MainPage() {
  const [themes, setThemes] = useState([]);
  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // fullpage.js 초기화
    const fullPageInstance = new Fullpage('#fullpage', {
      autoScrolling: true,
      navigation: true,
    });

    // 테마 API 호출 & 평점 순으로 상위 5개 띄움
    axios.get('/api/topmenu')
      .then(response => {
        const sortedThemes = response.data
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 5); // 상위 5개 선택
        setThemes(sortedThemes);
      })
      .catch(error => console.error('Error fetching themes:', error));

    // 공지사항 API 호출 (상위 5개만 가져오기)
    axios.get('/board/write')
      .then(response => {
        const topNotices = response.data.slice(0, 5); // 상위 5개 공지사항만 선택
        setNotices(topNotices);
      })
      .catch(error => console.error('Error fetching notices:', error));

    // 이벤트 API 호출
    axios.get('/api/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));

    // fullpage.js cleanup (unmount 시 fullpage 인스턴스 해제)
    return () => {
      fullPageInstance.destroy('all');
    };
  }, []);

  return (
    <div id="fullpage">
      {/* 1번째 섹션: 메인이미지 */}
      <div className="section">
        <header>
          <h1 id="a">60분! 지금껏 겪어보지 못한 스릴 게임</h1>
          <p id="b"><br />주어진 시간은 단 60분 <br/>당신에게 지금껏 겪어보지 못한 <br />색다른 경험과 재미를 선사합니다.</p>
        </header>
      </div>

      {/* 2번째 섹션: 테마 카드 섹션 */}
      <div className="section">
        <section className="theme-cards">
          {themes.map((theme, index) => (
            <div className="theme-card" key={index}>
              <img src={theme.imgUrl} alt="테마 이미지" />
              <p>{theme.temaName}<br />장르 : {theme.genre}<br />난이도 : {theme.difficulty}<br />인원수 : {theme.personnel}</p>
            </div>
          ))}
        </section>
      </div>

      {/* 3번째 섹션: 공지사항과 이벤트 섹션 */}
      <div className="section">
        <section className="notice-event">
          <div className="notice">
            <h2>공지사항</h2>
            <ul>
              {notices.map((a) => (
                <li key={a.boardNo}>
                  <Link to={`/Anc_DetailForm/${a.boardNo}`} state={{ boardNo: a.boardNo }}> 
                    · {a.boardTitle}<br/>
                  </Link>
                </li>
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
      </div>

      {/* 푸터 */}
      <div className="section">
      <footer>
        <p>상호: OOOOOOOO | 대표자: OOO | 대표전화: 010-1234-5678</p>
        <p>이메일: OOOOO@naver.com | 주소: 서울시 강남구 역삼동 OOO</p>
        <p>사업자번호: 000-00-00000</p>
      </footer>
      </div>
    </div>
  );
}

export default MainPage;
