import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Location from "./location";
import Review from "./review";
function Detail() {
    const location = useLocation();
    const { menu } = location.state;

    

    return (
        <>
        
            <Container>
                <Row>
                    <Col>
                        <img id="a" src={`${process.env.PUBLIC_URL}/img/room${menu.temaNo}.jpg`} alt="테마 이미지" />
                        
                        <div>테마번호 : {menu.temaNo}</div>
                        <div>조회수 : {menu.temacount}</div>
                        <h2>테마이름 : {menu.temaName}</h2>
                        <div>카페이름 : {menu.cafeName}</div>
                        <div>장르 : {menu.genre}</div>
                        <div>지역 : {menu.location}</div>
                        <div>난이도 : {menu.difficulty}</div>
                        <div>내용 : {menu.temaContent}</div>
                        <div>평점 : {menu.rating}</div>
                        <div>소요시간 : {menu.timetaken}분</div>
                        <div>가격 : {menu.price} 원</div>
                        <div>인원수 : {menu.personnel}</div>
                        <div>등록일 : {menu.temaCreatedDate.slice(0, 10)}</div>

                        <br />
                        <Button>예약하기</Button>
                    </Col>
                </Row>
                <Location/>
                <Review temaNo={menu.temaNo}/>
            </Container >
           
            
        </>
    )


}

export default Detail;