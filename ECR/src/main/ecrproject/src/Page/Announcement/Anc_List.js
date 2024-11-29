import React, { useState } from 'react';
import axios from 'axios';
import './ListCss.css'; // Anc_List.css 파일을 임포트
import { useSelector } from 'react-redux';


function Anc_List() {
    const loginToMember = useSelector((state) => state.loginMember);
    const memberId = loginToMember.member.memberId;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const Anc_Submit = (e) => {
        e.preventDefault();

        axios.post('/board/write2', {
            managerId: memberId,
            boardTitle: title,
            boardContent: content
        })

            .then(() => {
                alert('공지사항이 작성되었습니다.');
                window.location.href = '/Anc_Board'; // 작성 후 게시판으로 이동
            })
            .catch((err) => {
                console.error('작성 실패:', err);
                alert('공지사항 작성에 실패했습니다.');
            });
    };

    return (
        <div className="Anc_List">
            <br /><br />
            <h1>Write</h1>
            <br />
            <form onSubmit={Anc_Submit}>
                <table className="Anc_List_Table">
                    <tbody>
                        <tr>
                            <td >작성자</td>
                            <td><input type="text" value={memberId} readOnly /></td>
                        </tr>
                        <tr>
                            <td>제목</td>
                            <td><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td>내용</td>
                            <td><textarea value={content} onChange={(e) => setContent(e.target.value)} rows="10" cols="50"></textarea></td>
                        </tr>
                    </tbody>
                </table>

                <div className="Anc_List_Input" colSpan="2" align="center">
                    <input type="submit" value="등록" />
                    &emsp;
                    <input type="reset" value="다시쓰기" onClick={() => { setTitle(''); setContent(''); }} />
                </div>
            </form>
        </div>
    );
}

export default Anc_List;
