
import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Navbar} from "react-bootstrap";
import {Container} from "react-bootstrap";
import {Nav} from "react-bootstrap";

import {Button} from "react-bootstrap";

import {registerUser} from '../../../_actions/user_actions';


function RegisterPage(props){

    const dispatch = useDispatch();
    
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [sId, setsId] = useState("");


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
    const onSIdHandler = (event) => {
        setsId(event.currentTarget.value)
    }
    
    const onSubmitHandler = (event) => {
        event.preventDefault(); 
        if(Password !== ConfirmPassword){
            return alert("비밀번호와 비밀번호 확인은 같아야 합니다.")
        }

        let body ={
            email:Email,
            name:Name,
            password:Password,
            sid : sId,
        }
        console.log(body);
        dispatch(registerUser(body))//로그인 유저라는 액션을 만들어야 함 이제 
            .then(response => {
                if(response.payload.success){
                    props.history.push("/login")
                } else{
                    alert("회원가입에 실패하셨습니다.");
                }
            })
    }
    const clickTokenBoard = () =>{
        props.history.push('/tokenboard');
    }
    const clickHome = () => {
        props.history.push('/');
      
    }
    const clickLogin = () =>{
        props.history.push('/login');
    }
    const clickPredict = () =>{
        props.history.push('/predict');
    }
    return (
        <div>
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="#home">Ajou. Dorm</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link onClick = {clickHome}>Home</Nav.Link>
                <Nav.Link onClick = {clickPredict}>합격 예측</Nav.Link>
                <Nav.Link onClick = {clickTokenBoard}>도움게시판</Nav.Link>
                <Nav.Link onClick = {clickLogin}>로그인</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style= {{ display: 'flex', flexDirection:'column'}}
                onSubmit={onSubmitHandler}
            >


                <label>이름</label>
                <input type="text" value={Name} onChange={onNameHandler}/>

                <label>학번</label>
                <input type="text" value={sId} onChange={onSIdHandler}/>

                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>

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
        </div>
    )


}


export default withRouter(RegisterPage)