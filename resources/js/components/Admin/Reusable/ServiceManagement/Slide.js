import React from 'react';
import PropTypes from 'prop-types';

const Slide = props =>{

    return (
        <div className="col-sm-12 col-lg-3 mr-2 text-center card service">
            <div className="row">

                <div className="col-sm-12 service-pic">
                    <div className="row">

                        <div className="col-sm-6">
                            <span>background</span>
                            <img src={`/storage/slides/${props.slide.bg}`} style={null} width={100} height={100} alt={"Background Picture"}/>
                        </div>

                        <div className="col-sm-6">
                            <span>side</span>
                            <img src={`/storage/slides/${props.slide.side_photo}`} style={null} width={100} height={100} alt={"Side Picture"}/>
                        </div>

                    </div>
                </div>

                <div className="card-body">
                    <div className="col-sm-12">
                        <span>{props.slide.intro_text}</span>
                    </div>
                    <div className="col-sm-12">
                        <h5>{props.slide.header_one}</h5>
                    </div>
                    <div className="col-sm-12">
                        <h6>{props.slide.header_two}</h6>
                    </div>
                    <div className="row text-center col-sm-12 mt-1">
                        <button>{props.slide.button_text}</button>
                        <span>{props.slide.button_link}</span>
                    </div>
                    <div className="col-sm-12 mt-1">
                        <span>{props.slide.closing_text}</span>
                    </div>
                </div>

                <div className="col-sm-12 text-center d-flex justify-content-between card-footer">
                    {/*<button className="btn btn-warning" disabled={true}>EDIT</button>*/}
                    <button className="btn btn-danger"
                            onClick={()=>props.deleteSlide(props.slide.id,props.slide.bg,props.slide.side_photo)}>
                        DELETE
                    </button>
                </div>

            </div>
        </div>
    )
}

Slide.propTypes = {
    slide:PropTypes.object,
    deleteSlide : PropTypes.func,
}

export default Slide;
