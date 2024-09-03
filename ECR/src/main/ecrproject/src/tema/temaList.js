import { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import {  useNavigate } from "react-router-dom";

function TemaList() {
    let [menuList, setMenuList] = useState([]); //bd에 있는 모든테마를 담을 변수 선언
    let [menuCount, setMenuCount] = useState(9); //  10개씩 보여주는 초기값 설정
    let [filteredMenuList, setFilteredMenuList] = useState([]); // 필터링된 테마 리스트
    let [filters, setFilters] = useState({
        genre: '',
        location: '',
        difficulty: '',
        personnel: ''
    });

    const navigate = useNavigate();



    useEffect(() => {
        axios.get('/api/menu')
            .then((result) => {
                setMenuList(result.data);
            })
            .catch(() => {
                console.log('실패');
            })
    }, [])

    useEffect(() => {
        // 필터 적용 로직
        let filtered = menuList.filter(menu =>
            (!filters.genre || menu.genre === filters.genre) &&
            (!filters.location || menu.location === filters.location) &&
            (!filters.difficulty || menu.difficulty === parseInt(filters.difficulty)) &&
            (!filters.personnel || menu.personnel === parseInt(filters.personnel))
        );
        setFilteredMenuList(filtered);
    }, [filters, menuList]);

    const loadMore = () => {
        setMenuCount(p => p + 9); //10개씩 추가로 보여주기
    }

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };
    return (
        <div>
            <Container>
                <Row>
                    <h4>카테고리</h4>
                    <Form>
                        <Row>
                            <Col md={3} >
                                <Form.Group controlId="genre">
                                    <Form.Label>장르</Form.Label>
                                    <Form.Select  name="genre" onChange={handleFilterChange}>
                                        <option value="">전체</option>
                                        <option value="공포">공포</option>
                                        <option value="호러">호러</option>
                                        <option value="SF">SF</option>
                                        <option value="추리">추리</option>
                                        <option value="판타지">판타지</option>
                                        <option value="어드벤처">어드벤처</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group controlId="location">
                                    <Form.Label>지역</Form.Label>
                                    <Form.Select  name="location" onChange={handleFilterChange}>
                                        <option value="">전체</option>
                                        <option value="서울">서울</option>
                                        <option value="부산">부산</option>
                                        <option value="대구">대구</option>
                                        <option value="인천">인천</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group controlId="difficulty">
                                    <Form.Label>난이도</Form.Label>
                                    <Form.Select  name="difficulty" onChange={handleFilterChange}>
                                        <option value="">전체</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group controlId="personnel">
                                    <Form.Label>인원수</Form.Label>
                                    <Form.Select  name="personnel" onChange={handleFilterChange}>
                                        <option value="">전체</option>
                                        <option value={4}>4명</option>
                                        <option value={5}>5명</option>
                                        <option value={6}>6명</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Row>
                <Row>
                    {
                        filteredMenuList.slice(0, menuCount).map((menu, i) => (
                            <Col lg={4} onClick={() => {
                                navigate(`/detail/${menu.temaNo}`, { state: { menu } })
                            }} style={{ cursor: 'pointer' }} >
                                <div className="tema">
                                    <img id="a" src={`${process.env.PUBLIC_URL}/img/room${menu.temaNo}.jpg`} alt="테마 이미지" />
                                    <div>테마번호 : {menu.temaNo}</div>
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
                                </div>
                            </Col>
                        ))
                    }
                </Row>
                {menuCount < menuList.length && ( // 모든 항목을 다 보여준 상태가 아니라면 버튼을 보여줍니다.
                    <div className="text-center">
                        <Button  size="lg" onClick={loadMore} variant="primary">더보기  {menuCount}/{filteredMenuList.length}</Button>
                    </div>
                )}
            </Container>


        </div>
    )
}

export default TemaList;