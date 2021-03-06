
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
        props.history.push('/main');
      
    }
    const clickLogin = () =>{
        props.history.push('/');
    }
    const clickPredict = () =>{
        props.history.push('/predict');
    }
    const clickMatching = () => {
        // action
    }
    function waitingMatching(){
        return new Promise((resolve, reject) => {
            try{
                const request = Axios.get('api/get/match')
                    .then(response => {return response.data})

                resolve(request)
            }catch(err){
                reject(new Error(err));
            }

      })
    }
    function LoadingAlgrithmButton() {
        const [isLoading, setLoading] = useState(false);
        const [isCompleted , setCompleted] = useState(false);
    
        useEffect(() => {
            if (isLoading) {
                waitingMatching().then(() => {
                setLoading(false);
            });
            }
        }, [isLoading]);
        
        const handleClick = () => {
            setLoading(true);
            setCompleted(true);
        }
        return (
            <Button
            variant="primary"
            disabled={isLoading}
            onClick={!isLoading ? handleClick : null}
            >
            {isLoading ? '??????????????? ?????? ?????????????????????' :  isCompleted ? '?????? ??? ?????? ??????' : '??? ?????? ????????????'}
            </Button>
        )}


    function waitingRequest() { 
        return new Promise((resolve, reject) => {
            try{
                const request = Axios.get('api/get/student')
                    .then(response => {return response.data})

                resolve(request)
            }catch(err){
                reject(new Error(err));
            }

      })
    }
      
    function LoadingButton() {
    const [isLoading, setLoading] = useState(false);
    const [isCompleted , setCompleted] = useState(false);

    useEffect(() => {
        if (isLoading) {
            waitingRequest().then(() => {
            setLoading(false);
        });
        }
    }, [isLoading]);
    
    const handleClick = () => {
        setLoading(true);
        setCompleted(true);
    }
    return (
        <Button
        variant="primary"
        disabled={isLoading}
        onClick={!isLoading ? handleClick : null}
        >
        {isLoading ? '?????????????????? ?????????...' :  isCompleted ? '????????? ?????????????????? ?????? ??????' : '????????? ?????????????????? ????????????'}
        </Button>
    )}
    
    return(
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="#home">Ajou. Dorm</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick = {clickHome}>Home</Nav.Link>
                    <Nav.Link onClick = {clickPredict}>?????? ??????</Nav.Link>
                    <Nav.Link onClick = {clickTokenBoard}>???????????????</Nav.Link>
                    <Nav.Link onClick = {clickLogin}>?????????</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
            <br />
                <h3>????????? ?????? ??????</h3>
                <Table  striped bordered hover>

                    <tbody>
                        
                            <tr>
                            <td>
                                <LoadingButton />
                            </td>
                            </tr>
                            <tr>
                            <td> <LoadingAlgrithmButton /></td>

                            </tr>
                            <tr>
                            <td> <Button>???????????? ???????????? </Button></td>

                            </tr>
                        
                    </tbody>

                </Table>
            <footer class="footer">
            <Navbar bg="dark" variant="dark">
                <Container>
                <Nav className="me-auto">
                    <Nav.Link onClick = {clickAjouHomepage}>???????????????</Nav.Link>
                    <Nav.Link onClick = {clickAjouDorm}>??????????????? ?????????</Nav.Link>
                    <Nav.Link onClick = {clickAjouLib}>?????? ?????????</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
            </footer>
        </div>


    )
    }



export default withRouter(AdminMainPage)