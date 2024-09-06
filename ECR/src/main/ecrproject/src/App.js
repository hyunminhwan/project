import './App.css';
import './Navbar.css'; // 새롭게 추가한 무서운 테마의 네비게이션 스타일
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate } from 'react-router-dom';

import TemaList from './tema/temaList';
import Detail from './tema/detail';
import InsertTema from './tema/insertTema';
import Anc_Board from './Announcement/Anc_Board';
import Anc_DetailForm from './Announcement/Anc_DetailForm';
import Anc_EditForm from './Announcement/Anc_EditForm';
import Anc_List from './Announcement/Anc_List';

import Navbar from './Navbar'; // 새로 만든 네비게이션 바 컴포넌트

function App() {

  let navigate = useNavigate();
  return (

    <div className="App">
      {/* 새로운 네비게이션 바 */}
      <Navbar />

      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg'/>
            <h2>안녕하세요</h2>
          </>
        }/>
        <Route path='/list' element={<TemaList />} />
        <Route path='/detail/:num' element={ <Detail /> } /> 
        <Route path='/InsertTema' element={ <InsertTema /> } /> 
        <Route path='/Anc_Board' element={ <Anc_Board /> } />
        <Route path='/Anc_DetailForm' element={ <Anc_DetailForm /> } />
        <Route path='/Anc_EditForm' element={ <Anc_EditForm /> } />
        <Route path='/Anc_List' element={ <Anc_List /> } />
        <Route path='*' element={<div>없는 페이지 입니다.</div>} />
      </Routes>

    </div>
  );
}

export default App;
