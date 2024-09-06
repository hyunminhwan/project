import "./login.css";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { useNavigate } from 'react-router-dom';

function Login() {
    let navigate = useNavigate();

    let pageB =() => {
        navigate('/managerlogin');
    }

    let pageC =() => {
        navigate('/masterlogin');
    }
    return (
        <>
           
            <form action="login" method="post">
                <table>
                    <tr>
                        <td>아이디</td>
                        <td><input name="id" /></td>
                        <td><button>로그인</button></td>
                    </tr>
                    <tr>
                        <td>비밀번호</td>
                        <td><input type="password" name="password" /></td>
                    </tr>

                    {/* <tr className="userlogin">
                        <a href="memberjoin"
                            target="_blank"/*새탭으로 열기*/ /*rel="noopener noreferrer" /* target="_blank" 사용시 보안상의이유로 같이써야함
                        >회원로그인</a>&emsp;
                        <a href="findid"
                            target="_blank" rel="noopener noreferrer"
                        >관계자로그인</a>&emsp;
                        <a href="findid"
                            target="_blank" rel="noopener noreferrer"
                        >관리자로그인</a>
                    </tr> */}


                    <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                        <ToggleButton id="user" value={1}>
                            일반로그인
                        </ToggleButton>
                        <ToggleButton id="manager" value={2} onClick={()=>pageB()}>
                            관계자로그인
                        </ToggleButton>
                        <ToggleButton id="master" value={3} onClick={()=>pageC()}>
                            관리자로그인
                        </ToggleButton>
                    </ToggleButtonGroup>

                    <tr>
                        <a
                            href="나중에 내가 링크 삽입해야함" // 링크 목적지 설정
                            target="_blank" // 새페이지로 열기
                            rel="noopener noreferrer"/*새탭에서 열기2(보안의이유로 함께사용됨)*/> 아이디/비밀번호 찾기 </a> &emsp;


                        <a
                            href="나중에 내가 링크 삽입해야함" // 링크 목적지 설정
                            target="_blank" // 새페이지로 열기
                            rel="noopener noreferrer"/*새탭에서 열기2(보안의이유로 함께사용됨)*/> 회원가입 </a>
                    </tr>

                </table>
            </form>





        </>
    )
}



export default Login;