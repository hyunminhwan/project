import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Location from "./location";
import Review from "./review";
import AvgRating from "./avgRating";
import { useSelector } from "react-redux";
import './detailCss.css';

function Detail() {
    const location = useLocation();
    const { menus } = location.state || {};
    const navigate = useNavigate();
    const loginToMember = useSelector((state) => state.loginMember) || null;

    return (
        <>
            <Container className="Detail_Con">
                <br/><br/>
                <Row className="Detail_Top">
                    {/* 테마 이미지 */}
                    <Col md={7} className="Tema_Image">
                        <img id="a" src={`${process.env.PUBLIC_URL}/img/room${menus.temaNo}.jpg`} alt="테마 이미지" />
                        <br/><br/>
                        {/* 지도 */}
                        <div className="MAP">
                            <Location latitude={menus.latitude} longitude={menus.longitude} />
                        </div>
                    </Col>
                    {/* 정보 섹션 및 댓글 */}
                    <Col md={5}>
                        <div className="DIV">
                            <div className="info-section">
                                <h2>{menus.temaName}</h2>
                                <div id="content">{menus.temaContent}</div>
                                <br/>
                                <div id="content">장르 &emsp; {menus.genre}</div>
                                <div id="content">난이도 &emsp; {menus.difficulty}</div>
                                <div id="content">인원수 &emsp; {menus.personnel}</div>
                                <div id="content">가격 {menus.price}원</div>
                                <br/>
                                <AvgRating temaNo={menus.temaNo} />
                            </div>
                            
                            {/* 댓글 */}
                            <div className="Comment">
                                <Review temaNo={menus.temaNo} />
                            </div>
                        </div>
                    </Col>
                </Row>
                
                {/* 후기 작성 */}
                <Row className="Review">
                    <Col md={8}>
                    <br/><br/>
                        {loginToMember?.member ? (
                            <Button id="button_a" onClick={() => {
                                navigate('/reserve', { state: { menus } });
                            }}>예약하기</Button>
                        ) : (
                            <h2>로그인후 예약해주세요</h2>
                        )}
                    </Col>
                </Row>

                <div>등록일: {menus.temaCreatedDate.slice(0, 10)}</div>
            </Container>
        </>
    );
}

export default Detail;
