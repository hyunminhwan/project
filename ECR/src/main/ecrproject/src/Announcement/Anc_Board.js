import './Announcement.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import'./test.css';
function Anc_Board() {
    const navigate = useNavigate();
    const [write, setWrite] = useState([]);

    useEffect(() => {
        axios.get("/board/write")
            .then((board) => {
                console.log(board.data);
                setWrite(board.data);
            })
            .catch(() => {
                console.log("실패");
            });
    }, []);

    // boardNo에 포함된 내용을 저장해주는 함수
    const handleRowClick = (boardNo) => {
        navigate(`/Anc_DetailForm`, { state: { boardNo } });
    };

    // 버튼 누르면 Anc_List 넘어가게 해주는 함수
    const ListClick = () => {
        navigate(`/Anc_List`);
    }

    return (
        <div className="anc-board-container">
            <h1>공지 사항</h1>
            <br/>
            {/* ListClick 함수 씀 */}
            <button type="button" onClick={() => ListClick()}>글쓰기</button>
            <br/>
            <br/>
            <table className="anc-board-table">
                <thead>
                    <tr>
                        <th>글 번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>조회수</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {write.map((p) => (
                        // handleRowClick 함수를 씀
                        <tr key={p.boardNo} onClick={() => handleRowClick(p.boardNo)}>
                            <td>{p.boardNo}</td>
                            <td>{p.boardTitle}</td>
                            <td>{p.managerId}</td>
                            <td>{p.boardCount}</td>
                            <td>{p.boardCreateDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Anc_Board;
