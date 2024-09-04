import './Announcement.css';
function Announcement() {

    return (
        <>
            <h1> 공지 사항</h1>
            <br /><br /><br /><br /><br /><br />
            <table align="center" style={{border:' 1px solid '}}>
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
                    <tr>
                        <td>1</td>
                        <td>공지사항 제목</td>
                        <td>관리자 작성자</td>
                        <td>조회수</td>
                        <td>2024-09-01</td>
                    </tr>
                </tbody>
            </table>

            <hr />

        </>
    )
}

export default Announcement;