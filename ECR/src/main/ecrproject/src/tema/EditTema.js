import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './EditTemaCss.css';

function EditTema() {
    const navigate = useNavigate();
    const loginToMember = useSelector((state) => state.loginMember);
    const [temaList, setTemaList] = useState([]);
    const memberId = loginToMember.member.memberId;

    // memberId와 같은 모든 테마들 가져오기
    useEffect(() => {
        axios.get(`/api/edittema/${memberId}`)
            .then((result) => {
                setTemaList(result.data);
            })
            .catch(() => {
                console.log("수정자료를 가져오는 중 실패했습니다");
            });
    }, [memberId]);

    const temaDelete = (temaNo, imgUrl) => {
        if (window.confirm("리뷰도 같이 삭제됩니다. 삭제하시겠습니까?")) {
            axios.delete(`/api/delete/${temaNo}`, {
                // 이미지 URL을 서버로 전달
                data: { imgUrl }
            })
            .then(() => {
                alert("테마가 삭제되었습니다.");
                // 테마 목록을 다시 가져오거나 화면에서 해당 항목을 제거
                axios.get(`/api/edittema/${memberId}`)
                .then((result) => {
                    setTemaList(result.data);
                })
                .catch(() => {
                    console.log("수정자료를 가져오는 중 실패했습니다");
                });
            })
            .catch(() => {
                alert("테마 삭제에 실패했습니다.");
            });
        }
    };

    return (
        <div className="Eedit_Container">
            <h1>테마 수정 관리</h1>
            <table className="Edit_Table">
                <thead>
                    <tr>
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
                    {temaList.map((tema) => (
                        <tr key={tema.temaNo}>
                            <td>{tema.temaNo}</td>
                            <td><img src={tema.imgUrl} alt="테마이미지" className="Tema_Image" /></td>
                            <td>{tema.cafeName}</td>
                            <td>{tema.temaName}</td>
                            <td>{tema.price}</td>
                            <td>{tema.timetaken}</td>
                            <td>{tema.temaContent}</td>
                            <td>{tema.personnel}</td>
                            <td>{tema.difficulty}</td>
                            <td>{tema.genre}</td>
                            <td>
                                <Button className="Edit_Button" onClick={() => navigate("/Modify", { state: { tema } })}>
                                    수정하기
                                </Button>
                                &emsp;
                                <Button className="Edit_Button" onClick={() => temaDelete(tema.temaNo, tema.imgUrl)}>
                                    삭제하기
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EditTema;
