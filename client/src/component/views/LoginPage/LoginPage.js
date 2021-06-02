
import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Button} from "react-bootstrap";
import {Navbar} from "react-bootstrap";
import {Container} from "react-bootstrap";
import {Nav} from "react-bootstrap";
import {loginUser} from '../../../_actions/user_actions';

function LoginPage(props){

    const dispatch = useDispatch();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); 
        let body ={
            email:Email,
            password:Password
        }
        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess){
                    props.history.push('/')
                }else{
                    alert("잘못된 정보를 입력하셨습니다.");
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
                <form style= {{ display: 'flex', flexDirection:'column'}} onSubmit={onSubmitHandler}>
                    <label>Email</label>
                    <input type="email" value={Email} onChange={onEmailHandler}/>
                    <label>Password</label>
                    <input type="password" value={Password}  onChange={onPasswordHandler}/>
                    <br />
                    <Button type="submit">
                        Login
                    </Button>

                </form>
            </div>
        </div>
    )
}



export default withRouter(LoginPage)