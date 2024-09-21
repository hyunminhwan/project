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
                    <Col md={7} className="Detail_Tema_Image">
                        {/* <img id="a" src={`${process.env.PUBLIC_URL}/img/room${menus.temaNo}.jpg`} alt="테마 이미지" /> */}
                        <img src={menus.imgUrl} alt="테마 이미지" />
                        <br/><br/>
                        {/* 지도 */}
                        <div className="Detail_MAP">
                            <Location latitude={menus.latitude} longitude={menus.longitude} />
                        </div>
                    </Col>
                    {/* 정보 섹션 및 댓글 */}
                    <Col md={5}>
                        <div className="DIV">
                            <div className="Detail_Section">
                                <h2>{menus.temaName}</h2>
                                <div id="Detail_Content">{menus.temaContent}</div>
                                <br/>
                                <div id="Detail_Content">장르 &emsp; {menus.genre}</div>
                                <div id="Detail_Content">난이도 &emsp; {menus.difficulty}</div>
                                <div id="Detail_Content">인원수 &emsp; {menus.personnel}</div>
                                <div id="Detail_Content">가격 {menus.price}원</div>
                                <br/>
                                <AvgRating temaNo={menus.temaNo} />
                            </div>
                            
                            {/* 댓글 */}
                            <div className="Detail_Comment">
                                <Review temaNo={menus.temaNo} />
                            </div>
                        </div>
                    </Col>
                </Row>
                
                {/* 후기 작성 */}
                <Row className="Detail_Review">
                    <Col md={8}>
                    <br/><br/>
                        {loginToMember?.member ? (
                            <Button id="Detail_button" onClick={() => {
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
