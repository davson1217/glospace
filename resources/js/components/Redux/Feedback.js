import React, {useEffect} from 'react';
// import './CSS/Feedback.css'
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import * as ActionTypes from "./Actions/ActionTypes";

const Feedback = props =>{
    useEffect(()=>{
       setTimeout(()=>props.expireFeedback(),1400)
    },[]);

    const style={
        position: "absolute",
        top: 0,
        width: "100%",
        height: "50px",
        backgroundColor: "#DD500A",
        marginBottom:"10px",
        color:"white"
    }

    return (
        <div className="feedback" style={style}>
            <div className="closeToast"> </div>
            <div className="message d-flex justify-content-center align-content-center">
                <h3>{props.message}</h3>
            </div>
        </div>
    )
};

Feedback.propTypes = {
    message : PropTypes.string,
}

const MapDispatch = dispatch =>{
    return{
        expireFeedback : () =>dispatch({type:ActionTypes.SHOW_FEEDBACK,payload:{message:""}}),
    }
};

export default connect(null, MapDispatch)(Feedback);
