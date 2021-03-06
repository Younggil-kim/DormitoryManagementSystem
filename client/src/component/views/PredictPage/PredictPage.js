
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

    const [res, setres] = useState({
        dorm: '',
        percent: '',
        score:'',

    });


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


    const OnSubmitHandler = () => {
        let body ={
            sid: sId,
            dorm: dorm,
            gpa: GPA,
            area: area,
            service : service
        }
        console.log(body);
        
        return new Promise((resolve, reject) => {
            try{
                const request = Axios.post('/api/predict',body)
                    .then(response => {return response.data})

                resolve(request)
            }catch(err){
                reject(new Error(err));
            }
        })
        .then((data) => {
            console.log(data)
            setres(data);
        })
        }
    

    useEffect(()=>{
        setres(res);
    } );

      
    function LoadingButton() {
        const [isLoading, setLoading] = useState(false);

        useEffect(() => {
        if (isLoading) {
            OnSubmitHandler().then(() => {
            setLoading(false);
            });
        }
        }, [isLoading]);

        const handleClick = () => setLoading(true);

        return (
        <Button type="submit"
            variant="primary"
            disabled={isLoading}
            onClick={!isLoading ? handleClick : null}
        >
            {isLoading ? '?????????...' : '????????????'}
        </Button>
        )
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
        {/* // ??????, GPA, ?????? ??????, ????????????, ???????????? */}

        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
           <form style= {{ display: 'flex', flexDirection:'column'}} onSubmit={OnSubmitHandler}>
                {/* <label>??????</label>
                <input type="text" name="sid" onChange={onsIdHandler}/> */}

                <label>????????? ??????</label>
                {/* <input type="text" name="dorm" onChange={ondormHandler}/> */}
                {
                <select id= "sel" onChange={ondormHandler}>
                    <option value = "1" selected>?????????</option>
                    <option value = "2" >?????????</option>
                    <option value = "3" >????????????</option>
                    <option value = "4" >?????????</option>
                </select>
                }

                <label>?????? ??????</label>
                <input type="text" name="GPA" onChange={onGPAHandler}/>

                <label>?????? ??????</label>
                <input type="text" name="area" onChange={onareaHandler}/>

                <label>?????? ??????</label>
                <input type="text" name="service" onChange={onserviceHandler}/>

                <br />
                <LoadingButton />
                {/* <Button type="submit">
                    ??????
                </Button> */}
                {/* <div>{<span>????????? ??????????????? {score}????????? {position}??? ????????? ????????? {percent}%?????????.</span>} 
                </div> */}

                <div>{
                    <span>????????? ??????????????? {res.score}????????? ???????????? ????????? ????????? {res.percent}%?????????.</span>
                    }
                    
                </div>
            </form>
        </div>
        </div>
    )

}

export default withRouter(PredictPage);