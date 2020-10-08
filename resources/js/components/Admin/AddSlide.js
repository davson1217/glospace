import React from 'react'
import {AddServiceHandler, AddSlidesHandler, InputHandler} from "../Redux/Actions/AdminActions";
import {connect} from "react-redux";

const AddSlide = props => {
    let fd = new FormData();
        fd.append("introText",props.slides.introText);
        fd.append("headerTextOne",props.slides.headerTextOne);
        fd.append("headerTextTwo",props.slides.headerTextTwo);
        fd.append("btnText",props.slides.btnText);
        fd.append("btnURL",props.slides.btnURL);
        fd.append("closingText",props.slides.closingText);
        fd.append("bgPhoto",props.slides.bgPhoto);
        fd.append("sidePhoto",props.slides.sidePhoto);
    return (
        <div>
            <form onSubmit={e=>props.addSlide(e,fd)}>
                <div className="row">
                    <div className="col-sm-12 input-wrapper mt-2">
                        <small>Background Photo</small>
                        <input type="file" placeholder={"Background Picture"} onChange={(e)=>props.inputHandler("bgPhoto",e,"Slides")}/>
                    </div>
                    <div className="col-sm-12 input-wrapper mt-2">
                        <small>Side Photo</small>
                        <input type="file" placeholder={"Side Picture"} onChange={(e)=>props.inputHandler("sidePhoto",e,"Slides")}/>
                    </div>
                    <div className="col-sm-12 input-wrapper mt-2">
                        <input type="text" placeholder={"Intro Text"} value={props.slides.introText} onChange={(e)=>props.inputHandler("introText",e,"Slides")}/>
                    </div>
                    <div className="col-sm-12 input-wrapper mt-2">
                        <input placeholder={"First Header Text"} value={props.slides.headerTextOne} onChange={(e)=>props.inputHandler("headerTextOne",e,"Slides")}/>
                    </div>
                    <div className="col-sm-12 input-wrapper mt-2">
                        <input placeholder={"Button Text"} value={props.slides.btnText} onChange={(e)=>props.inputHandler("btnText",e,"Slides")}/>
                    </div>
                    <div className="col-sm-12 input-wrapper mt-2">
                        <input placeholder={"Button URL"} value={props.slides.btnURL} onChange={(e)=>props.inputHandler("btnURL",e,"Slides")}/>
                    </div>
                    <div className="col-sm-12 input-wrapper mt-2">
                        <input placeholder={"Second Header Text"} value={props.slides.headerTextTwo} onChange={(e)=>props.inputHandler("headerTextTwo",e,"Slides")}/>
                    </div>
                    <div className="col-sm-12 input-wrapper mt-2">
                        <input placeholder={"Closing Text"} value={props.slides.closingText} onChange={(e)=>props.inputHandler("closingText",e,"Slides")}/>
                    </div>
                    <div className="col-sm-12 mt-2 text-center">
                        <button className="btn btn-dark"
                                disabled={!props.slides.introText || !props.slides.headerTextOne || !props.slides.headerTextTwo
                                || !props.slides.closingText || !props.slides.btnText || !props.slides.btnURL || !props.slides.bgPhoto }>
                            Add Slide
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

const MapState = state =>{
    return {
        slides: state.Admin
    }
}

const MapDispatch = dispatch =>{
    return {
        inputHandler: (name,event,component) => dispatch(InputHandler(name,event,component)),
        addSlide : (e,data) => {
            e.preventDefault();
            dispatch(AddSlidesHandler(data))
        }
    }
}
export default connect(MapState,MapDispatch)(AddSlide);
