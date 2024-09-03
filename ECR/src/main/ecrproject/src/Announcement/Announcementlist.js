

function Announcementlist() {
    
    return (
        <div>
            <h1>공지사항 작성</h1>
            <form>
                <table className="form-table" >
                    <tbody>
                        <tr>
                            <td id="a">작성자</td>
                            <td><input type="text" name="manager" /></td>
                        </tr>
                        <tr>
                            <td>제목</td>
                            <td><input type="text" name="title" /></td>
                        </tr>
                        <tr>
                            <td>내용</td>
                            <td><textarea name="content" rows="10" cols="50"></textarea></td>
                        
                            <td colSpan="2" align="center">
                                <input type="submit" value="등록" />
                                &emsp;
                                <input type="reset" value="다시쓰기" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default Announcementlist;