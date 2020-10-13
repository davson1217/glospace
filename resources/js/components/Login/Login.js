import React,{useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types'

const Login = props =>{
    useEffect(()=>{
        // console.log(props.loginPassword)
    })
    const styles ={
        LoginContainer:{
            border:"1px solid lightgrey",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            backgroundColor:"white",
        },
        LoginText:{
            marginBottom: "15px"
        },
        // height:"300px",
    }
    let data = {email:props.loginEmail,password:props.loginPassword}
    let API_MOMENT =  props.feedback.isSentAPI && props.feedback.requestingComp === "CLIENT_LOGIN";
    let loginBtn = API_MOMENT ?
        <button disabled>Please wait...<span className="spinner-border spinner-border-sm"/></button>:
        <button className="" disabled={!props.loginEmail || !props.loginPassword} style={{width:"120px",height:"30px"}}>Login</button>
    return (

        <div style={styles.LoginContainer}>
            <form className="mt-5" onSubmit={e=>{e.preventDefault();props.loginHandler(data)}}>

                <div className="text-center login-text-wrap" style={styles.LoginText}>
                    <h5>Login to your Glospace account</h5>
                </div>

                <div className="row mt-2">
                    {props.loginError? <div className="col-sm-12 text-center error-message">Invalid login credentials</div>:null}
                    <div className="col-sm-12 text-center mt-2 login-input-wrapper">
                        <input type="email" placeholder={"Email Address"}
                               style={{width:"90%",height:"40px"}}
                               autoFocus={'yes'} value={props.loginEmail}
                               onChange={e=>props.inputHandler("loginEmail",e,"ClientLogin")}
                               disabled={API_MOMENT}
                        />
                    </div>

                    <div className="col-sm-12 text-center mt-2 login-input-wrapper">
                        <input type="password" placeholder={"Password"}
                               style={{width:"90%",height:"40px"}}
                               value={props.loginPassword}
                               onChange={e=>props.inputHandler("loginPassword",e,"ClientLogin")}
                               disabled={API_MOMENT}
                        />
                    </div>

                    <div className="col-sm-12 mt-3 text-center login-button-wrapper">
                        {loginBtn}
                    </div>

                </div>
            </form>

            <div className="p-1 ml-3">
                <span style={{cursor:'pointer',fontSize:'14px',fontFamily:'serif',color:'blue'}}
                      onClick={()=>props.switchPage("FORGOT_PASS")}>Forgot Password?</span>
            </div>

            <div className="register-btn-wrapper text-right mt-3 p-4">
                <span style={styles.switchBtn} onClick={()=>props.switchPage("REGISTER")}>Create Account</span>
            </div>
        </div>
    )
}

Login.propTypes = {
    switchPage : PropTypes.func,
    inputHandler : PropTypes.func,
    loginHandler : PropTypes.func,
    loginEmail : PropTypes.string,
    loginError : PropTypes.bool,
    loginPassword : PropTypes.string,
    feedback:PropTypes.object
}

export default Login;
