
import { useEffect, useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
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


function PredictPage(props) {


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
        {/* // 학번, GPA, 사는 지역, 봉사점수, 건물정보 */}

        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style= {{ display: 'flex', flexDirection:'column'}}>
                <label>학번</label>
                <input type="email" />

                <label>기숙사 선택</label>
                <input type="text" />

                <label>평균 학점</label>
                <input type="text"/>

                <label>사는 지역</label>
                <input type="text" />

                <label>봉사 점수</label>
                <input type="text" />

                <br />
                <Button type="submit">
                    회원가입
                </Button>
            </form>
        </div>
        </div>
    )

}

export default withRouter(PredictPage);