import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './EditFormCss.css';

function Anc_EditForm() {
    const location = useLocation();
    const { boardNo } = location.state;
    const [announcement, setAnnouncement] = useState({
        boardNo: boardNo,
        boardTitle: '',
        managerId: '',
        boardCreateDate: '',
        boardUpdateDate: '',
        boardContent: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/board/form/${boardNo}`)
            .then((response) => {
                const data = response.data;
                const formatDate = (date) => {
                    if (!date) return '';
                    return date.replace(' ', 'T').substring(0, 16);
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
            <div className="Anc_EditForm">
                <br/><br/><br/>
                <h1>Rewrite</h1>
                <br/><br/>
                <form onSubmit={Anc_Submit}>
                    <table align='center'>
                        <tbody>
                            <tr>
                                <td>제목</td>
                                <td>
                                    <input
                                        name="boardTitle"
                                        value={announcement.boardTitle}
                                        onChange={Anc_Change}
                                    />
                                </td>
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
                                <td colSpan="3">
                                    <textarea
                                        name="boardContent"
                                        value={announcement.boardContent}
                                        onChange={Anc_Change}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="EditForm_Button">
                        <button id="edit_button" type="submit">저장하기</button>
                        <button id="edit_button" type="button" onClick={() => anc_delete(announcement.boardNo)}>삭제하기</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Anc_EditForm;
