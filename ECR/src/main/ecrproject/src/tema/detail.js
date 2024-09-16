import { Button, Col, Container, Row } from "react-bootstrap";
import {useLocation, useNavigate } from "react-router-dom";
import Location from "./location";
import Review from "./review";
import AvgRating from "./avgRating";
import { useSelector } from "react-redux";
function Detail() {
    const location = useLocation();
    const { menus } = location.state;
    const navigate = useNavigate();
    const loginToMember = useSelector((state) => state.loginMember);
    return (
        <>
        
            <Container>
                <Row>
                    <Col>
                        <img id="a" src={`${process.env.PUBLIC_URL}/img/room${menus.temaNo}.jpg`} alt="테마 이미지" />
                        <img src={menus.imgUrl} alt="테마 이미지" />
                        
                        <div>테마번호 : {menus.temaNo}</div>
                        <div>조회수 : {menus.temaCount}</div>
                        <h2>테마이름 : {menus.temaName}</h2>
                        <div>카페이름 : {menus.cafeName}</div>

                        <div>장르 : {menus.genre}</div>
                        <div>지역 : {menus.location}</div>
                        <div>주소 : {menus.address}</div>
                        <div>난이도 : {menus.difficulty}</div>
                        <div>내용 : {menus.temaContent}</div>
                        <div>평점 : {menus.rating}</div>
                        <div>소요시간 : {menus.timetaken}분</div>
                        <div>가격 : {menus.price} 원</div>
                        <div>인원수 : {menus.personnel}</div>
                        <div>등록일 : {menus.temaCreatedDate.slice(0, 10)}</div>
                        <AvgRating temaNo={menus.temaNo}/>
                        <br />
                        {loginToMember?.member ? (
                          <Button onClick={()=>{
                            navigate('/reserve', { state: { menus } });
                        }}>예약하기</Button> 
                    ):(
                        <h2>로그인후 예약해주세요</h2>
                    )
                        }
                        
                    </Col>
                </Row>
                <Location latitude={menus.latitude} longitude={menus.longitude}/>
                <Review temaNo={menus.temaNo}/>
            </Container >
           
            
        </>
    )


}

export default Detail;