import React, {useEffect} from 'react';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_actions';


export default function (SpecificComponent, option, adminRoute = null){

    function AuthenticationCheck(props){

        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(auth()).then(response => {
                //로그인 하지 않음
                console.log("여기",response.payload);
                if(!response.payload.isAuth){
                    if(option === true){
                        props.history.push('/');
                    }
                } else{
                    //로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin){
                        //어드민이 아닌데 로그인되어있는경우
                        props.history.push('/main');
                    }else{
                        //
                        if(option === false){
                            props.history.push('/main')
                        }
                    }

                }
            })


        }, [])

        return ( 

            <SpecificComponent />
        )

    }



    return AuthenticationCheck
}