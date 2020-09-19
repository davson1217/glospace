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

const Home = props => {
    const rootRef = useRef(null);
    useEffect(()=>{
        // const el = document.getElementById("home_container");
        // el.onscroll = () => props.pageScroll(el.scrollTop);
    },[props.layout.scrollValue])

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 200000,
        cssEase: "linear"
    };
    return(
        <div className="home-content-wrapper" id="home_container" ref={rootRef} onScroll={()=>props.pageScroll(rootRef)}>
            <NavigationMenu topValue={props.layout.scrollValue}/>
                <Slider {...settings} style={{marginBottom:"20px",paddingBottom:"0"}}>
                    <SlideOne/>
                    <SlideOne/>
                    <SlideOne/>
                </Slider>

                <section className='container home-service-list col-sm-12'>
                    <ServicesList viewService={()=>props.toggleModal()}/>
                </section>

                <section className="intro-about-us col-sm-12 mt-3 mb-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 p-2 progressive-wrapper">
                                <h4 className='text-light'>PROGRESSIVE LOGISTICS COMPANY</h4>
                                <p/>
                            </div>
                            <div className="col-sm-12 intro-about-us-text-wrap">
                                <p>
                                    We provide logistic services in the nation, whether it is freight transportation, supply chain solutions,
                                    warehousing and distribution, customer resource area services, customs, security and insurance, temperature controlled logistics,
                                    industry sector solutions, brokerage, or lead logistic based solutions. Our company has through years of experience in this industry
                                    has been able to create a network of associates across the length and breadth of country, with our own logistic centers spread throughout
                                    the country, which helps us to provide safe, reliable, economical and customized logistic solutions to our clients and partners.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>


            <main className="container">
                <div className="row">

                    <section className="col-sm-12 mt-5">
                        <div className="row">

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
                        </div>
                    </section>

                    <section className="col-sm-12 mt-5">
                        <div className="row">

                            <div className="col-sm-12 col-lg-6">
                                <div className="row">
                                    <div className="col-sm-12 mt-5 mb-2 home-why-choose-us">
                                        <h4 style={null}>WHY CHOOSE US?</h4>
                                        <span style={{fontStyle:'italic', color:'#5c5a5a'}}
                                        >Find reasons to choose us as your freight partner</span>
                                        <div className="text-center">
                                            <p className='text-center'/>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 home-about-us-list">
                                        <ul>
                                            <li className="col-sm-12">
                                                <h6 className=''>Quality Services</h6>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                                </p>
                                            </li>
                                            <li className="col-sm-12">
                                                <h6 className=''>Competitive Rates</h6>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                                </p>
                                            </li>
                                            <li className="col-sm-12">
                                                <h6 className=''>Assurance of Goods Safety</h6>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                                </p>
                                            </li>
                                            <li className="col-sm-12">
                                                <h6 className=''>Value For Money</h6>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                                </p>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12 col-lg-6 commitment-message-box">
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
            {props.layout.isShowModal ? <SideModal/> : null}
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
        pageScroll : (ref) => dispatch(LayoutActions.PageScroll(ref)),
    }
}

export default connect(MapState, MapDispatch)(Home);
