import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function Anc_EditForm() {
    const location = useLocation(); // URL에서 boardNo 가져오기
    const { boardNo } = location.state

    const [announcement, setAnnouncement] = useState({
        boardTitle: '',
        managerId: '',
        boardCreateDate: '',
        boardUpdateDate: '',
        boardContent: ''
    });

    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    useEffect(() => {
        axios.get(`/board/form/${boardNo}`)
             .then((response) => {
                setAnnouncement(response.data);
             })
             .catch(() => {
                console.log("데이터 로드 실패");
             });
    }, [boardNo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnnouncement((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/board/form/${boardNo}`, announcement)
            .then(() => {
                navigate('/Anc_DetailForm',{ state: { boardNo } });
            })
            .catch(() => {
                console.log("수정 실패");
            });
    };

    return (
        <>
            <h1>게시판 수정</h1>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>제목</td>
                            <td>
                                <input
                                    name="boardTitle"
                                    value={announcement.boardTitle}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>작성자</td>
                            <td>
                                <input
                                    name="managerId"
                                    value={announcement.managerId}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>작성일</td>
                            <td>
                                <input
                                    type="datetime-local"
                                    name="boardCreateDate"
                                    value={announcement.boardCreateDate}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>수정일</td>
                            <td>
                                <input
                                    type="datetime-local"
                                    name="boardUpdateDate"
                                    value={announcement.boardUpdateDate}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>내용</td>
                            <td>
                                <textarea
                                    name="boardContent"
                                    value={announcement.boardContent}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">저장하기</button>
            </form>
        </>
    );
}

export default Anc_EditForm;
