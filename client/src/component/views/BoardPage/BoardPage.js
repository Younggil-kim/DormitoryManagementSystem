import { useEffect, useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser';
import Axios from 'axios';
import React from 'react';
import {withRouter} from 'react-router-dom';

import {Button} from "react-bootstrap";

function BoardPage(props){
  const [viewContent , setViewContent] = useState([]);

  useEffect(()=>{
    Axios.get('http://localhost:8000/api/get').then((response)=>{
      setViewContent(response.data);
      console.log(viewContent);
    })
  },[viewContent])

    const [BoardContent, setBoardContent] = useState({
        title: '',
        content: '',
        rewardToken : '',
      })
    
    
      const [Token, setToken] = useState("");
    
      const submitReview = ()=>{
        console.log(BoardContent.title, BoardContent.content, BoardContent.rewardToken);
        Axios.post('http://localhost:8000/api/insert', {
          title: BoardContent.title,
          content: BoardContent.content,
          rewardToken : BoardContent.rewardToken
        }).then(()=>{
          alert('등록 완료!');
          // props.history.push('/totalboard')
          console.log(viewContent);
        })
      };
    
      const getValue = e => {
        const { name, value } = e.target;
        setBoardContent({
          ...BoardContent,
          [name]: value
        })
      };
    
      return (
        <div className="App">
          <h1>도움을 요청해보세요</h1>
          <div className='movie-container'>
            {viewContent.map(element =>
              <div className="title">
                <h2>{element.title}</h2>
                <div className="cont">
                  {ReactHtmlParser(element.content)}
                </div>
              </div>
            )}
          </div>
          <div className='form-wrapper'>
            <input className="title-input"
              type='text'
              placeholder='제목'
              onChange={getValue}
              name='title'
            />
            <input className="token-input"
              type='text'
              placeholder='5~20개까지 보상 설정'
              onChange={getValue}
              name='rewardToken'
            />
            <CKEditor
              editor={ClassicEditor}
              onReady={editor => {
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                console.log({ event, editor, data });
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
          <Button className="submit-button" onClick={submitReview}>작성하기</Button>
        </div>
      );
}



export default withRouter(BoardPage)