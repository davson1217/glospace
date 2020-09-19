import React from 'react';
import PageIntro from "./Reusable/PageIntro";
import './Styles/Contact.css';
import Footer from "./Reusable/Footer";
import NavigationMenu from "./Reusable/Navigation";

const Contact = () => {
    return (

        <div className='ContactContainer'>
            {/*----Page Intro Section*/}
            <NavigationMenu/>
            <PageIntro
                background={'/img/bg-subheader-contact.jpg'}
                title={'Contact Us'}
                description={'Contact Page'}
            />
            {/*----Page Intro Section END----*/}
            <main className="container mt-5">
                <div className="row">
                    <div className="col-sm-12 col-lg-6 contact-form-wrapper">
                        <div className="row">
                            <div className="col-sm-12 text-center">
                                <h4>Send Us a Message</h4>
                            </div>
                            <div className="col-sm-12">
                                <form>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="row">
                                                <div className="col-sm-12">First Name</div>
                                                <div className="col-sm-12">
                                                    <input type="text" placeholder="First Name" className="contact-input"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="row">
                                                <div className="col-sm-12">Last Name</div>
                                                <div className="col-sm-12">
                                                    <input type="text" placeholder="Last Name" className="contact-input"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-12 mt-3">
                                            <div className="row">
                                                <div className="col-sm-12"><span className='text-danger'>* </span> Email Address</div>
                                                <div className="col-sm-12">
                                                    <input type="text" placeholder="Email Address" className="contact-input"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-12 mt-3">
                                            <div className="row">
                                                <div className="col-sm-12">Subject</div>
                                                <div className="col-sm-12">
                                                    <input type="text" placeholder="Subject" className="contact-input"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-12 mt-3">
                                            <div className="row">
                                                <div className="col-sm-12"><span className='text-danger'>* </span>Message</div>
                                                <div className="col-sm-12">
                                                    <textarea className="contact-input"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-12 mt-3">
                                            <button className="btn btn-success">Send Message</button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-6 contact-address">
                        <div className="row">
                            <div className="col-sm-12 text-center">
                                <h4>Our Branch</h4>
                            </div>
                            <div className="col-sm-12">
                                <h4>Head Office</h4>
                                <div className="address">
                                    <div className="row">
                                        <div className="col-sm-12"><b>Georgia</b></div>
                                        <div className="col-sm-12 mb-3"><b>Address:</b> 123 Merab Kostava</div>
                                        <div className="col-sm-12 mb-3"><b>Phone: </b>+995122222</div>
                                        <div className="col-sm-12"><b>Email: </b>something@something.com</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}
export default  Contact;
