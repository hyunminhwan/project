import './insertTema.css';


function InsertTema() {


    return (
        <div className="create">
            <h2>테마등록</h2>
            <form>
                <label>카페이름:</label>
                <input type="text" required /> <br />

                <label>테마이름:</label>
                <input type="text" required /><br />

                <label>가격:</label>
                <input type="text" required /><br />

                <label>소요시간:</label>
                <input type="text" required /><br />

                <label>테마설명:</label>
                <textarea required></textarea><br />

                <label>지역:</label>
                <select>
                    <option value="서울">서울</option>
                    <option value="부산">부산</option>
                    <option value="대구">대구</option>
                    <option value="인천">인천</option>
                </select><br />

                <label>인원수:</label>
                <select>
                    <option value={2}>2명</option>
                    <option value={3}>3명</option>
                    <option value={4}>4명</option>
                    <option value={5}>5명</option>
                    <option value={6}>6명</option>
                </select><br />


                <label>난이도:</label>
                <select>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select><br />

                <label>장르:</label>
                <select>
                    <option value="미스터리">미스터리</option>
                    <option value="호러">호러</option>
                    <option value="SF">SF</option>
                    <option value="추리">추리</option>
                    <option value="판타지">판타지</option>
                    <option value="어드벤처">어드벤처</option>
                </select><br />

                <button onClick={()=>{}}>등록</button>
            </form>
        </div>
    );

}

export default InsertTema;