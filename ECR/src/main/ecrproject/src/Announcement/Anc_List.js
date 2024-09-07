import React, { useState } from 'react';
import axios from 'axios';

function Anc_List() {
    const [manager, setManager] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const Anc_Submit = (e) => {
        e.preventDefault();

        axios.post('/board/write2',{ 
            managerId: manager, boardTitle: title, boardContent: content })

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
        <div>
            <h1>공지사항 작성</h1>
            <form onSubmit={Anc_Submit}>
                <table className="form-table">
                    <tbody>
                        <tr>
                            <td id="a">작성자</td>
                            <td><input type="text" value={manager} onChange={(e) => setManager(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td>제목</td>
                            <td><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td>내용</td>
                            <td><textarea value={content} onChange={(e) => setContent(e.target.value)} rows="10" cols="50"></textarea></td>
                        </tr>
                        <tr>
                            <td colSpan="2" align="center">
                                <input type="submit" value="등록" />
                                &emsp;
                                <input type="reset" value="다시쓰기" onClick={() => { setManager(''); setTitle(''); setContent(''); }} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default Anc_List;
