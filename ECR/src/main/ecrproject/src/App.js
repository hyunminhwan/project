import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';


function App() {
  const [menuList, setMenuList] = useState([]);


  return (
    <div className="App">
     

      {
        menuList.map((menu,i) => {
          return (
            <>
            <div>테마번호 :{i+1}</div>
            <h2>테마이름 : {menu.tema_name}</h2>
            <div>카페이름 :{menu.cafe_name}</div>
            <div>장르 : {menu.genre}</div>
            <div>지역 : {menu.location}</div>
            <div>난이도 : {menu.difficulty}</div>
            <div>내용 : {menu.tema_content}</div>
            <div>평점 : {menu.rating}</div>
            <div>소요시간 :{menu.timetaken}분</div>
            <div>가격 : {menu.price} 원</div>
            <div>인원수 :{menu.personnel}</div>
            <div>등록일 :{menu.tema_created_date}</div>
            <br/>
            <br/>
            <br/>
            <br/>
            </>
          )
        })
      }
      <button onClick={() => {
        axios.get('/api/menu')
             .then(result => {
              console.log(result);
              setMenuList(result.data);
             })
             .catch(() => {
              console.log("실패");
             })
      }}>서버에서 메뉴가져오기</button>
      
      
    </div>
  );
}


export default App;
