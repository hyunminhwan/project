import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";


function EditTema() {
    const loginToMember = useSelector((state) => state.loginMember);
    const [temaList, setTemaList] = useState([]);
    const cafeName=loginToMember.member.shopName;
    useEffect(() => {
        axios.get(`/api/edittema/${cafeName}`)
            .then((result) => {
                setTemaList(result.data);
            })
            .catch(() => {
                console.log("수정자료를 가져오는중 실패했습니다")
            })
    }, [])

    return (
        <>
            <table>
                
                <tr>
                    <th>테마번호</th>
                    <th>이미지</th>
                    <th>카페이름</th>
                    <th>테마이름</th>
                    <th>가격</th>
                    <th>소요시간</th>
                    <th>테마설명</th>
                    <th>지역</th>
                    <th>주소</th>
                    <th>최대 인원</th>
                    <th>난이도</th>
                    <th>장르</th>
                    <th>관리</th>
                </tr>

                {
                    temaList.map((tema) => {
                        return(
                            <tr>
                            <td>{tema.temaNo}</td>
                            <td><img src={tema.imgUrl} alt="테마이미지"/></td>
                            <td>{tema.cafeName}</td>
                            <td>{tema.temaName}</td>
                            <td>{tema.price}</td>
                            <td>{tema.timetaken}</td>
                            <td>{tema.temaContent}</td>
                            <td>{tema.location}</td>
                            <td>{tema.address}</td>
                            <td>{tema.personnel}</td>
                            <td>{tema.difficulty}</td>
                            <td>{tema.genre}</td>
                            <td>
                                <Button type="button">수정하기</Button>&emsp;
                                <Button type="button">삭제하기</Button>
                            </td>
                        </tr>

                        )
                      
                    })
                }
            </table>
        </>
    )


}

export default EditTema;