import { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import "./temaListCss.css";

function TemaList() {
    let [menuList, setMenuList] = useState([]);

    let [filterMenuList, setFilterMenuList] = useState([]);
    let [filter, setfilter] = useState({
        genre: '',
        location: '',
        difficulty: '',
        personnel: ''
    });
    let [search, setSearch] = useState("");

    const navigate = useNavigate();

    //페이지가 열렸을때 모든테마를 가져옴
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

    
    let [menuCount, setMenuCount] = useState(9);
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
                            <input
                                type="text"
                                placeholder="테마 이름을 검색해 주세요."
                                value={search}
                                onChange={(c) => setSearch(c.target.value)}
                            />
                            <Col md={3}>
                                    <label>장르</label>
                                    <select name="genre" onChange={FilterChange}>
                                        <option value="">전체</option>
                                        <option value="미스터리">미스터리</option>
                                        <option value="호러">호러</option>
                                        <option value="스릴러">스릴러</option>
                                        <option value="추리">추리</option>
                                        <option value="판타지">판타지</option>
                                        <option value="어드벤처">어드벤처</option>
                                    </select>
                            </Col>
                            <Col md={3}>
                                    <label>지역</label>
                                    <select name="location" onChange={FilterChange}>
                                        <option value="">전체</option>
                                        <option value="서울">서울</option>
                                        <option value="경기">경기</option>
                                        <option value="인천">인천</option>
                                        <option value="대구">대구</option>
                                        <option value="부산">부산</option>
                                    </select>
                            </Col>
                            <Col md={3}>
                                    <label>난이도</label>
                                    <select name="difficulty" onChange={FilterChange}>
                                        <option value="">전체</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </select>
                            </Col>
                            <Col md={3}>
                                    <label>인원수</label>
                                    <select name="personnel" onChange={FilterChange}>
                                        <option value="">전체</option>
                                        <option value={2}>2명</option>
                                        <option value={3}>3명</option>
                                        <option value={4}>4명</option>
                                        <option value={5}>5명</option>
                                        <option value={6}>6명</option>
                                    </select>
                            </Col>
                        </Row>
                    </Form>
                </Row>
                <Row>
                    {filterMenuList.slice(0, menuCount).map((menu, i) => (
                       <Col lg={4} key={i} onClick={() => temaCount(menu)} style={{ cursor: 'pointer' }}>
                       <div className="TemaList_Card">
                           <img src={menu.imgUrl} alt="테마 이미지" />
                           <div> {menu.temaName}</div>
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
