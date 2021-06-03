
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
    

    const [sId, setsId] = useState('');
    const [dorm, setdorm] = useState('1');
    const [GPA, setGPA] = useState('');
    const [area, setarea] = useState('');
    const [service, setservice] = useState('');


    const [point, setpoint] = useState('');
    const [percent, setpercent] = useState('');
    const [position, setposition] = useState('');

    const onsIdHandler = (event) => {
        setsId(event.currentTarget.value)
    }
    let result;
    const ondormHandler = () => {
        var e = document.getElementById("sel");
        result = e.options[e.selectedIndex].value;
        console.log(result);
        setdorm(result);
    }

    const onGPAHandler = (event) => {
        setGPA(event.currentTarget.value)
    }
    const onareaHandler = (event) => {
        setarea(event.currentTarget.value)
    }
    const onserviceHandler = (event) => {
        setservice(event.currentTarget.value)
    }


    const OnSubmitHandler = (event) => {
        event.preventDefault(); 
        let body ={
            sid: sId,
            dorm: dorm,
            gpa: GPA,
            area: area,
            service : service
        }
        console.log(body);
        Axios.post('http://localhost:8000/predict',body)
        .then((response) => {
            console.log(response.data)
            setpercent(response.data.percent);
            setpoint(response.data.point);
            setposition(response.data.position);
            // props.history.push('/result');
        })
    }
    useEffect( ()=>{
        setpercent(percent);
        setpoint(point);
        setposition(position);

    } );



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
           <form style= {{ display: 'flex', flexDirection:'column'}} onSubmit={OnSubmitHandler}>
                <label>학번</label>
                <input type="text" name="sid" onChange={onsIdHandler}/>

                <label>기숙사 선택</label>
                {/* <input type="text" name="dorm" onChange={ondormHandler}/> */}
                {
                <select id= "sel" onChange={ondormHandler}>
                    <option value = "1" selected>광교관</option>
                    <option value = "2" >용지관</option>
                    <option value = "3" >국제학사</option>
                    <option value = "4" >남제관</option>
                </select>
                }

                <label>평균 학점</label>
                <input type="text" name="GPA" onChange={onGPAHandler}/>

                <label>사는 지역</label>
                <input type="text" name="area" onChange={onareaHandler}/>

                <label>봉사 점수</label>
                <input type="text" name="service" onChange={onserviceHandler}/>

                <br />
                <Button type="submit">
                    예측
                </Button>
                <div>{<span>당신의 입사점수는 {point}점이고 {position}에 입사할 확률은 {percent}%입니다.</span>} 
                </div>
            </form>
        </div>
        </div>
    )

}

export default withRouter(PredictPage);