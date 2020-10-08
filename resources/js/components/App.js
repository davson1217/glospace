import React,{useRef,useEffect} from 'react';
import {Switch, Route} from 'react-router-dom'
import Home from "./Home";
import Services from "./Services";
import About from "./About";
import Contact from "./Contact";
import TrackShipment from "./Tracking";
import LoginRegister from "./LoginRegister";
import {connect} from 'react-redux'
import Admin from "./Admin/Admin";
import Dashboard from "./Dashboard";
import FileDisplay from "./Admin/FileDisplay";
import InvoiceTable from "./Admin/InvoiceDisplay";
import VerifyEmail from "./DashboardComps/VerifyEmail";
import AdminLogin from "./Admin/AdminLogin";
import CreateSuperAdmin from "./Admin/SUPER/CreateSuperAdmin";

function App(props) {
    const rootRef = useRef(null);
    useEffect(()=>{
        const el = document.getElementById("app_id")
        //window.onscroll = () => console.log(el.scrollTop)//props.pageScroll()
    },[])
    return (
        <div style={{height:"100vh"}} ref={rootRef} id={"app_id"}>
            <Switch>
                <Route path={'/invoice/:invoice_number'} component={InvoiceTable}/>
                <Route exact path={'/paymentUpload/:filename'} component={FileDisplay}/>
                <Route path={'/admin/dashboard'} component={Admin}/>
                <Route path={'/admin/super/super'} component={CreateSuperAdmin}/>
                <Route path={'/admin'} component={AdminLogin}/>
                <Route path={'/dashboard/:userId'} component={VerifyEmail}/>
                <Route path={'/dashboard'} component={Dashboard}/>
                <Route path={'/login'} component={LoginRegister}/>
                <Route path={'/track-shipment'} component={TrackShipment}/>
                <Route path={'/contact'} component={Contact}/>
                <Route path={'/about'} component={About}/>
                <Route path={'/services'} component={Services}/>
                <Route exact path={'/'} component={Home}/>
            </Switch>
        </div>
    )
}

const MapState = state =>{
    return {
        layout : state.Layout
    }
}

const MapDispatch = dispatch =>{
    return {
        // pageScroll : (scrollValue) => dispatch(LayoutActions.PageScroll(scrollValue)),
    }
}

export default connect(MapState, MapDispatch)(App);
