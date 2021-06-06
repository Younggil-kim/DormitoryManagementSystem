import { useEffect, useState} from 'react';
import ReactHtmlParser from 'react-html-parser';
import Axios from 'axios';
import React from 'react';
import {withRouter} from 'react-router-dom';
import {Button} from "react-bootstrap";
import {Navbar} from "react-bootstrap";

import {Container} from "react-bootstrap";
import {Nav} from "react-bootstrap";
import {Table} from "react-bootstrap";


function TokenBoardPage(props){
    const [viewContent , setViewContent] = useState([]);
    const [status, setStatus] = useState("");
    const [mySid, setMysId] = useState("");

    let result;
    useEffect(()=>{
        var e = document.getElementById("sel");
        result = e.options[e.selectedIndex].value;
        setStatus(result);
        console.log("status", result)
        Axios.post('/api/tokenboard', {status:result})
        .then((response)=>{
            setViewContent(response.data);
            console.log(response.data);
        })
        Axios.get('/api/get/mystudentid')
        .then((response) => {
            setMysId(response.data);
            console.log("내 학번이다 ", mySid);
        })

    }, result)
    



    const posting =()=> {
        props.history.push('/tokenpost');
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

    const deleteHandler = () => {
        Axios.get("/api/delete/")
            .then((response) => {
                console.log(response.data)
                alert("정상적으로 삭제되었습니다.")
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
            </Nav>
            </Container>
        </Navbar>
        <h2>도움 요청 게시판</h2>

        <div>
            {
            <select id= "sel">
                <option value = "0" selected>대기중인 게시물</option>
                <option value = "1" >진행중인 게시물</option>
                <option value = "2" >완료된 게시물</option>
            </select>
            }


            { status === "0" &&
            <Table  striped bordered hover>
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>내용</th>
                        <th>보상</th>
                        <th>마감시간</th>
                        <th>지원</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        viewContent.map(element =>
                            <tr>
                            <td>{element.status === 0 && element.title}</td>
                            <td>{element.status === 0 && ReactHtmlParser(element.content)}</td>
                            <td>{element.status === 0 && element.reward}</td>
                            <td>{element.status === 0 && element.deadline.replace("T", "  ")}</td>
                            <td><Button>지원</Button></td>
                            <td>{element.sid === mySid}<Button onClick={deleteHandler}>삭제</Button></td>
                            
                            </tr>
                        )
                    }
                </tbody>

            </Table>
            }

            { status === "1" &&
                
                <Table  striped bordered hover>
                    <thead>
                        <tr>
                            <th>제목</th>
                            <th>내용</th>
                            <th>보상</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            viewContent.map(element =>
                                <tr>
                                <td>{element.status === 1 && element.title}</td>
                                <td>{element.status === 1 && ReactHtmlParser(element.content)}</td>
                                <td>{element.status === 1 && element.reward}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            }
            { status === "2" &&
                <div>
                <Table  striped bordered hover>   
                    <thead>
                        <tr>
                            <th>제목</th>
                            <th>내용</th>
                            <th>보상</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            viewContent.map(element =>
                                <tr>
                                <td>{element.status === 2 && element.title}</td>
                                <td>{element.status === 2 && ReactHtmlParser(element.content)}</td>
                                <td>{element.status === 2 && element.reward}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
                </div>

            }
        <Button class="btn float-right" onClick={posting}>작성하기</Button>

        </div>
    </div>
    )
}




export default withRouter(TokenBoardPage)