
import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Button} from "react-bootstrap";

import {registerUser} from '../../../_actions/user_actions';


function RegisterPage(props){

    const dispatch = useDispatch();
    
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); 
        if(Password !== ConfirmPassword){
            return alert("비밀번호와 비밀번호 확인은 같아야 합니다.")
        }

        let body ={
            email:Email,
            name:Name,
            password:Password
        }
        dispatch(registerUser(body))//로그인 유저라는 액션을 만들어야 함 이제 
            .then(response => {
                if(response.payload.success){
                    props.history.push("/login")
                } else{
                    alert("회원가입에 실패하셨습니다.");
                }
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style= {{ display: 'flex', flexDirection:'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler}/>

                <label>비밀번호</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>

                <label>비밀번호 확인</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>

                <br />
                <Button type="submit">
                    회원가입
                </Button>
            </form>
        </div>
    )


}


export default withRouter(RegisterPage)