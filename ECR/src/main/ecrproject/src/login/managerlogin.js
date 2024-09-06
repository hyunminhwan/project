import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { useNavigate } from 'react-router-dom';

function Managerlogin() {

    let navigate = useNavigate();

    let pageA =() => {
        navigate('/login');
    }

    let pageC =() => {
        navigate('/masterlogin');
    }
   
    return (
        <>
            <form action="managerlogin" method="post">
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

                    <ToggleButtonGroup type="radio" name="options" defaultValue={2}>
                        <ToggleButton id="user" value={1} onClick={()=>pageA()}>
                            일반로그인
                        </ToggleButton>
                        <ToggleButton id="manager" value={2}>
                            관계자로그인
                        </ToggleButton>
                        <ToggleButton id="master" value={3} onClick={()=>pageC()}>
                            관리자로그인
                        </ToggleButton>
                    </ToggleButtonGroup>

                    <tr>
                        <a
                            href="나중에 내가 링크 삽입해야함"
                            target="_blank"
                            rel="noopener noreferrer"> 아이디/비밀번호 찾기 </a> &emsp;


                        <a
                            href="나중에 내가 링크 삽입해야함"
                            target="_blank"
                            rel="noopener noreferrer"> 회원가입 </a>
                    </tr>
                </table>
            </form>
        </>
    )
}

export default Managerlogin;