import './Announcement.css';
import axios from "axios";
import { useEffect, useState } from "react";

<link rel="stylesheet" href="https://fonts.google.com/specimen/Stylish?preview.text=scard%0A&script=Kore"></link>

function Announcement() {
    const [write, setWrite] = useState([]);
    useEffect(() => {
        axios.get("/board/write")
            .then((board) => {
                console.log(board.data)
                setWrite(board.data);
            })
            .catch(() => {
                console.log("실패")
            })
    }, [])
    return (
        <>
            <h1> 공지 사항</h1>
            <br /><br /><br /><br /><br /><br />
            <table align="center" style={{ border: ' 1px solid ' }}>
                <thead>
                    <tr >
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
                                <tr>
                                    <td>{p.boardNo}</td>
                                    <td onClick={() => {'/AnnouncementdetailForm'}}>{p.boardTitle}</td>
                                    <td>{p.managerId}</td>
                                    <td>{p.boardCount}</td>
                                    <td>{p.boardCreateDate}</td>
                                </tr>                              
                            ))
                        }
                </tbody>
            </table>
            <hr />

        </>
    )
}

export default Announcement;