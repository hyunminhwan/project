import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import './temaManagementCss.css';  // 스타일 파일 추가

function TemaManagement() {
    const [temaList, setTemaList] = useState([]);
    const [temaCount, setTemaCount] = useState(10);

    const loadMore = () => {
        setTemaCount(p => p + 10);
    };

    useEffect(() => {
        axios.get('/api/menu')
            .then((result) => {
                setTemaList(result.data);
            })
            .catch(() => {
                console.log("수정자료를 가져오는중 실패했습니다");
            });
    }, []);

    const temaDelete = (temaNo, imgUrl) => {
        if (window.confirm("정말로 이 테마를 삭제하시겠습니까?")) {
            axios.delete(`/api/delete/${temaNo}`, {
                data: { imgUrl }
            })
                .then(() => {
                    alert("테마가 삭제되었습니다.");
                    axios.get('/api/menu')
                        .then((result) => {
                            setTemaList(result.data);
                        })
                        .catch(() => {
                            console.log("수정자료를 가져오는중 실패했습니다");
                        });
                })
                .catch(() => {
                    alert("테마 삭제에 실패했습니다.");
                });
        }
    };

    return (
        <>
            <div className="TemaManagement_Table_Container">
                <table className="TemaManagement_Table">
                    <thead>
                        <tr>
                            <th>아이디</th>
                            <th>테마번호</th>
                            <th>이미지</th>
                            <th>카페이름</th>
                            <th>테마이름</th>
                            <th>가격</th>
                            <th>소요시간</th>
                            <th>테마설명</th>
                            <th>최대 인원</th>
                            <th>난이도</th>
                            <th>장르</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            temaList.slice(0, temaCount).map((tema) => {
                                return (
                                    <tr key={tema.temaNo}>
                                        <td>{tema.memberId}</td>
                                        <td>{tema.temaNo}</td>
                                        <td><img src={tema.imgUrl} alt="테마이미지" className="TemaManagement_Img" /></td>
                                        <td>{tema.cafeName}</td>
                                        <td>{tema.temaName}</td>
                                        <td>{tema.price}</td>
                                        <td>{tema.timetaken}</td>
                                        <td>{tema.temaContent}</td>
                                        <td>{tema.personnel}</td>
                                        <td>{tema.difficulty}</td>
                                        <td>{tema.genre}</td>
                                        <td>
                                            <Button variant="danger" onClick={() => temaDelete(tema.temaNo, tema.imgUrl)}>삭제하기</Button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                {temaCount < temaList.length && (
                    <button className="TemaManagement_Button" onClick={loadMore}>
                        더보기 {Math.min(temaCount, temaList.length)}/{temaList.length}
                    </button>
                )}
            </div>
        </>
    );
}

export default TemaManagement;
