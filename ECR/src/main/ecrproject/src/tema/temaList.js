import { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import "./temaListCss.css";

function TemaList() {
    let [menuList, setMenuList] = useState([]);
    let [menuCount, setMenuCount] = useState(9);
    let [filterMenuList, setFilterMenuList] = useState([]);
    let [filter, setfilter] = useState({
        genre: '',
        location: '',
        difficulty: '',
        personnel: ''
    });
    let [search, setSearch] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/menu')
            .then((result) => {
                setMenuList(result.data);
            })
            .catch(() => {
                console.log('실패');
            });
    }, []);

    useEffect(() => {
        let filters = menuList.filter(menu =>
            (!filter.genre || menu.genre === filter.genre) &&
            (!filter.location || menu.location === filter.location) &&
            (!filter.difficulty || menu.difficulty === parseInt(filter.difficulty)) &&
            (!filter.personnel || menu.personnel === parseInt(filter.personnel)) &&
            (menu.temaName.includes(search))
        );
        setFilterMenuList(filters);
    }, [filter, menuList, search]);

    const loadMore = () => {
        setMenuCount(p => p + 9);
    };

    const FilterChange = (e) => {
        const { name, value } = e.target;
        setfilter({
            ...filter,
            [name]: value
        });
    };

    const temaCount = (menu) => {
        axios.put(`/api/${menu.temaNo}/count`)
            .then((result) => {
                const menus = result.data;
                navigate(`/detail`, { state: { menus } });
            })
            .catch(() => {
                console.log("조회수 증가에 실패 했습니다.");
            });
    };

    return (
        <div>
            <Container>
                <Row className="TemaList_Filter">
                    <Form>
                        <Row>
                            <h4>검색 </h4>
                            <input
                                type="text"
                                placeholder="테마 이름을 검색해 주세요"
                                value={search}
                                onChange={(c) => setSearch(c.target.value)}
                            />
                            <Col md={3}>
                                <Form.Group controlId="genre">
                                    <Form.Label>장르</Form.Label>
                                    <Form.Select name="genre" onChange={FilterChange}>
                                        <option value="">전체</option>
                                        <option value="미스터리">미스터리</option>
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
                                    <Form.Select name="location" onChange={FilterChange}>
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
                                    <Form.Select name="difficulty" onChange={FilterChange}>
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
                                    <Form.Select name="personnel" onChange={FilterChange}>
                                        <option value="">전체</option>
                                        <option value={2}>2명</option>
                                        <option value={3}>3명</option>
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
                    {filterMenuList.slice(0, menuCount).map((menu, i) => (
                       <Col lg={4} key={i} onClick={() => temaCount(menu)} style={{ cursor: 'pointer' }}>
                       <div className="TemaList_Card">
                           <img src={menu.imgUrl} alt="테마 이미지" />
                           <div> {menu.cafeName}</div>
                           <StarRatings
                               rating={menu.difficulty}
                               starRatedColor="red"
                               numberOfStars={5}
                               starDimension="24px"
                               starSpacing="2px"
                           />
                       </div>
                   </Col>
                    ))}
                </Row>
                {menuCount < menuList.length && (
                    <div className="TemaList_Text">
                        <Button size="lg" onClick={loadMore} variant="primary">
                            더보기 {Math.min(menuCount, filterMenuList.length)}/{filterMenuList.length}
                        </Button>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default TemaList;
