import React,{useEffect} from 'react';
import NavigationMenu from "./Reusable/Navigation";
import Login from "./Login/Login";
import PageIntro from "./Reusable/PageIntro";
import {connect} from "react-redux";
import {SwitchLoginPage} from "./Redux/Actions/LayoutActions";
import Register from "./Login/Register";
const LoginRegister = props =>{
    // let location = useLocation();
    useEffect(()=>{
        // console.log(location)
    },[])
    const styles = {

    }
    return (
        <div style={{height:"100vh", backgroundColor:"#f7f7f7"}}>
            <NavigationMenu/>
            <PageIntro
                background={'/img/bg-subheader-service.jpg'}
                title={props.layout.loginPage === "LOGIN" ? "LOGIN" : "REGISTER"}
                description={props.layout.loginPage === "LOGIN" ? "" : "REGISTER ACCOUNT"}
            />
            <main className="container mt-2 d-flex justify-content-center align-items-center" >
                {props.layout.loginPage === "LOGIN" ?<Login switchPage={props.switchPage}/>: <Register switchPage={props.switchPage}/>}
            </main>
        </div>
    )
}
const MapState = state =>{
    return {
        layout: state.Layout
    }
}

const MapDispatch = dispatch =>{
    return {
        switchPage : page => dispatch(SwitchLoginPage(page))
    }
}
export default connect(MapState,MapDispatch)(LoginRegister);
