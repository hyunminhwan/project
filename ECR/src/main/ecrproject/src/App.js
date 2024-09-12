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
import MainPage from './Mainpage/MainPage';

import Navbar from './Navbar'; // 새로 만든 네비게이션 바 컴포넌트
import SignupForm from './member/joinform';
import Login from './login/login';
import MemberForm from './member/memberForm';
import MembershipManagement from './Admin/MembershipManagement';
import Reserve from './reservation/Reserve';

function App() {

  return (

    <div className="App">
      {/* 새로운 네비게이션 바 */}
        <Navbar />

      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/list' element={<TemaList />} />
        <Route path='/detail' element={<Detail />} />

        <Route path='/InsertTema' element={<InsertTema />} />
        <Route path='/Anc_Board' element={<Anc_Board />} />

        {/* 공지사항에서 공지사항 디테일로 가는 라우트 */}
        <Route path='/Anc_DetailForm' element={<Anc_DetailForm />} />
        <Route path='/Anc_EditForm' element={<Anc_EditForm />} />
        <Route path='/Anc_List' element={<Anc_List />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={< MemberForm />} />
        <Route path='/manage-members' element={< MembershipManagement />} />
        <Route path='/reserve' element={<Reserve />} />

        {/* 메인페이지에서 공지사항디테일로 가는 라우트 */}
        <Route path='/Anc_DetailForm/:num' element={<Anc_DetailForm />} />
        <Route path='*' element={<div>없는 페이지 입니다.</div>} />
      </Routes>

    </div>
  );
}

export default App;
