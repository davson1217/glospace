import React from 'react';
import {NavLink} from "react-router-dom";
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import PropTypes from 'prop-types';

const ForgotPassword = (props) =>{

    const styles = {
        ForgotPassContainer:{
            border:"1px solid lightgrey",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            backgroundColor:"white",
            width:"500px",
            minHeight: "200px",
            padding:'10px',
            fontFamily:'serif',
            fontSize:'14px'
        },
        request:{
            cursor: "pointer",
        }
    }

    let display;

    let API_MOMENT = props.request && props.component === "SEND_PASSWORD_RESET_EMAIL";

    if (props.emailSent){
        display = <div className="text-center text-success">Email sent. Please follow the link delivered to your email address to complete the reset of your password</div>
    }else  display = null;
    return (
        <div style={styles.ForgotPassContainer}>
            <div className="p-2">
                <button className="btn btn-dark" onClick={()=>props.goBack("LOGIN")}>back</button>
            </div>
            {display}
            <form className="text-center" onSubmit={e=>{
                e.preventDefault();
                props.resetRequest(props.email)
            }}>
                <span className="text-danger">*
                    <label htmlFor="email">Enter your Glospace account's email address.</label>
                </span><br/>
                <input type="email" placeholder={"Email address"} style={{width:"250px"}}
                       onChange={e=>props.changeHandler(e)} value={props.email}
                       disabled={API_MOMENT}
                />
                <div className="mt-2">
                    {
                        API_MOMENT ? <button disabled>working...</button>:<button disabled={!props.email } className='btn btn-dark'>Request reset</button>
                    }
                </div>
            </form>
        </div>
    )
}

ForgotPassword.propTypes = {
    emailSent: PropTypes.bool,
    request: PropTypes.bool,
    component: PropTypes.string,
    email: PropTypes.string,
    goBack: PropTypes.func,
    resetRequest: PropTypes.func,
    changeHandler: PropTypes.func,
}

export default ForgotPassword;
