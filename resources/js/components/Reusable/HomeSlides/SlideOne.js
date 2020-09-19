import React from 'react';
import './Styles/SlideOne.css'
const SlideOne = () =>{
        return (
            <div className="slide-one-wrapper">
                <div className="container">
                    <div className="row">

                        <div className="col-sm-12 col-lg-6 side-text-container">
                            <div className="row">

                                <div className="col-sm-12 text-center">
                                    <span id="first-hint">Team Up with solutions.</span>
                                    <span className="ml-5" id="second-hint">On Time and Safe Delivery</span>
                                </div>

                                <div className="col-sm-12 mt-3 head-one-wrap">
                                    <h2>LOGISTICS SERVICES </h2>
                                </div>

                                <div className="col-sm-12 head-two-wrap">
                                    <h2 className="text-center">AT ITS FORTE</h2>
                                </div>

                                <div className="col-sm-12 mt-4 track-btn-wrap text-center">
                                    <button className="btn btn-secondary">TRACK SHIPMENT</button>
                                </div>

                                <div className="col-sm-12 mt-4 track-btn-wrap text-center">
                                    <p id="third-hint">Pick up, Pack up, Swift transfer, Real time communication, excellent delivery. </p>
                                </div>

                            </div>
                        </div>

                        <div className="col-sm-12 col-lg-6">
                            <img src={"/img/aviary.png"} alt=""/>
                        </div>

                    </div>
                </div>
            </div>
        )
}

export default SlideOne;
