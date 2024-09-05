import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate,} from 'react-router-dom';
import { Navbar, Container, Nav, Row} from 'react-bootstrap';
import TemaList from './tema/temaList';
import Detail from './tema/detail';
import InsertTema from './tema/insertTema';

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
          <Navbar.Brand >방탈출</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/list')}}>테마</Nav.Link>
            <Nav.Link onClick={() => { navigate('/InsertTema')}}>테마 등록</Nav.Link>
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
        <Route path='/InsertTema' element={ <InsertTema /> } />  
        <Route path='*' element={<div>없는 페이지 입니다.</div>} />
      </Routes>

       
    </div>
  );
}


export default App;
