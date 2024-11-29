import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import'./BoardCss.css';
import { useSelector } from 'react-redux';
function Anc_Board() {
    const navigate = useNavigate();
    const [write, setWrite] = useState([]);
    const [Nowpage, setPage] = useState(0); // 현재 페이지 번호
    const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
    const [totalElements, setTotalElements] = useState(0); // 전체 글 갯수
    const loginToMember = useSelector((state) => state.loginMember);
   
    useEffect(() => {
        PageList(Nowpage); // 페이지 변경 시 데이터 요청
    }, [Nowpage]);

    // boardNo에 포함된 내용을 저장해주는 함수
    const Anc_DetailForm = (boardNo) => {
        navigate(`/Anc_DetailForm`, { state: { boardNo } });
    };

    // 버튼 누르면 Anc_List 넘어가게 해주는 함수
    const ListClick = () => {
        navigate(`/Anc_List`);
    }

    const PageList = (Nowpage) => {
        axios.get(`/board/list/${Nowpage}/5`) // 백엔드에서 페이지와 크기 요청
        .then((result) => {
            setWrite(result.data.content); // 현재 페이지의 공지 데이터
            setTotalPages(result.data.totalPages); // 전체 페이지 수
            setTotalElements(result.data.totalElements); // 전체 글 수
        })
        .catch(() => {
            console.log("데이터 가져오기 실패");
        });
    }

    // 다음 페이지로 이동하는 함수
    const nextPage = () => {
        if (Nowpage < totalPages - 1) {
            setPage(Nowpage + 1);
        }
    };

    // 이전 페이지로 이동하는 함수
    const prevPage = () => {
        if (Nowpage > 0) {
            setPage(Nowpage - 1);
        }
    };

    return (
        <div className="Anc_Container">
            <br /><br /><br /><br />
            <h1>Announcement</h1>
            <br/>
            {/* ListClick 함수 씀 */}
            {loginToMember.member?.loginType ===3 &&(
                <button id="Write_button" type="button" onClick={() => ListClick()}>글쓰기</button>
            )
            }
           
            <br/>
            <br/><br/>
            <table className="Anc_Table">
                <thead>
                    <tr>
                        <th id="Anc">글 번호</th>
                        <th id="Anc">제목</th>
                        <th id="Anc">작성자</th>
                        <th id="Anc">조회수</th>
                        <th id="Anc">작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {write.map((p,i) => (
                        // Anc_DetailForm 함수를 씀
                        <tr key={p.boardNo} onClick={() => Anc_DetailForm(p.boardNo)}>
                            <td>{totalElements - (Nowpage * 5 + i)}</td> 
                            <td>{p.boardTitle}</td>
                            <td>{p.managerId}</td>
                            <td>{p.boardCount}</td>
                            <td>{p.boardCreateDate.slice(0,10)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="Anc_pagination">
                < br/>< br/>< br/>< br/>
                <button id="Anc_Before_button" onClick={prevPage} disabled={Nowpage === 0}>Before</button>&emsp;
                <span className="Anc_Board_Page">{Nowpage + 1} / {totalPages}</span> &emsp;
                <button id="Anc_Next_button" onClick={nextPage} disabled={Nowpage === totalPages - 1}>Next</button>
            </div>
        </div>
    );
}

export default Anc_Board;