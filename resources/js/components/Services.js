import React, {useEffect,useRef} from 'react';
import {NavLink, withRouter} from 'react-router-dom'
import './Styles/Services.css'
import PageIntro from "./Reusable/PageIntro";
import {Button} from "reactstrap";
import Footer from "./Reusable/Footer";
import NavigationMenu from "./Reusable/Navigation";
import ServicesList from "./Reusable/ServicesList";
import ContactBanner from "./Reusable/ContactBanner";
import * as LayoutActions from "./Redux/Actions/LayoutActions";
import {connect} from "react-redux";

const Services = props => {
    const rootRef = useRef(null)
    useEffect(()=>{

    },[props.layout.scrollValue])

    return (
        <div className='ServiceContainer' ref={rootRef} id={"service_container"} onScroll={()=>console.log("k")}>
        {/*----Page Intro Section*/}
            <NavigationMenu topValue={props.layout.scrollValue}/>
            <PageIntro
                background={'/img/bg-subheader-service.jpg'}
                title={'Services'}
                description={'Service Descriptions'}
            />
        {/*----Page Intro Section END----*/}

        {/* Page Main Content */}
            <main className='container'>
                <ServicesList/>

                <section className="col-sm-12 pb-4" style={{backgroundColor:"black",padding:"20px",marginBottom:"30px"}}>
                    <ContactBanner/>
                </section>

            </main>
        {/* Page Main Content END*/}

        {/* --------Page Footer Begin--------*/}
        <div className="footer" style={{minHeight:"5vh"}}>
            <Footer/>
        </div>
        {/* --------Page Footer End--------*/}
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
        toggleModal : () => dispatch(LayoutActions.ToggleModal()),
        pageScroll : (scrollValue) => dispatch(LayoutActions.PageScroll(scrollValue)),
    }
}

export default connect(MapState,MapDispatch)(Services);
