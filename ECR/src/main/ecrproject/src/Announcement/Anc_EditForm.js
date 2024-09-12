import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Anc_EditForm() {
    const location = useLocation();
    const { boardNo } = location.state; // URL에서 boardNo 가져오기
    const [announcement, setAnnouncement] = useState({
        boardNo: boardNo,
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
                const data = response.data;
                // 날짜 형식 변환 (YYYY-MM-DDTHH:MM)
                const formatDate = (date) => {
                    if (!date) return '';
                    return date.replace(' ', 'T').substring(0, 16); // e.g. '2024-08-05 10:00:00' -> '2024-08-05T10:00'
                };
                setAnnouncement({
                    boardNo: data.boardNo || '',
                    boardTitle: data.boardTitle || '',
                    managerId: data.managerId || '',
                    boardCreateDate: formatDate(data.boardCreateDate) || '',
                    boardUpdateDate: formatDate(data.boardUpdateDate) || '',
                    boardContent: data.boardContent || ''
                });
            })
            .catch(() => {
                console.log("데이터 로드 실패");
            });
    }, [boardNo]);

    // 삭제 함수 
    const anc_delete = (e) => { 
        if(window.confirm("삭제하시겠습니까?")){
        axios.delete(`/board/delete/${e}`)
             .then(() => {
                alert("삭제되었습니다.");
                navigate('/Anc_Board');
             })
             .catch(()=>{
                console.log("삭제오류~")
             })
        }else{
            alert("삭제가 취소되었습니다.");
        }
    }
    const Anc_Change = (e) => {
        const { name, value } = e.target;
        setAnnouncement((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // 수정 함수
    const Anc_Submit = (e) => {
        e.preventDefault();
        axios.put(`/board/retouch`, announcement)
            .then(() => {
                navigate(`/Anc_DetailForm`, { state: { boardNo } });
            })
            .catch(() => {
                console.log("수정 실패");
            });
    };

    return (
        <>
            <br /><br />
            <h1>게시판 수정</h1>
            {/* Anc_Submit (수정)함수 사용 */}
            <form onSubmit={Anc_Submit}>
                <br /><br /><br />
                <table align='center'>
                    <tbody>
                        <tr>
                            <td>번호</td>
                            <td>
                                <input
                                    name="boardNo"
                                    value={announcement.boardNo}
                                    // Anc_Change (삭제) 함수 사용
                                    onChange={Anc_Change}
                                    readOnly
                                />
                            </td>

                        </tr>
                        <tr>
                            <td>제목</td>
                            <td>
                                <input
                                    name="boardTitle"
                                    value={announcement.boardTitle}
                                    onChange={Anc_Change}
                                />

                            </td>
                        </tr>
                        <tr>
                            <td>작성자</td>
                            <td>
                                <input
                                    name="managerId"
                                    value={announcement.managerId}
                                    onChange={Anc_Change}
                                    readOnly
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
                                    onChange={Anc_Change}
                                    readOnly
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
                                    onChange={Anc_Change}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>내용</td>
                            <td>
                                <textarea
                                    name="boardContent"
                                    value={announcement.boardContent}
                                    onChange={Anc_Change}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br></br>
                <button >저장하기</button> &emsp;
                <button type="button" onClick={()=>anc_delete(announcement.boardNo)}>삭제하기</button>
            </form>
        </>
    );
}

export default Anc_EditForm;
