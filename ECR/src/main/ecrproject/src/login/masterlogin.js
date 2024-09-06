import { useNavigate } from 'react-router-dom';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

function Masterlogin() {
    let navigate = useNavigate();

    const pageA = () => {
        navigate('/login');
    }

    const pageB = () => {
        navigate('/managerlogin');
    }

    return (
        <div>
            <form method="post">
                onSubmit={(e) => {
                    e.preventDefault();
                    // 폼 제출 처리 로직 추가
                }}
            
                <table>
                    <tbody>
                        <tr>
                            <td>아이디</td>
                            <td><input name="id" /></td>
                            <td><button type="submit">로그인</button></td>
                        </tr>
                        <tr>
                            <td>비밀번호</td>
                            <td><input type="password" name="password" /></td>
                        </tr>
                    </tbody>
                </table>

                <ToggleButtonGroup type="radio" name="options" defaultValue={3}>
                    <ToggleButton id="user" value={1} onClick={pageA}>
                        일반로그인
                    </ToggleButton>
                    <ToggleButton id="manager" value={2} onClick={pageB}>
                        관계자로그인
                    </ToggleButton>
                    <ToggleButton id="master" value={3}>
                        관리자로그인
                    </ToggleButton>
                </ToggleButtonGroup>
            </form>
        </div>
    );
}

export default Masterlogin;
 