import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import {NavLink,useHistory} from "react-router-dom";
import './Styles/Dashboard.css';
import * as Actions from './Redux/Actions/DashboardActions';
import DashboardMenu from "./Reusable/DashboardMenu";
import {InputHandler} from "./Redux/Actions/AdminActions";
import {TrackShipment} from "./Redux/Actions/DashboardActions";
import Modal from "./Admin/Modal/Modal";
import TrackingForm from "./DashboardComps/TrackingForm";
import TrackingView from "./DashboardComps/TrackingView";
import * as ActionTypes from "./Redux/Actions/ActionTypes";
import UserDetails from "./Reusable/UserDetails";
import InvoiceMenu from "./DashboardComps/InvoiceMenu";
import Settings from "./DashboardComps/Settings";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner';
import UserNotVerified from "./DashboardComps/UserNotVerified";
const Dashboard = props =>{
    const history = useHistory();

    useEffect(()=>{
        if (localStorage.getItem('token')){
            // console.log(props.dashboard.user)
        }else
        if (props.dashboard.userLoggedOut || !localStorage.getItem("token"))
            history.push("/login")
        props.fetchUser()
    },[])

    //::::::::: Dashboard Menu Content Navigation :::::::::::::
        let API_MOMENT = props.feedback.isSentAPI && props.feedback.requestingComp === "FETCH_CLIENT";
        let VERIFY_API_MOMENT = props.feedback.isSentAPI && props.feedback.requestingComp === "RESENDING_VERIFY_EMAIL";

        let userIsVerified =  props.dashboard.user.email_verified_at;

        let notVerified = <UserNotVerified
            sentMail={props.dashboard.verificationResent}
            sendingMail={VERIFY_API_MOMENT} resendVerification={()=>props.resendVerification()}
        />

        let activeMenu;
        if (API_MOMENT){
            activeMenu = <div className='text-center'>
                <Loader type="ThreeDots" color="black" height={100} width={100}/>
            </div>;
        }else
        if (props.dashboard.activeMenu === "Shipment"){
                activeMenu = userIsVerified ?
                <TrackingForm
                    dashboard={props.dashboard}
                    inputHandler={props.inputHandler}
                    trackShipment={props.trackShipment}
                /> : notVerified;

        }else if (props.dashboard.activeMenu === "Invoice"){
            activeMenu = userIsVerified ? <InvoiceMenu/> : notVerified
        }else if (props.dashboard.activeMenu === "Message"){
            activeMenu = <h2 className="text-center">You currently have no messages</h2>
        }else activeMenu = userIsVerified ? <Settings/> : notVerified;
    //::::::::: Dashboard Menu Content Navigation :::::::::::::


    return (
        <div className="dashboard-root">
            <div className="container dashboard-container">
                <div className="row">

                    <div className="col-sm-12 mySpace-section">

                        <div className={""}>
                            {/*<NavLink to={"/"}></NavLink>*/}
                            <img src={"/img/GS.png"} alt="logo" width={80}/>
                        </div>

                       <UserDetails user={props.dashboard.user}/>

                        <hr/>

                        <div className="col-sm-12 mt-4 menu-section">
                            <DashboardMenu
                                navigateDashboard={props.navigateDashboard}
                                activeMenu={props.dashboard.activeMenu}
                                logout={props.logout}
                            />
                        </div>

                    </div>

                    <div className="col-sm-12 mt-4 menu-content p-3">
                        {activeMenu}
                    </div>

                </div>
                {props.dashboard.showShipmentModal ?
                    <Modal modalWidth={"70%"} closeModal={props.closeModal}>
                        <TrackingView shipment={props.dashboard.shipments}
                                      toggleProgress={props.toggleProgress}
                                      showProgress={props.dashboard.isShowProgress}
                                      view={props.dashboard.progressView}
                                      switchView={props.progressView}
                        />
                    </Modal>
                    :
                    null
                }
            </div>
        </div>
    )
}

const MapState = state =>{
    return {
        dashboard: state.Dashboard,
        feedback: state.Feedback,
    }
}

const MapDispatch = dispatch =>{
    return {
        fetchUser: () => {dispatch(Actions.FetchAuthUser())},
        resendVerification: () => {dispatch(Actions.VerificationMailResend())},
        navigateDashboard: (menu) => dispatch(Actions.NavigateDashboard(menu)),
        inputHandler: (name,e,comp) => dispatch(InputHandler(name,e,comp)),
        closeModal:()=>dispatch({type:"TOGGLE_CLIENT_MODAL"}),
        trackShipment: (e,number) => {
            e.preventDefault();
            dispatch(TrackShipment(number))
        },
        toggleProgress: () => dispatch({type:ActionTypes.TOGGLE_SHIPMENT_PROGRESS}),
        progressView:(view)=> {dispatch({type: ActionTypes.TRACKING_VIEW_STYLE, payload: {view}})},
        logout : () => {
            dispatch({type:ActionTypes.LOGOUT})
            localStorage.removeItem("token");
            location.reload();
        }
    }
}

export default connect(MapState,MapDispatch)(Dashboard);
