import React from 'react';
import {withRouter} from 'react-router-dom';
// import PageIntro from "./Reusable/PageIntro";
import NavigationMenu from "./Reusable/Navigation";
import './Styles/About.css'
import * as Constants from './Constants/Constants'
import PageIntro from "./Reusable/PageIntro";
import Footer from "./Reusable/Footer";
const About = props => {

    const styles = {


        sectionHeadText:{
            fontFamily: Constants.Fonts.SubHeader,
            fontSize:'28px',
            fontWeight:'0px',
            textAlign:'center'
        },
        sectionSubheadText:{
            fontFamily: Constants.Fonts.SubHeader,
            fontSize:'25px',
            color: '#5c5a5a',
            fontWeight:'normal'
        },
        sectionText:{
            color: '#7a7676',
            fontSize: '17px',
            fontFamily: Constants.Fonts.Text
        },
    }

    return (
        <div style={{height:'100vh'}}>

        {/*----Page Intro Section*/}
            <NavigationMenu/>
            <PageIntro
                background={'/img/bg-subheader-service.jpg'}
                title={'About Us'}
                description={'About Page Description'}
            />
        {/*----Page Intro Section END----*/}

        {/* Page Main Content */}
            <main className='container mt-5'>

                <section className="who-and-what-wrapper">
                    <div className="row">
                    {/*----Who we are section----*/}
                        <div id='who-we-are' className="col-sm-12 col-lg-6">
                            <div className="row">
                                <div className="col-sm-12">
                                    <img src={"/img/we-are.jpg"} alt="who-we-are" style={{width:'100%'}}/>
                                </div>
                                <div className="col-sm-12">
                                    <h4 className="mt-4 mb-4" style={/*styles.sectionHeadText*/null}>WHO WE ARE</h4>
                                    <p style={/*{textIndent:'40px'}*/null}>
                                        GloSpace Logistics LLC. Is a Partnership-run start-up business dedicated to providing excellent and quality logistics services to Africans residing in Georgia.
                                        We are a registered and Licensed Freight Packaging, Shipping, Moving and Forwarding Logistics Services Company that is based in Tbilisi, Georgia.
                                    </p>
                                </div>
                            </div>
                        </div>
                    {/*----Who we are section END----*/}

                    {/*----What we do section----*/}
                        <div id='what-we-do' className="col-sm-12 col-lg-6">
                            <div className="row">
                                <div className="col-sm-12">
                                    <img src={"/img/we-do.jpg"} alt="who-we-are" style={{width:'100%'}}/>
                                </div>
                                <div className="col-sm-12">
                                    <h4 className="mt-4 mb-4" style={/*styles.sectionHeadText*/null}>WHAT WE DO</h4>
                                    <span style={/*{textIndent:'40px'}*/null}>Our services include, but not limited to: </span>
                                    <ul>
                                        <li>creating goods for transportation</li>
                                        <li>freight consolidation</li>
                                        <li>logistics consulting</li>
                                        <li>packing goods for transportation</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    {/*----What we do section END----*/}

                    </div>
                </section>

                <section className="why-choose-us mt-3">
                    <div className="row">
                        <div className="col-sm-12 text-center mt-5 mb-5">
                            <h4 style={/*styles.sectionHeadText*/null}>WHY CHOOSE US?</h4>
                            <span style={{fontStyle:'italic', color:'#5c5a5a'}}
                            >Find reasons to choose us as your freight partner</span>
                        </div>

                        <ul className="col-sm-12 mt-5">
                            <div className="row">

                                <li className="col-sm-12 col-lg-6 quality-service mb-4">
                                    <h6 style={/*styles.sectionSubheadText*/null} className='text-center'>Quality Services</h6>
                                    <p style={/*styles.sectionText*/null}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                    </p>
                                </li>

                                <li className="col-sm-12 col-lg-6 value-for-money">
                                    <h6 style={/*styles.sectionSubheadText*/null} className='text-center'>Value For Money</h6>
                                    <p style={/*styles.sectionText*/null}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                    </p>
                                </li>

                                <li className="col-sm-12 col-lg-6 competitive-rates mt-5">
                                    <h6 style={/*styles.sectionSubheadText*/null} className='text-center'>Competitive Rates</h6>
                                    <p style={/*styles.sectionText*/ null}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                    </p>
                                </li>

                                <li className="col-sm-12 col-lg-6 goods-safety mt-5">
                                   <h6 style={/*styles.sectionSubheadText*/null} className='text-center'>Assurance of Goods Safety</h6>
                                    <p style={/*styles.sectionText*/ null}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                    </p>
                                </li>
                            </div>
                        </ul>

                    </div>
                </section>
            </main>
        {/* --------Page Main Content END--------*/}

        {/* --------Page Footer Begin--------*/}
           <Footer/>
        {/* --------Page Footer End--------*/}

        </div>
    )
}

export default withRouter(About);
