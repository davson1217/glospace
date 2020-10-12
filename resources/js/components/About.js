import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom';
// import PageIntro from "./Reusable/PageIntro";
import NavigationMenu from "./Reusable/Navigation";
import './Styles/About.css'
import * as Constants from './Constants/Constants'
import PageIntro from "./Reusable/PageIntro";
import Footer from "./Reusable/Footer";
import * as LayoutActions from "./Redux/Actions/LayoutActions";
import {connect} from "react-redux";
import OpenPageLoader from "./Reusable/PageLoader";
const About = props => {

    useEffect(()=>{
        document.title = "Glospace | About"
        setTimeout(()=>{
            props.showLoader("About")
        },1300)
    })

    const styles = {


        sectionHeadText:{
            fontFamily: Constants.Fonts.SubHeader,
            fontSize:'28px',
            fontWeight:'0px',
            textAlign:'center'
        },
        sectionSubheadText:{
            fontFamily: Constants.Fonts.SubHeader,
            fontSize:'20px',
           // color: '#5c5a5a',
            fontWeight:'normal'
        },
        sectionText:{
            color: '#5c5a5a',
            fontSize: '16px',
            fontFamily: Constants.Fonts.Text
        },
        underline:{
            color:'white',
            border:'2px solid #DD500A',
            width:'80px'
        },
    }
    let page;
    page = props.layout.openPageLoader.about ? <OpenPageLoader/>:
        <div style={{height:'100vh'}}>

            {/*----Page Intro Section*/}
            <NavigationMenu/>
            <PageIntro
                background={'/img/bg-subheader-service.jpg'}
                title={''}
                description={'About Us'}
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
                                    <h4 className="mt-4 mb-4" style={styles.sectionHeadText}>WHO WE ARE</h4>
                                    <p style={styles.sectionText}>
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
                                    <h4 className="mt-4 mb-4" style={styles.sectionHeadText}>WHAT WE DO</h4>
                                    <span style={styles.sectionText}>Our services include, but not limited to: </span>
                                    <ul className="we-do-list">
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
                            <h4 style={styles.sectionHeadText}>WHY CHOOSE US?</h4>
                            <span style={{fontStyle:'italic', color:'#5c5a5a'}}
                            >Find reasons to choose us as your freight partner</span>
                        </div>

                        <ul className="col-sm-12 mt-5">
                            <div className="row">

                                <li className="col-sm-12 col-lg-6 quality-service mb-4">
                                    <h6 style={styles.sectionSubheadText} className='text-center'>Quality Services</h6>
                                    <div style={styles.underline}/>
                                    <p style={styles.sectionText}>
                                        Great service ambience is key to excellent service quality. With our effective service strategy, we focus not just only
                                        on our customers but also on our employees. We believe if our employees experience excellent quality service on the inside,
                                        they will be inspired to deliver same on the outside which will give us a rich customer experience.
                                    </p>
                                </li>

                                <li className="col-sm-12 col-lg-6 value-for-money">
                                    <h6 style={styles.sectionSubheadText} className='text-center'>Value For Money</h6>
                                    <div style={styles.underline}/>
                                    <p style={styles.sectionText}>
                                        Why spend more when you can spend less? Cheapest is not always best value.
                                        Getting your delivery done reliably and effectively with precision saves you lots.
                                        We guarantee that you will get the true value for your money.
                                    </p>
                                </li>

                                <li className="col-sm-12 col-lg-6 competitive-rates mt-5">
                                    <h6 style={styles.sectionSubheadText} className='text-center'>Competitive Rates</h6>
                                    <div style={styles.underline}/>
                                    <p style={styles.sectionText}>
                                        Our prices are moderate and highly competitive. Without hurting our bottom line, we are sacrificing lots to ensure that our customers
                                        get rates that are more affordable and competitive.
                                    </p>
                                </li>

                                <li className="col-sm-12 col-lg-6 goods-safety mt-5">
                                    <h6 style={styles.sectionSubheadText} className='text-center'>Assurance of Goods Safety</h6>
                                    <div style={styles.underline}/>
                                    <p style={styles.sectionText}>
                                        The essence of the whole supply chain and logistics services is safety. No safety no goods.
                                        We prioritize safety and make it our culture. From picking, to packing, storage, freighting,
                                        clearing and delivery, we ensure that we are guided by safety principles.
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

    return page;
}

const MapState = state =>{
    return {
        layout : state.Layout,
    }
}

const MapDispatch = dispatch =>{
    return {
        showLoader : (comp) => dispatch(LayoutActions.ShowLoader(comp)),
    }
}

export default connect(MapState,MapDispatch)(withRouter(About));
