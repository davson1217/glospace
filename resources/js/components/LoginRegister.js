import React,{useEffect} from 'react';
import NavigationMenu from "./Reusable/Navigation";
import Login from "./Login/Login";
import PageIntro from "./Reusable/PageIntro";
import {connect} from "react-redux";
import {SwitchLoginPage} from "./Redux/Actions/LayoutActions";
import Register from "./Login/Register";
import './Styles/LoginReg.css'
import {NavLink, withRouter,useHistory } from 'react-router-dom';
import {InputHandler} from "./Redux/Actions/AdminActions";
import {LoginHandler, RegisterUserHandler} from "./Redux/Actions/AccountActions";
import Feedback from "./Redux/Feedback";


const LoginRegister = props =>{

    let history = useHistory();

    useEffect(()=>{
        if (props.Register.userRegistered || localStorage.getItem("token")){
            history.push("/dashboard")
        }
    },[props.Register.userRegistered])

    const styles = {
        nav:{
            backgroundColor:"#964d26"
        }
    }
    return (
        <div style={{height:"100%", backgroundColor:"#f7f7f7"}}>

            <nav className="navbar navbar-expand-sm auth-nav">
                <NavLink to={'/'} className="navbar-brand">
                    <img src={"/img/GS.png"} alt="logo" width={60}/>
                </NavLink>
            </nav>

            <main className="container mt-3 d-flex justify-content-center align-items-center" >
                {props.layout.loginPage === "LOGIN" ?

                    <Login switchPage={props.switchPage}
                           loginEmail={props.Register.loginEmail}
                           inputHandler={props.inputHandler}
                           loginPassword={props.Register.loginPassword}
                           loginHandler={props.loginHandler}
                           loginError={props.Register.loginError}
                           feedback={props.Feedback}
                    />
                        :
                    <Register
                         switchPage={props.switchPage}
                         firstName={props.Register.firstName}
                         lastName={props.Register.lastName}
                         email={props.Register.email}
                         address={props.Register.address}
                         addressTwo={props.Register.addressTwo}
                         city={props.Register.city}
                         state={props.Register.state}
                         country={props.Register.country}
                         password={props.Register.password}
                         confirmPass={props.Register.confirmPass}
                         phone={props.Register.phone}
                         ID={props.Register.ID}
                         termsAgreed={props.Register.termsAgreed}
                         inputHandler={props.inputHandler}
                         registerUserHandler={props.registerUser}
                         focusedInput={props.Register.focusedInput}
                         showHelper={props.Register.showHelper}
                    />
                }
            </main>
            {props.Feedback.showFeedback? <Feedback message={props.Feedback.feedbackMessage}/> : null}
        </div>
    )
}
const MapState = state =>{
    return {
        layout: state.Layout,
        Register: state.Registration,
        Feedback: state.Feedback,
    }
}

const MapDispatch = dispatch =>{
    return {
        switchPage : page => dispatch(SwitchLoginPage(page)),
        inputHandler : (name,e,comp) => dispatch(InputHandler(name,e,comp)),
        registerUser : (e,data) => {e.preventDefault();dispatch(RegisterUserHandler(data))},
        loginHandler : (data) => {dispatch(LoginHandler(data))}
    }
}
export default connect(MapState,MapDispatch)(withRouter(LoginRegister));
