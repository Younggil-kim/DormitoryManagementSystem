
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

//1. 내 정보 get으로 받아오기 (페이지 접속시)
//2. 게시판 바로가기 링크달아주기


function MainPage(props) {

    const [ MyInfo, setMyInfo] = useState({
        });
        


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
        props.history.push('/main');
      
    }
    const clickLogin = () =>{
        props.history.push('/');
    }
    const clickPredict = () =>{
        props.history.push('/predict');
    }

    const clickLogout = () => {
        Axios.get('/api/users/logout')
            .then(response => {
                if(response.data.success){
                    props.history.push("/")
                }else{
                    alert("로그아웃 실패")
                }
            })
    }


    const clickusrinfo = () => {
        Axios.get('/api/users/userinfo')
            .then((response)=>{
            setMyInfo(response.data);
        })
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
                <Nav.Link onClick = {clickLogout}>로그아웃</Nav.Link>
                
                <Nav.Link onClick = {clickusrinfo}>정보갱신</Nav.Link>
                
            </Nav>
            </Container>
        </Navbar>
            <br />
            <h3>내 정보</h3>
            <Table  striped bordered hover>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>아이디</th>
                        <th>학번</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        <tr>
                        <td>김영길</td>
                        <td>gom991</td>
                        <td>201621000</td>
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
            <br />
            <h3>게시판 바로가기</h3>
            <Table  striped bordered hover>
                <thead>
                    <tr>
                        <th>게시판 목록</th>
                    </tr>
                </thead>
                <tbody>
                    
                        <tr>
                        <td onClick={clickTokenBoard}>도움 요청 게시판</td>
                        </tr>
                        <tr>
                        <td>자유 게시판</td>
                        </tr>
                        <tr>
                        <td>불만사항 접수</td>
                        </tr>
                    
                </tbody>

            </Table>
            <br />
            <h3>시간표</h3>
            <Table  striped bordered hover>
                <thead>
                    <tr>
                        <th>시간</th>
                        <th>월요일</th>
                        <th>화요일</th>
                        <th>수요일</th>
                        <th>목요일</th>
                        <th>금요일</th>
                    </tr>
                </thead>
                <tbody>
                    
                        <tr>
                        <td>09:00~10:30</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        </tr>

                        <tr>
                        <td>10:30~12:00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        </tr>

                        <tr>
                        <td>12:00~13:30</td>
                        
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        </tr>

                        <tr>
                        <td>13:30~15:00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        </tr>

                        <tr>
                        <td>15:00~16:30</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        </tr>

                        <tr>
                        <td>16:30~18:00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        </tr>
                 
                </tbody>

            </Table>
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