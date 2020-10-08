import React, {useEffect} from 'react';
import {connect} from "react-redux";
import Address from "./Settings/Address";
import Phone from "./Settings/Phone";
import {ChangeSubmit} from "../Redux/Actions/DashboardActions";
import Password from "./Settings/Password";

const Settings = props =>{

    useEffect(()=>{
        props.setDefaultValues(props.activeUser.address,props.activeUser.phone)
    },[props.activeUser])

    let menuContent;

    switch(props.settings.activeMenu){
        case "Address": menuContent = <Address
            userAddress={props.settings.address}
            initialAddress={props.activeUser.address}
            changeSubmit={props.changeSubmit}
            settingChange={props.changeHandler}/>
            ;break;
        case "Phone": menuContent = <Phone
            settingChange={props.changeHandler}
            userPhone={props.settings.phone}
            changeSubmit={props.changeSubmit}
            initialPhone={props.activeUser.phone}
        />;break;
        case "Password": menuContent = <Password
            settingChange={props.changeHandler}
            currentPass={props.settings.currentPass}
            newPass={props.settings.newPass}
            passChanged={props.settings.passChanged}
            passError={props.settings.passIncorrect}
            changeSubmit={props.changeSubmit}
        />;break;
        default:menuContent = <h5>Address</h5>;
    }
    let active = props.settings.activeMenu;
    let styles={
        activeMenu:{
            color: "#DD500A",
        }
    }
    return <>
            <div className="container">
                <div className="row">

                    <div className="col-sm-3 settings-nav">
                        <ul>
                            <li className={"mb-2"} style={active==="Address"?styles.activeMenu : null} onClick={()=>props.navigateSettings('Address')}>Address</li>
                            <li className="mb-2" style={active==="Phone"?styles.activeMenu : null} onClick={()=>props.navigateSettings('Phone')}>Phone Number</li>
                            <li className=""  style={active==="Password"?styles.activeMenu : null} onClick={()=>props.navigateSettings('Password')}>Password</li>
                        </ul>
                    </div>

                    <div className="col-sm-8 d-flex align-items-center justify-content-center">
                        {menuContent}
                    </div>

                </div>
            </div>
           </>
}

const MapState = state =>{
    return{
        settings : state.Dashboard.settingsMenu,
        activeUser : state.Dashboard.user
    }
}

const MapDispatch = dispatch =>{
    return {
        setDefaultValues : (address,phone) => {dispatch({type:'DEFAULT_VALUES',payload:{address,phone}})},
        navigateSettings : (menu) => {dispatch({type:'SETTINGS_MENU',payload:{menu}})},
        changeHandler : (name,value) => {dispatch({type:'SETTING_CHANGE',payload:{name,value}})},
        changeSubmit : (changeValue,changeName) => {dispatch(ChangeSubmit(changeValue,changeName))},
    }
}

export default connect(MapState,MapDispatch)(Settings)
