import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {withRouter,useHistory} from "react-router-dom";
import axios from "axios";
import * as ActionTypes from "../Redux/Actions/ActionTypes";
import Feedback from "../Redux/Feedback";

const AdminLogin = (props)=>{

    let history = useHistory();

    useEffect(()=>{
        if (props.login.isAuthenticated || localStorage.getItem("adminToken")){
            history.push('/admin/dashboard')
        }
    },[props.login.isAuthenticated])

    const styles={
        container:{
            minHeight:"100vh",
            backgroundColor:"#f7f7f7"
        },
        input:{
            outline:"none",
            width:"350px",
            fontFamily:"serif",
            color:"#DD500A"
        },
        loginBtn:{
            width:"100px",
            backgroundColor:"black",
            color:"#DD500A"
        }
    }
    let submitButton = props.feedback.isSentAPI && props.feedback.requestingComp === "ADMIN_LOGIN"?
        <button disabled={true}>Please Wait...</button>:
        <button type="submit" style={styles.loginBtn} disabled={!props.login.username || !props.login.password}>Login</button>
    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={styles.container}>

            <div className="card">

            <div className="card-body">

                <div className="brand-logo-wrap text-center mb-2">
                    <img src={"img/GS.png"} alt="glospace logo" width={70}/>
                </div>

                <div>
                    <form onSubmit={e=>{e.preventDefault();props.adminLoginSubmit(props.login.username,props.login.password)}}>
                        <div className="text-center">
                            {props.login.error? <span className="text-danger" style={{fontFamily:"serif"}}>Invalid Credentials</span>:null}
                        </div>
                        <div>
                            <label htmlFor="email">
                                <input type="email" value={props.login.username}
                                       onChange={e=>props.loginInputHandler(e,"username")}
                                       placeholder="glospace email"
                                       autoFocus={true}
                                       style={styles.input}
                                />
                            </label>
                        </div>

                        <div>
                            <label htmlFor="password">
                                <input type="password" value={props.login.password}
                                       onChange={e=>props.loginInputHandler(e,"password")}
                                       placeholder="password"
                                       style={styles.input}
                                />
                            </label>
                        </div>
                        <div className="text-center">
                            {submitButton}
                        </div>
                    </form>
                </div>
            </div>
            </div>
            {props.feedback.showFeedback ? <Feedback message={"Login Successful"}/> : null}
        </div>
    )
}

const MapState = state =>{
    return {
        login : state.Admin.Login,
        feedback : state.Feedback,
    }
}

const MapDispatch = dispatch =>{
    return {
        loginInputHandler : (e,name)=>{
            dispatch({
                type:"ADMIN_LOGIN_INPUT",
                payload:{name,value:e.target.value}
            })
        },
        adminLoginSubmit : (username,password)=>{
            dispatch({type:ActionTypes.API_REQUEST_SENT,payload:{component:"ADMIN_LOGIN"}})
            const data = {
                grant_type: 'password',
                client_id: '2',//3
                client_secret: 'Um5qROCX4CF0LlTYfVA8UyeiGQmWcXaSEZRKwuuV',// HPeYmIm4h0MpkfYEZszIttR4w5Q5o9ueeSFzqHWi LSI1kFQLgttzTk9n5gIwBE1CGxhdAWsmyudTjVO5
                //remote secret: LSI1kFQLgttzTk9n5gIwBE1CGxhdAWsmyudTjVO5
                username,password
            }
            let param = '';

            Object.keys(data).map(key =>{
                return param += ""+key+"="+data[key]+"&"
            });

            param = param.slice(0, param.length-1);

            axios.post(`oauth/token`,param)
                .then(response=>{
                    // console.log("poop")
                    if(response.data.access_token){
                        dispatch({type:ActionTypes.API_REQUEST_SENT,payload:{component:"ADMIN_LOGIN"}})//Feedback
                        // dispatch({type:ActionTypes.SHOW_FEEDBACK})
                        localStorage.setItem("adminToken", response.data.access_token);
                        setTimeout(()=>{
                            dispatch({type:"ADMIN_LOGGED_IN"});
                        },2000)
                    }else{ }
                })
                .catch(err=>{
                    dispatch({type:ActionTypes.API_REQUEST_SENT,payload:{component:"ADMIN_LOGIN"}})
                    dispatch({type:ActionTypes.LOGIN_ERROR})
                })
        }
    }
}

export default connect(MapState,MapDispatch)(withRouter(AdminLogin));
