
import { useEffect, useState} from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser';
import Axios from 'axios';
import React from 'react';
import {withRouter} from 'react-router-dom';
import {Button} from "react-bootstrap";
import {Navbar} from "react-bootstrap";
import {Container} from "react-bootstrap";
import {Nav} from "react-bootstrap";
import {Table} from "react-bootstrap";
import {ListGroup} from "react-bootstrap";
import TokenBoardPage from '../BoardPage/TokenBoard';




function MainPage(props) {

    const [ MyInfo, setMyInfo] = useState({
        sId : '',
        email : '',
        name : '',
        token : '',
        dorm : '',
        room : '',
        });
        
    useEffect(()=>{
        Axios.get('http://localhost:8000/userinfo').then((response)=>{
            setMyInfo(response.data);
        })
        },[MyInfo])
        



    const clickAjouLib =() =>{
        window.location = "https://library.ajou.ac.kr/";
    }
    const clickAjouDorm =() =>{
        window.location = "https://mportal.ajou.ac.kr/main.do";
    }

    const clickAjouHomepage =() =>{
        window.location = "http://dorm.ajou.ac.kr/dorm/index.jsp";
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



    return(
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
            <br />
            <Table>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>학번</th>
                        <th>학과</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        <tr>
                        <td>김영길</td>
                        <td>201621000</td>
                        <td>미디어학과</td>
                        </tr>
                    }
                </tbody>
                <thead>
                    <tr>
                        <th>기숙사명</th>
                        <th>호실</th>
                        <th>보유 토큰</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        <tr>
                        <td>광교관</td>
                        <td>204호</td>
                        <td>50</td>
                        </tr>
                    }
                </tbody>
            </Table>

            <span></span>
            <Button >기숙사 홈페이지</Button>
            <Button>매칭 시작</Button>
            <br />
        <footer class="footer">
        <Navbar bg="dark" variant="dark">
            <Container>
            <Nav className="me-auto">
                <Nav.Link onClick = {clickAjouHomepage}>아주대학교</Nav.Link>
                <Nav.Link onClick = {clickAjouDorm}>아주대학교 기숙사</Nav.Link>
                <Nav.Link onClick = {clickAjouLib}>중앙 도서관</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
        </footer>
        </div>

    )
}

export default withRouter(MainPage)