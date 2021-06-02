import { useEffect, useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser';
import Axios from 'axios';
import React from 'react';
import {withRouter} from 'react-router-dom';

import {Button} from "react-bootstrap";
import {InputGroup} from "react-bootstrap";

import {Navbar} from "react-bootstrap";
import {Container} from "react-bootstrap";
import {Nav} from "react-bootstrap";
function TokenPostPage(props){


    const [BoardContent, setBoardContent] = useState({
        title: '',
        content: '',
        rewardToken : '',
        deadLine : '',
        status : ''
      })


    
      const [Token, setToken] = useState("");
    
      const submitReview = ()=>{
        console.log(BoardContent.title, BoardContent.content, BoardContent.rewardToken);
        Axios.post('http://localhost:8000/api/insert', {
          title: BoardContent.title,
          content: BoardContent.content,
          rewardToken : BoardContent.rewardToken,
          deadLine : BoardContent.deadLine,
          status : '0'
        }).then(()=>{
          console.log(BoardContent.deadLine);
          alert('등록 완료!');
          props.history.push('/tokenboard');
        })
      };
    
      const getValue = e => {
        const { name, value } = e.target;
        setBoardContent({
          ...BoardContent,
          [name]: value
        })
      };
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
        
        <div className="App">

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

          <h1>글 쓰기</h1>
          <div className='form-wrapper'>
            <input className="title-input"
              type='text'
              placeholder='제목'
              onChange={getValue}
              name='title'
            />
            <span class= "setting">보상 토큰 설정</span>
            <input  className="token-input"
              type='number' min="5" max="20"
              placeholder='5~20'
              onChange={getValue}
              name='rewardToken'
            />
            <span class= "setting">마감 시간 선택</span>
            <input type="datetime-local"
              onChange={getValue}
              name='deadLine'/>
            <CKEditor
              editor={ClassicEditor}
              onReady={editor => { }}
              onChange={(event, editor) => {
                const data = editor.getData();
                // console.log({ event, editor, data });
                setBoardContent({
                  ...BoardContent,
                  content: data
                })
              }}
              onBlur={(event, editor) => {
                console.log('Blur.', editor);
              }}
              onFocus={(event, editor) => {
                console.log('Focus.', editor);
              }}
            />
          </div>
          <Button className="submit-button" onClick={submitReview}>저장</Button>
        </div>
      );
}



export default withRouter(TokenPostPage)