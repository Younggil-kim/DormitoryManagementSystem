
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


function AdminMainPage(props){


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
    const clickDormStudent = () =>{
        //action
    }
    const clickMatching = () => {
        // action
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
                <h3>관리자 작업 목록</h3>
                <Table  striped bordered hover>

                    <tbody>
                        
                            <tr>
                            <td onClick={clickDormStudent}><Button>합격자 받아오기 </Button></td>
                            </tr>
                            <tr>
                            <td onClick={clickMatching}> <Button>방 배정 시작하기 </Button> </td>
                            </tr>
                            <tr>
                            <td> <Button>불만사항 답변하기 </Button></td>

                            </tr>
                        
                    </tbody>

                </Table>
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


export default withRouter(AdminMainPage)