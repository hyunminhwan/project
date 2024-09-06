import './Announcement.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

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
                console.log("실패")
            })
    }, [])

    // map(p)의 onClick 할 시 쓰이는 함수 
    const handleRowClick = (boardNo) => {
        navigate(`/Anc_DetailForm`,{ state: { boardNo } });
      
    };

    return (
        <>
            <h1> 공지 사항</h1>
            <br /><br /><br /><br /><br /><br />
            <table align="center" style={{ border: ' 1px solid ' }}>
                <thead>
                    <tr>
                        <th> 글 번호 </th>
                        <th> 제목 </th>
                        <th> 작성자 </th>
                        <th> 조회수 </th>
                        <th> 작성일 </th>
                    </tr>
                </thead>
                <tbody>
                        {
                            write.map((p) => (                               
                                // 클릭시 AnnouncementdetailForm으로 이동
                                
                                <tr key={p.boardNo} onClick={() => handleRowClick(p.boardNo)}>
                                    <td>{p.boardNo}</td>
                                    <td>{p.boardTitle}</td>
                                    <td>{p.managerId}</td>
                                    <td>{p.boardCount}</td>
                                    <td>{p.boardCreateDate}</td>
                                </tr>                              
                            ))
                        }
                </tbody>
            </table>
            

        </>
    )
}

export default Anc_Board;