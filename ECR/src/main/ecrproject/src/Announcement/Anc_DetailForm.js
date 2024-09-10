import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";

function Anc_DetailForm() {
    const [announcement, setAnnouncement] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { boardNo } = location.state || {}; // boardNo를 location.state에서 가져옵니다.

    useEffect(() => {
        if (boardNo) {
            axios.get(`/board/form/${boardNo}`)
                .then((response) => {
                    setAnnouncement(response.data);
                })
                .catch(() => {
                    console.log("데이터 로드 실패");
                });
        }
    }, [boardNo]);

    if (!announcement) return <p>로딩 중...</p>;

    const handleEditClick = (boardNo) => {
        navigate(`Anc_EditForm/${boardNo}`);
    };

    return (
        <>
            <br/><br/>
            <h1>게시판 상세조회</h1>
            <br/><br/><br/><br/>
            <form>
                <table align='center'>
                    <tbody>
                        <tr>
                            <td>제목</td>
                            <td>
                                <input
                                    name="boardTitle"
                                    value={announcement.boardTitle}
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>작성자</td>
                            <td>
                                <input
                                    name="managerId"
                                    value={announcement.managerId}
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>작성일</td>
                            <td>
                                <input
                                    type="datetime-local"
                                    name="date"
                                    value={announcement.boardCreateDate}
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>수정일</td>
                            <td>
                                <input
                                    type="datetime-local"
                                    name="updateDate"
                                    value={announcement.boardUpdateDate}
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>내용</td>
                            <td>
                                <textarea
                                    name="boardContent"
                                    value={announcement.boardContent}
                                    readOnly
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <button type="button" onClick={()=>{handleEditClick(announcement.boardNo)}}>수정하기</button>
            </form>
        </>
    );
}

export default Anc_DetailForm;
