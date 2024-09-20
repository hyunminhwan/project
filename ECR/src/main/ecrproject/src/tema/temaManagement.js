import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import './temaManagementCss.css'; // CSS 파일 임포트

function TemaManagement() {
    const [temaList, setTemaList] = useState([]);
    const [temaCount, setTemaCount] = useState(10);

    const loadMore = () => {
        setTemaCount((prevCount) => prevCount + 10);
    };

    useEffect(() => {
        axios.get(`/api/menu`)
            .then((result) => {
                setTemaList(result.data);
            })
            .catch(() => {
                console.log("테마 목록을 가져오는 중 실패했습니다");
            });
    }, []);

    const temaDelete = (temaNo, imgUrl) => {
        if (window.confirm("정말로 이 테마를 삭제하시겠습니까?")) {
            axios.delete(`/api/delete/${temaNo}`, {
                data: { imgUrl }
            })
                .then(() => {
                    alert("테마가 삭제되었습니다.");
                    axios.get(`/api/menu`)
                        .then((result) => {
                            setTemaList(result.data);
                        })
                        .catch(() => {
                            console.log("테마 목록을 가져오는 중 실패했습니다");
                        });
                })
                .catch(() => {
                    alert("테마 삭제에 실패했습니다.");
                });
        }
    };

    return (
        <div className="tema-management">
            <table className="tema-table">
                <thead>
                    <tr>
                        <th className="title-column">아이디</th>
                        <th className="title-column">테마번호</th>
                        <th className="title-column">이미지</th>
                        <th className="title-column">카페이름</th>
                        <th className="title-column">테마이름</th>
                        <th className="title-column">가격</th>
                        <th className="title-column">소요시간</th>
                        <th className="title-column">테마설명</th>
                        <th className="title-column">최대 인원</th>
                        <th className="title-column">난이도</th>
                        <th className="title-column">장르</th>
                        <th className="title-column">관리</th>
                    </tr>
                </thead>
                <tbody>
                    {temaList.slice(0, temaCount).map((tema) => (
                        <tr key={tema.temaNo}>
                            <td>{tema.memberId}</td>
                            <td>{tema.temaNo}</td>
                            <td><img src={tema.imgUrl} alt="테마 이미지" className="tema-image" /></td>
                            <td>{tema.cafeName}</td>
                            <td>{tema.temaName}</td>
                            <td>{tema.price}</td>
                            <td>{tema.timetaken}</td>
                            <td>{tema.temaContent}</td>
                            <td>{tema.personnel}</td>
                            <td>{tema.difficulty}</td>
                            <td>{tema.genre}</td>
                            <td>
                                <Button className="delete-button" onClick={() => temaDelete(tema.temaNo, tema.imgUrl)}>
                                    삭제하기
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {temaCount < temaList.length && (
                <button className="load-more-button" onClick={loadMore}>
                    더보기&emsp;{Math.min(temaCount, temaList.length)}/{temaList.length}
                </button>
            )}
        </div>
    );
}

export default TemaManagement;
