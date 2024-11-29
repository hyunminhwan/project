import './App.css';
import './components/Navbar/Navbar.css'; // 새롭게 추가한 무서운 테마의 네비게이션 스타일

import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';

import TemaList from './Page/TemaList/temaList';
import Detail from './Page/Detail/detail';
import InsertTema from './Page/InsertTema/insertTema';
import Anc_Board from './Page/Announcement/Anc_Board';
import Anc_DetailForm from './Page/Announcement/Anc_DetailForm';
import Anc_EditForm from './Page/Announcement/Anc_EditForm';
import Anc_List from './Page/Announcement/Anc_List';
import MainPage from './Page/Mainpage/MainPage';

import Navbar from './components/Navbar/Navbar';
import Login from './Page/Login/login';
import MemberForm from './Page/Member/memberForm';
import Reserve from './Page/reservation/Reserve';
import EditTema from './Page/EditTema/EditTema';
import TemaManagement from './Page/Management/temaManagement';
import ModifyTema from './Page/ModifyTema/ModifyTema';
import ReservationList from './Page/Management/ReservationList';
import Payment from './Page/reservation/Payment';
import CheckReservationDetails from './Page/reservation/CheckReservationDetails';
import FindId from './Page/Login/FindId';
import FindPwd from './Page/Login/FindPwd';
import EditMember from './Page/Member/editMember';
import PasswordCheck from './Page/Member/passwordCheck';
import CompanyList from './Page/Management/CompanyList';
import ClientList from './Page/Management/ClientList';


function App() {

  return (

    <div className="App">
      {/* 새로운 네비게이션 바 */}
      <Navbar />

      <Routes>
        <Route path='/' element={<MainPage />} />  {/* 메인페이지 */}
        <Route path='/list' element={<TemaList />} />  {/* 테마리스트 */}
        <Route path='/detail' element={<Detail />} />  {/* 테마상세페이지 */}
        <Route path='/InsertTema' element={<InsertTema />} />  {/* 테마등록 */}
        <Route path='/Anc_Board' element={<Anc_Board />} />  {/* 공지사항목록 */}
        <Route path='/Anc_DetailForm' element={<Anc_DetailForm />} />  {/* 공지사항상세보기 */}
        <Route path='/Anc_EditForm' element={<Anc_EditForm />} />  {/* 고지사항수정 */}
        <Route path='/Anc_List' element={<Anc_List />} />  {/* 고지사항 쓰기 */}
        <Route path='/login' element={<Login />} />  {/* 로그인 */}
        <Route path='/findid' element={<FindId />} /> {/* 아이디찾기 */}
        <Route path='/findpwd' element={<FindPwd />} />  {/* 비밀번호찾기(변경) */}
        <Route path='/editMember' element={<EditMember />} />  {/* 회원정보수정 */}
        <Route path='/passwordCheck' element={<PasswordCheck />} />  {/* 회원정보 수정 전 비밀번호 체크 */}
        <Route path='/signup' element={< MemberForm />} />  {/* 회원가입으로 이동 */}
        <Route path='/manage-members' element={< ClientList />} />   {/* 회원 관리 */}
        <Route path='/reserve' element={<Reserve />} />   {/* 예약하기 */}
        <Route path='/edit-theme' element={<EditTema />} />   {/* 관계자 테마관리(수정,삭제) */}
        <Route path='/manage-temas' element={<TemaManagement />} />   {/* 관리자 모든테마관리(삭제) */}
        <Route path='/Modify' element={<ModifyTema />} />   {/* 테마 수정폼 */}
        <Route path='/manage-reservations' element={<ReservationList />} />   {/* 예약 관리 */}
        <Route path='/manage-companies' element={<CompanyList />} />   {/* 업체 관리 */}
        <Route path='/payment' element={<Payment />} />   {/* 예약완료 */}
        <Route path='/checkReserve' element={<CheckReservationDetails />} />   {/* 마이페이지 예약확인 */}
        <Route path='*' element={<div>없는 페이지 입니다.</div>} />

      </Routes>

    </div>
  );
}

export default App;
