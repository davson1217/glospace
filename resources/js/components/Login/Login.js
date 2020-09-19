import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types'
const Login = props =>{
    const styles ={
        LoginContainer:{
            border:"1px solid lightgrey",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            backgroundColor:"white"
        },
        LoginText:{
            marginBottom: "15px"
        },
        switchBtn:{
            cursor:"pointer",
            color:"blue"
        }
        // height:"300px",
    }
    return (
        <div style={styles.LoginContainer}>
            <form className="mt-5">
                <div className="text-center" style={styles.LoginText}>
                    <h5>Login to your GlobalSpace account</h5>
                </div>
                <div className="row mt-2">
                    <div className="col-sm-12 text-center">
                        <input type="email" placeholder={"Email Address"} style={{width:"70%",height:"30px"}}/>
                    </div>
                    <div className="col-sm-12 text-center mt-2">
                        <input type="text" placeholder={"Password"} style={{width:"70%",height:"30px"}}/>
                    </div>
                    <div className="col-sm-12 mt-3 text-center">
                        <button className="btn btn-success" disabled={true} style={{width:"120px",height:"40px"}}>Login</button>
                    </div>
                </div>
            </form>
            <div className="register text-right mt-3 p-4">
                <span style={styles.switchBtn} onClick={()=>props.switchPage("REGISTER")}>Create Account</span>
            </div>
        </div>
    )
}

Login.propTypes = {
    switchPage : PropTypes.func
}

export default Login;
