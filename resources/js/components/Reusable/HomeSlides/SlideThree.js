import React from 'react';
// import './Styles/Slide.css'
import PropTypes from 'prop-types';
import Slides from "./Slides";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

const SlideThree = (props) =>{
    let slide ="";

    if (Object.keys(props.slides).length){
        slide = (
            <div className="slide-wrapper" style={{backgroundImage:`url(storage/slides/${props.slides[2].bg})`}}>
                <div className="container">
                    <div className="row">

                        <div className="col-sm-12 col-lg-6 side-text-container">
                            <div className="row mt-5">

                                <div className="col-sm-12 text-center mt-5">
                                    <span id="first-hint">{props.slides[2].intro_text}</span>
                                    {/*<span className="ml-5" id="second-hint">On Time and Safe Delivery</span>*/}
                                </div>

                                <div className="col-sm-12 mt-3 head-one-wrap">
                                    <h2>{props.slides[2].header_one}</h2>
                                </div>

                                <div className="col-sm-12 head-two-wrap">
                                    <h2 className="text-center">{props.slides[2].header_two}</h2>
                                </div>

                                <div className="col-sm-12 mt-4 track-btn-wrap text-center">
                                    <NavLink to={`${props.slides[2].button_link}`} style={{textDecoration:"none", color:"white"}}>
                                        {props.slides[2].button_text}
                                    </NavLink>
                                </div>

                                <div className="col-sm-12 mt-4 closing-text text-center">
                                    <p id="third-hint">{props.slides[2].closing_text}</p>
                                </div>

                            </div>
                        </div>

                        <div className="col-sm-12 col-lg-6">
                            {/*<img src={"/img/aviary.png"} alt=""/>*/}
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    return slide;
}
Slides.propTypes={
    slide:PropTypes.array,
}

const MapState=state=>{
    return {
        slides : state.Admin.slides,

    }
}

export default connect(MapState,null)(SlideThree);
