import React,{useRef,useEffect} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {Switch, Route} from 'react-router-dom'
import Home from "./Home";
import Services from "./Services";
import About from "./About";
import NavigationMenu from "./Reusable/Navigation";
import Contact from "./Contact";
import TrackShipment from "./Tracking";
import LoginRegister from "./LoginRegister";
import * as LayoutActions from "./Redux/Actions/LayoutActions";
import {connect} from 'react-redux'
import Admin from "./Admin/Admin";
function App() {
    const rootRef = useRef(null);
    useEffect(()=>{
        const el = document.getElementById("app_id")
        //window.onscroll = () => console.log(el.scrollTop)//props.pageScroll()
    },[])
    return (
        <div style={{height:"100vh"}} ref={rootRef} id={"app_id"}>
            <Switch>
                <Route path={'/admin'} component={Admin}/>
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
        pageScroll : (scrollValue) => dispatch(LayoutActions.PageScroll(scrollValue)),
    }
}

export default connect(MapState, MapDispatch)(App);
