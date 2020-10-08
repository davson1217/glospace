import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {UserEmailVerified} from "../Redux/Actions/DashboardActions";
import {NavLink} from "react-router-dom";

// props.match.params.userId = undefined;
const EmailVerify = props => {

    useEffect(()=>{
        props.verifyUser(props.match.params.userId)
    },[])

    const styles = {
        container:{backgroundColor:"#fcfcfc",minHeight:"100vh"},
        nav:{backgroundColor:"white"},
        messageWrapper:{ height:"60vh"},
        message:{color:"black",fontFamily:"serif", fontSize:"25px"}
    }


    let message = <span>Verifying</span>;
    let feedback = props.verifyMessage
    if (!props.isRequesting && props.component === "VerifyEmail"){
        if (feedback){
            switch (feedback) {
                case "Verified": message = <div style={styles.message} className="d-flex flex-column text-center align-items-center">
                            <img src={"/img/check.svg"} alt="success" width={40}/><span>Email verified</span>
                    </div> ; break;
                case "PreviouslyVerified": message = <div style={styles.message} className="d-flex flex-column text-center align-items-center">
                    <img src={"/img/triangle.svg"} alt="success" width={40}/> <span>You already verified your email</span>
                </div> ; break;
                case "Invalid": message = <div style={styles.message} className="text-danger d-flex flex-column text-center align-items-center">
                    <img src={"/img/triangle.svg"} alt="failed" width={40}/><span>Yikes! Something isn't right</span>
                </div> ; break;
            }
            //data = <h2 style={styles.message}>{props.verifyMessage}</h2>
        }
    }


    return (
        <div style={styles.container}>

            <nav style={styles.nav} className="navbar navbar-expand-sm auth-nav">
                <span className="navbar-brand">
                    <img src={"/img/GS.png"} alt="logo" width={60}/>
                </span>
            </nav>

            <div className="message-wrapper d-flex justify-content-center align-items-center" style={styles.messageWrapper}>
                <div className="card bg-light text-dark">
                    <div className="card-body"> {message}</div>
                </div>
            </div>

        </div>
    )
}

const MapState = state =>{
    return {
        isRequesting : state.Layout.isSentRequest,
        component : state.Layout.requestComponent,
        verifyMessage : state.Dashboard.emailVerifyMessage,
    }
}

const MapDispatch = dispatch =>{
    return {
        verifyUser : (userID) => dispatch(UserEmailVerified(userID))
    }
}

export default connect(MapState,MapDispatch)(EmailVerify);
