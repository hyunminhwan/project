import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MainPage.css';
import { useNavigate } from 'react-router-dom';
import Fullpage from 'fullpage.js'; // Fullpage.js 클래스 임포트
import StarRatings from 'react-star-ratings';
import clockImg from './img/clock.png';
import photoImg from './img/photo-camera.png';
import cctvImg from './img/cctv.png';
import groupImg from './img/group.png';


function MainPage() {
  const [themes, setthemes] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // fullpage.js 초기화
    const fullPageInstance = new Fullpage('#fullpage', {
      autoScrolling: true,
      navigation: true,
    });

    // 테마 API 호출 & 평점 순으로 상위 5개 띄움
    axios.get('/api/topmenu')
      .then(response => {
        const sortedthemes = response.data
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 5); // 상위 5개 선택
        setthemes(sortedthemes);
      })
      .catch(error => console.error('Error fetching themes:', error));

    // fullpage.js cleanup (unmount 시 fullpage 인스턴스 해제)
    return () => {
      fullPageInstance.destroy('all');
    };
  }, []);

  const themeDetail = (menus) => {
    navigate('/detail', { state: { menus } })
  }
  return (
    
    <div id="fullpage">
      {/* 1번째 섹션: 메인이미지 */}
      <div className="section">
        <header>
          <h1 id="MainPage_a">60분, 지금껏 겪어보지 못한 스릴 게임</h1>
          <p id="MainPage_b"><br />주어진 시간은 단 60분 <br />당신에게 지금껏 겪어보지 못한 <br />색다른 경험과 재미를 선사합니다.</p>
        </header>
      </div>

      {/* 2번째 섹션: 테마 카드 섹션 */}
      <div className="section">
        <section className="MainPage_Tema_Card">
          <br />
          <h2 className="MainPage_Tema_h2"> TEMA</h2>
          <div className="MainPage_TemaList">
            {themes.map((theme, index) => (
              <div className="MainPage_Tema" key={index} onClick={() => { themeDetail(theme) }}>
                <img src={theme.imgUrl} alt="테마 이미지" />
                <p>{theme.themeName}<br />장르 {theme.genre}<br />인원 {theme.personnel} <br />
                  난이도 <StarRatings
                    rating={theme.difficulty}
                    starRatedColor="brown"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="1px"
                  />
                  <br />
                  평점 <StarRatings
                    rating={theme.rating}
                    starRatedColor="red"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="1px"
                  />
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>


      {/* 3번째 섹션: 주의사항 */}
      <div className="section">
        <section className="MainPage_Caution">
          <div className="Caution">
            <br /><br /><br />
            <h2 className="Caution_Text">Caution</h2> <br />
            <p className="Caution_Text2">노약자, 임산부, 폐쇄공포증, 보호자 미동반 어린이<br /> 음주자는 입장이 제한됩니다.</p>
            <br /> <br /><br /><br />
            <div className="Caution_Icons">
              <div className="Caution_Icons_Item">
                <img src={clockImg} alt="Clock Icon" />
                <p className="Caution_Font">도착시간 엄수</p>
                <p className="Caution_Font2">게임 준비와 설명을 위하여<br />게임시작 시간 최소 10분 전에<br />도착해주셔야 합니다.<br /><br /><br /></p>
              </div>
              <div className="Caution_Icons_Item">
                <img src={photoImg} alt="Photo Icon" />
                <p className="Caution_Font">촬영 금지 및 소지품 보관</p>
                <p className="Caution_Font2">소품 및 인테리어는<br />컨텐츠 보호를 위해 사진 촬영을<br />금지하고 있습니다.<br />게임 입장 전 소지품을 보관함에<br />보관해주세요.</p>
              </div>
              <div className="Caution_Icons_Item">
                <img src={cctvImg} alt="Cctv Icon" />
                <p className="Caution_Font">CCTV 녹화중</p>
                <p className="Caution_Font2">안전한 방탈출과 원활한<br />게임진행을 위해,<br />테마 내 모든 구간은<br />CCTV를 통해 녹화되고 있습니다.<br /></p>
              </div>
              <div className="Caution_Icons_Item">
                <img src={groupImg} alt="Group Icon" />
                <p className="Caution_Font">스포 금지</p>
                <p className="Caution_Font2">테마 내의 모든 내용 및 문제는<br />다른 손님들을 위해<br />유출을 절대 금지합니다.<br /><br /></p>
              </div>
            </div>
          </div>
        </section>
      </div>


     
    </div>
  );
}

export default MainPage;
