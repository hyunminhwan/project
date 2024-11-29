import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import './DetailFormCss.css'; 

function Anc_DetailForm() {
    const [announcement, setAnnouncement] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { boardNo } = location.state || {}; 
    const loginToMember = useSelector((state) => state.loginMember);

    const formatDate = (date) => {
        if (!date) return '';
        return date.replace(' ', '').substring(0, 16);
    };
    
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
        navigate(`/Anc_EditForm`, { state: { boardNo } });
    };

    return (
        <div className="Noticeboard_form">
            <br/><br/><br/>
            <h1>Notice Board</h1>
            <br/>
            <form>
                <table>
                    <tbody>
                        <tr>
                            <td className="Title_td">제목</td>
                            <td className="Title_td">
                                <input
                                    name="boardTitle"
                                    value={announcement.boardTitle}
                                    readOnly
                                />
                            </td>
                            <td className="Title_td">작성자</td>
                            <td className="Title_td">
                                <input
                                    name="managerId"
                                    value={announcement.managerId}
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="Title_td">작성일</td>
                            <td className="Title_td">
                                <input
                                    type="datetime-local"
                                    name="date"
                                    value={formatDate(announcement.boardCreateDate)}
                                    readOnly
                                />
                            </td>
                            <td className="Title_td">수정일</td>
                            <td className="Title_td">
                                <input
                                    type="datetime-local"
                                    name="updateDate"
                                    value={formatDate(announcement.boardUpdateDate)}
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="Title_td">내용</td>
                            <td className="Title_td" colSpan="3">
                                <textarea
                                    name="boardContent"
                                    value={announcement.boardContent}
                                    readOnly
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className='DetailForm_Button'>
                {loginToMember.member?.loginType === 3 && (
                    <button id="Anc_Detail_button"type="button" onClick={() => handleEditClick(announcement.boardNo)}>수정하기</button>
                )}
                </div>
            </form>
        </div>
    );
}

export default Anc_DetailForm;
