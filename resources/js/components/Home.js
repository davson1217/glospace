import React,{useEffect, useRef} from 'react';
import {NavLink, withRouter} from 'react-router-dom'
import NavigationMenu from "./Reusable/Navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'pure-react-carousel/dist/react-carousel.es.css';
import ServicesList from "./Reusable/ServicesList";
import './Styles/Home.css'
import ContactBanner from "./Reusable/ContactBanner";
import * as Constants from "./Constants/Constants";
import {connect} from "react-redux";
import SideModal from "./Reusable/SideModal";
import * as LayoutActions from './Redux/Actions/LayoutActions'
import SlideOne from "./Reusable/HomeSlides/SlideOne";
import {FetchServiceHandler, FetchSlidesHandler} from "./Redux/Actions/AdminActions";
import Slides from "./Reusable/HomeSlides/Slides";
import SlideTwo from "./Reusable/HomeSlides/SlideTwo";
import SlideThree from "./Reusable/HomeSlides/SlideThree";
import Footer from "./Reusable/Footer";
import OpenPageLoader from "./Reusable/PageLoader";
import Modal from "./Admin/Modal/Modal";

const Home = props => {

    const rootRef = useRef(null);

    useEffect(()=>{
        props.fetchSlides();
        props.fetchServices();
        setTimeout(()=>{
           props.showLoader("Home")
        },2000)
    },[])

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 5000,
        cssEase: "linear"
    };
    let page;
    let serviceView = props.layout.serviceView;
     page = props.layout.openPageLoader.home ? (
            <OpenPageLoader/>
         ) :
        (
            <div className="home-content-wrapper" id="home_container" ref={rootRef} onScroll={()=>props.pageScroll(rootRef)}>

                <NavigationMenu topValue={props.layout.scrollValue} component={"Home"}/>

                <Slider {...settings} style={{marginBottom:"20px",paddingBottom:"0"}}>
                    <SlideOne/>
                    <SlideTwo/>
                    <SlideThree/>
                </Slider>

                <section className='container home-service-list col-sm-12'>
                    <ServicesList viewService={props.viewService} services={props.services} component={"Home"}/>
                </section>

                <section className="intro-about-us col-sm-12 mt-3 mb-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 p-2 progressive-wrapper">
                                <h4 className='text-light'>GLOSPACE LOGISTICS LLC</h4>
                                <p/>
                            </div>
                            <div className="col-sm-12 intro-about-us-text-wrap">
                                <p>
                                    We offer a broad spectrum of transportation, forwarding, distribution, and logistic services.
                                    We are committed to providing excellent and quality logistics services from local to international destinations.
                                    We take care of your imports, exports, everything we do is focused on our customers. Regardless of their location,
                                    we have a custom based solutions tailored to every of our customer needs. Relentlessly, we will strive to protect
                                    our environment while fulfilling our Corporate social responsibility.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <main className="container">
                    <div className="row">

                        <section className="col-sm-12 mt-5"> {/*NEWS SECTION*/}
                            {/*<div className="row">

                                <div className="col-sm-12 col-lg-6">
                                    <img src={"/img/office-mover.png"} alt="office mover"/>
                                </div>

                                <div className="col-sm-12 col-lg-6">
                                    <div className="row">

                                        <div className="col-sm-12">
                                            <p style={{fontSize:Constants.FontSize.subText, color:Constants.color.primaryTextColor}}>
                                                You have nothing to worry about. We constantly monitor each shipment,
                                                so if it’s not delivered within 25 working days, you’re eligible for
                                                an instant re-ship or a full refund
                                            </p>
                                            <p>
                                                <NavLink to={'/services'} className="btn btn-success">Read More</NavLink>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>*/}
                        </section>

                        <section className="col-sm-12 mt-5">
                            <div className="row">

                                <div className="col-sm-12 col-lg-6">
                                    <div className="row">
                                        <div className="col-sm-12 mt-5 mb-2 home-why-choose-us">
                                            <h4 style={null}>WHY CHOOSE US?</h4>
                                            <span style={{fontStyle:'italic', color:'#5c5a5a'}}>
                                                {/*Find reasons to choose us as your freight partner*/}
                                                Because We Are S.M.A.R.T
                                            </span>
                                            <div className="text-center">
                                                <p className='text-center'/>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 home-about-us-list">
                                            <ul>
                                                <li className="col-sm-12">
                                                    <h6 className=''>SPECIFIC</h6>
                                                    <p> We are committed to serving you right.</p>
                                                </li>
                                                <li className="col-sm-12">
                                                    <h6 className=''>MEASURABLE</h6>
                                                    <p>We go the extra length to exceed your expectations. Delivering excellence.</p>
                                                </li>
                                                <li className="col-sm-12">
                                                    <h6 className=''>ATTAINABLE</h6>
                                                    <p>We do not make promises we can’t keep.</p>
                                                </li>
                                                <li className="col-sm-12">
                                                    <h6 className=''>RELATIONSHIP</h6>
                                                    <p>We value our customers.</p>
                                                </li>
                                                <li className="col-sm-12">
                                                    <h6 className=''>TIME BOUND</h6>
                                                    <p>We are always on time. </p>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-lg-6 commitment-message-box">
                                    <div className="row">
                                        <div className="col-sm-12 p-3"><img src={"/img/left-quote.svg"} alt="quote" width={100}/></div>
                                        <div className="col-sm-12 text-center p-2 brand-quote">
                                            Our mission is to become the No.1 choice of logistic solutions for Africans living in Georgia
                                        </div>
                                        <div className="col-sm-12 p-3 text-right"><img src={"/img/right-quote.svg"} alt="quote" width={100}/></div>
                                    </div>
                                    {/*<h6>Team Commitment</h6>*/}
                                    {/*<p>We are commited to blah blah blah</p>*/}
                                </div>

                            </div>
                        </section>

                        <section className="mt-5 col-sm-12" style={{backgroundColor:"black",padding:"20px",marginBottom:"30px"}}>
                            <ContactBanner/>
                        </section>

                    </div>
                </main>

                {serviceView.showServiceModal ?
                    <Modal title={"Service"}
                           modalHeight={'60vh'}
                           modalWidth={'60%'}
                           modalPosition={'10%'}
                           closeModal={()=>props.viewService({})}>
                            <div className="row text-center">
                                <div className="col-sm-12">
                                    <h4>{serviceView.serviceToView.title}</h4>
                                </div>
                                <div className="mb-3 col-sm-12">
                                    <img src={`/storage/services/${serviceView.serviceToView.photo}`} alt="" style={{width:"50%"}}/>
                                </div>
                                <div className="service-desc col-sm-12">
                                    {serviceView.serviceToView.description}
                                </div>
                            </div>
                    </Modal>
                    : null
                }

                <Footer />
                {/*<SideModal modal={props.layout.isShowModal} closeModal={props.toggleModal}/>*/}
            </div>
        )
    return page
}

const MapState = state =>{
    return {
        layout : state.Layout,
        services : state.Admin.services,
        slides : state.Admin.slides,
    }
}

const MapDispatch = dispatch =>{
    return {
        viewService : (service) => dispatch(LayoutActions.ViewService(service)),
        pageScroll : (ref) => dispatch(LayoutActions.PageScroll(ref)),
        showLoader : (comp) => dispatch(LayoutActions.ShowLoader(comp)),
        fetchServices : () => dispatch(FetchServiceHandler()),
        fetchSlides : () => dispatch(FetchSlidesHandler()),
    }
}

export default connect(MapState, MapDispatch)(Home);
