import React from 'react';
import PropTypes from 'prop-types';

const Slide = props =>{

    return (
        <div className="col-sm-12 col-lg-3 text-center">
            <div className="row">
                <div className="col-sm-12 service-pic">
                    <div className="row">
                        <div className="col-sm-6">
                            <span>background</span>
                            <img src={`/storage/slides/${props.bg}`} style={null} width={100} alt={"Background Picture"}/>
                        </div>
                        <div className="col-sm-6">
                            <span>side</span>
                            <img src={`/storage/slides/${props.side}`} style={null} width={100} alt={"Side Picture"}/>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12">
                    <span>{props.intro}</span>
                </div>
                <div className="col-sm-12">
                    <h4>{props.headerOne}</h4>
                </div>
                <div className="col-sm-12">
                    <h5>{props.headerTwo}</h5>
                    <div className="row text-center">
                        <button>{props.buttonText}</button>
                        <span>{props.buttonURL}</span>
                    </div>
                </div>
                <div className="col-sm-12">
                    <span>{props.closing}</span>
                </div>
                <div className="col-sm-12 text-center d-flex justify-content-between">
                    <button className="btn btn-warning" disabled={true}>EDIT</button>
                    <button className="btn btn-danger"
                            onClick={()=>props.deleteSlide(props.slideId,props.bg,props.side)}>
                        DELETE
                    </button>
                </div>
            </div>
        </div>
    )
}

Slide.propTypes = {
    bg : PropTypes.string,
    side : PropTypes.string,
    intro : PropTypes.string,
    headerOne : PropTypes.string,
    headerTwo : PropTypes.string,
    closing : PropTypes.string,
    buttonText : PropTypes.string,
    buttonURL : PropTypes.string,
    slideId : PropTypes.number,
    deleteSlide : PropTypes.func,
}

export default Slide;
