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
import img1 from './img/1.jpg';

function MainPage() {
  const [themes, setthemes] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // fullpage.js 초기화
    const fullPageInstance = new Fullpage('#fullpage', {
      autoScrolling: true,
      navigation: true,
      scrollingSpeed: 700, // 스크롤 속도 조정
      anchors: ['main', 'about', 'tema', 'caution', 'footer'], // 각 섹션에 고유 앵커 설정
      afterLoad: function(origin, destination, direction) {
        console.log("스크롤이 완료된 후 호출되는 콜백 함수입니다.");
      }
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

     {/* 2번째 섹션: 이용방법 */}
     <div className="section">
        <section className="MainPage_About">
          <div className="About">
            <h2 className="About_Text">방탈출 게임</h2> <br />
            <p id="MainPage_b">"60분 안에 갇혀 있는 방에서 숨겨진 단서를 찾아 탈출하면 됩니다!"<br /> 비디오 게임이 아닌, 실제로 체험하는 놀이문화입니다. 여러분은 어떠한 이유로 다양한 테마룸에 갇히게 됩니다.</p>
            <br /> <br />
            <div className="About_Icons">
              <div className="About_Icons_Item">
                <img src={img1} alt="Clock Icon" />
                <p className="About_Font">게임의 핵심은 단서를 조합하여 문제를 해결하는데 있습니다.</p><br/>
                <p className="About_Font2">주변의 단서를 꼼꼼히 관찰하고 발견하여, <br/>논리적으로 조합해 보세요!<br/>기본 이상의 사고력과 집중력이 있다면 충분히 풀 수 있습니다.</p>
              </div>
              <div className="About_Icons_Item">
                <img src={img1} alt="img1" />
                <p className="About_Font">방탈출 성공의 키는 소통입니다.</p><br/>
                <p className="About_Font2">게임을 진행하는 동안 여러분은 동료와 끊임없이 공유해가며 문제를 해결해나가야합니다. <br/>혼자서는 쉽지 않지만, 동료와 함께 협력하면 충분히 해결할 수 있습니다.</p>
              </div>
              <div className="About_Icons_Item">
                <img src={img1} alt="img1" />
                <p className="About_Font">시간제한이 있다는 것을 기억하세요!</p><br/>
                <p className="About_Font2">방안에 들어오는 순간! <br /> 60분이라는 시간이 매우 짧게 느껴질 것입니다.<br/> 제한 된 시간안에 침착하게, 단서를 찾아 문제를 해결하세요.</p>
              </div>
              <div className="About_Icons_Item">
                <img src={img1} alt="img1" />
                <p className="About_Font">방탈출 게임은 안전합니다.</p><br/>
                <p className="About_Font2">위급 상황시,<br/> 외부 직원과 연락하거나 방안에 구비된 비상열쇠를 <br/>이용해 탈출할 수 있으며, 인화성 물품은 별도 보관함에 보관해야 합니다. <br/>고객들의 안전을 위해 CCTV를 설치 및 운영하고 있습니다.<br /><br /></p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 3번째 섹션: 테마 카드 섹션 */}
      <div className="section">
        <section className="MainPage_Tema_Card">
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

      {/* 4번째 섹션: 주의사항 */}
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
