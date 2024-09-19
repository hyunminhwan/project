import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";


function TemaManagement() {
    const [temaList, setTemaList] = useState([]);
    const [temaCount,setTemaCount]=useState(10);

    const loadMore = () => {
        setTemaCount(p => p + 10);
    };
    //카페이름과 같은 모든 테마들 가져오기
    useEffect(() => {
        axios.get(`/api/menu`)
            .then((result) => {
                setTemaList(result.data);
            })
            .catch(() => {
                console.log("수정자료를 가져오는중 실패했습니다")
            })
    }, [])

    const temaDelete = (temaNo, imgUrl) => {
        if (window.confirm("정말로 이 테마를 삭제하시겠습니까?")) {
            axios.delete(`/api/delete/${temaNo}`, {

                // 이미지 URL을 서버로 전달
                data: { imgUrl }
            })
                .then(() => {
                    alert("테마가 삭제되었습니다.");

                    // 테마 목록을 다시 가져오거나 화면에서 해당 항목을 제거
                    axios.get(`/api/menu`)
                        .then((result) => {
                            setTemaList(result.data);
                        })
                        .catch(() => {
                            console.log("수정자료를 가져오는중 실패했습니다")
                        })

                })
                .catch(() => {
                    alert("테마 삭제에 실패했습니다.");
                });
        }
    };

    return (
        <>
            <table>

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

                {
                    temaList.slice(0,temaCount).map((tema) => {
                        return (
                            <tr>
                                <td>{tema.memberId}</td>
                                <td>{tema.temaNo}</td>
                                <td><img src={tema.imgUrl} alt="테마이미지" /></td>
                                <td>{tema.cafeName}</td>
                                <td>{tema.temaName}</td>
                                <td>{tema.price}</td>
                                <td>{tema.timetaken}</td>
                                <td>{tema.temaContent}</td>
                                <td>{tema.personnel}</td>
                                <td>{tema.difficulty}</td>
                                <td>{tema.genre}</td>
                                <td>
                                    <Button type="button" onClick={() => {
                                        temaDelete(tema.temaNo, tema.imgUrl)
                                    }}>삭제하기</Button>
                                </td>
                            </tr>

                        )

                    })
                }
            </table>
            {temaCount<temaList.length &&(
                <button type="button" onClick={loadMore}>더보기&emsp;{Math.min(temaCount,temaList.length)}/{temaList.length} </button>
            )}
            
        </>
    )

}

export default TemaManagement;