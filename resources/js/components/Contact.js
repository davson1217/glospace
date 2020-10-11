import React, {useEffect} from 'react';
import PageIntro from "./Reusable/PageIntro";
import './Styles/Contact.css';
import Footer from "./Reusable/Footer";
import NavigationMenu from "./Reusable/Navigation";
import {InputHandler} from "./Redux/Actions/AdminActions";
import {connect} from "react-redux";
import {ShowLoader, SubmitEnquiry} from "./Redux/Actions/LayoutActions";
import OpenPageLoader from "./Reusable/PageLoader";

const Contact = props => {

    useEffect(()=>{
        document.title = "Glospace | Contact"
        setTimeout(()=>{
            props.showLoader("Contact")
        },1300)
    })

    let data = {
        name: props.layout.clientFirstName + " " + props.layout.clientLastName,
        email: props.layout.clientEmail,
        subject: props.layout.querySubject,
        message: props.layout.query,
    }
    let page;
    page = props.layout.openPageLoader.contact ? <OpenPageLoader/>:
        (
            <div className='ContactContainer'>
                {/*----Page Intro Section*/}

                <NavigationMenu/>
                <PageIntro
                    background={'/img/bg-subheader-contact.jpg'}
                    title={''}
                    description={'Contact Us'}
                />

                {/*----Page Intro Section END----*/}
                <main className="container mt-5">
                    <div className="row">

                        <div className="col-sm-12 col-lg-6 contact-form-wrapper">
                            <div className="row">

                                <div className="col-sm-12 text-center contact-header">
                                    <h4>Send Us a Message</h4>
                                </div>

                                <div className="col-sm-12">
                                    <form onSubmit={e=> {e.preventDefault();props.submitEnquiry(data)}}>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="row">
                                                    <div className="col-sm-12 input-desc"><span className='text-danger'>* </span>First Name</div>
                                                    <div className="col-sm-12">
                                                        <input type="text" placeholder="" className="contact-input" autoFocus={true}
                                                               onChange={e=>props.inputHandler("clientFirstName",e,"Contact")} value={props.layout.clientFirstName}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="row">
                                                    <div className="col-sm-12 input-desc"><span className='text-danger'>* </span>Last Name</div>
                                                    <div className="col-sm-12">
                                                        <input type="text" placeholder="" className="contact-input"
                                                               onChange={e=>props.inputHandler("clientLastName",e,"Contact")} value={props.layout.clientLastName}/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-12 mt-3">
                                                <div className="row">
                                                    <div className="col-sm-12 input-desc"><span className='text-danger'>* </span> Email Address</div>
                                                    <div className="col-sm-12">
                                                        <input type="email" placeholder="" className="contact-input"
                                                               onChange={e=>props.inputHandler("clientEmail",e,"Contact")} value={props.layout.clientEmail}/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-12 mt-3">
                                                <div className="row">
                                                    <div className="col-sm-12 input-desc"><span className='text-danger'>* </span>Subject</div>
                                                    <div className="col-sm-12">
                                                        <input type="text" placeholder="" className="contact-input"
                                                               onChange={e=>props.inputHandler("querySubject",e,"Contact")} value={props.layout.querySubject}/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-12 mt-3">
                                                <div className="row">
                                                    <div className="col-sm-12 input-desc">
                                                        <span className='text-danger'>* </span>
                                                        Message
                                                    </div>
                                                    <div className="col-sm-12">
                                                    <textarea className="contact-input"
                                                              onChange={e=>props.inputHandler("query",e,"Contact")} value={props.layout.query}/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-12 mt-3 text-right send-message-wrap">
                                                <button disabled={!props.layout.clientFirstName ||
                                                !props.layout.clientLastName ||
                                                !props.layout.clientEmail ||
                                                !props.layout.querySubject ||
                                                !props.layout.query }>
                                                    Send Message
                                                </button>
                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-12 col-lg-6 contact-address">
                            <div className="row">

                                <div className="col-sm-12 text-center">
                                    <h4 className="our-branch">Our Branch</h4>
                                </div>

                                <div className="col-sm-12">
                                    {/*<h4>Head Office</h4>*/}
                                    <div className="address">
                                        <div className="row">

                                            <div className="col-sm-12 col-lg-7">
                                                <div className="col-sm-12 mb-3 Georgia-branch">
                                                    <b><img src={"/img/georgia.svg"} alt="GE" width={22}/> Georgia </b>
                                                    (Head Office)
                                                </div>

                                                <div className="col-sm-12 mb-3 address-desc-wrap">
                                                    <img src={"/img/pin.svg"} alt="location" width={20}/>
                                                    <span className="ml-2">Merab Kostava 26 Floor 5, Flat 14</span>
                                                </div>

                                                <div className="col-sm-12 mb-3 address-desc-wrap">
                                                    <img src={"/img/phone.svg"} alt="phone" width={20}/> <span className="ml-2">+995 591 880 567</span>
                                                </div>

                                                <div className="col-sm-12 mb-3 address-desc-wrap">
                                                    <img src={"/img/email.svg"} alt="phone" width={20}/> <span className="ml-2">info@glospacelogistics.com</span>
                                                </div>
                                            </div>

                                            {/*<div className="col-sm-12 col-lg-5">
                                                <div className="col-sm-12 mb-3 Georgia-branch">
                                                    <b><img src={"/img/nigeria.svg"} alt="GE" width={22}/> Nigeria </b>
                                                </div>

                                                <div className="col-sm-12 mb-3 address-desc-wrap">
                                                    <img src={"/img/pin.svg"} alt="location" width={20}/>
                                                    <span className="ml-2">123 fakeria street</span>
                                                </div>

                                                <div className="col-sm-12 mb-3 address-desc-wrap">
                                                    <img src={"/img/phone.svg"} alt="phone" width={20}/> <span className="ml-2">+234 591 880 567</span>
                                                </div>
                                            </div>*/}

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </main>
                {/*<div style={{position:"absolute",top:0}}>*/}
                    <Footer/>
                {/*</div>*/}
            </div>
        )
    return page
}

const MapState = state =>{
    return {
        layout : state.Layout
    }
}

const MapDispatch = dispatch =>{
     return {
         inputHandler : (name,e,comp) => dispatch(InputHandler(name,e,comp)),
         submitEnquiry : (data) => dispatch(SubmitEnquiry(data)),
         showLoader : (comp) => dispatch(ShowLoader(comp)),
     }
}

export default connect(MapState,MapDispatch)(Contact);
