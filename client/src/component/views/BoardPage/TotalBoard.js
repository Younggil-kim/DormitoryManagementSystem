import { useEffect, useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser';
import Axios from 'axios';
import React from 'react';
import {withRouter} from 'react-router-dom';

import {Button} from "react-bootstrap";

function TotalBoard(props){
    
    const [viewContent , setViewContent] = useState([]);

    useEffect(()=>{
      Axios.get('http://localhost:8000/api/get').then((response)=>{
        setViewContent(response.data);
        console.log(viewContent);
      })
    },[viewContent])

    return (
      <div>
        {viewContent}
      </div>
    )
}



export default withRouter(TotalBoard)