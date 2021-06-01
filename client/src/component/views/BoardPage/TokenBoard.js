import { useEffect, useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser';
import Axios from 'axios';
import React from 'react';
import {withRouter} from 'react-router-dom';
import {Button} from "react-bootstrap";

function TokenBoardPage(){
    const [viewContent , setViewContent] = useState([]);

    useEffect(()=>{
      Axios.get('http://localhost:8000/api/get').then((response)=>{
        setViewContent(response.data);
        console.log(viewContent);
      })
    },[viewContent])

    return(          
    <div className='movie-container'>
        {viewContent.map(element =>
        <div className="title">
            <h2>{element.title}</h2>
            <div className="cont">
            {ReactHtmlParser(element.content)}
            </div>
        </div>
    )}
  </div>);
  <div>
      <Button>게시물 작성하기</Button>
  </div>
}


export default withRouter(TokenBoardPage)