import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate,} from 'react-router-dom';
import { Navbar, Container, Nav, Row} from 'react-bootstrap';
import TemaList from './tema/temaList';
import Detail from './tema/detail';

import Anc_Board from './Announcement/Anc_Board';
import Anc_DetailForm from './Announcement/Anc_DetailForm';

import Anc_EditForm from './Announcement/Anc_EditForm';

//npm i react-router-dom
//npm install @reduxjs/toolkit react-redux
// npm install react-bootstrap bootstrap
//npm install axios

function App() {

  let navigate = useNavigate();
  return (

    <div className="App">
     
     <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">방탈출</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/list')}}>테마</Nav.Link>
            <Nav.Link onClick={() => { navigate('/Anc_Board')}}>공지사항</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg'/>
            <Container>
              <Row>
              <h2>안녕하세요</h2>
              </Row>
            </Container>

          </>
        }/>
        <Route path='/list' element={<TemaList />} />
        <Route path='/detail/:num' element={ <Detail /> } />
        <Route path='/Anc_Board' element={ <Anc_Board /> } />
        <Route path='/Anc_DetailForm/:num' element={ <Anc_DetailForm /> } />

        <Route path='/Anc_DetailForm/:num/Anc_EditForm/:num' element={ <Anc_EditForm /> } /> 
        <Route path='*' element={<div>없는 페이지 입니다.</div>} />
      </Routes>

       
    </div>
  );
}


export default App;
