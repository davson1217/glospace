import React from 'react'
import PropTypes from 'prop-types'

const AddProgress = props =>{

    let fd = new FormData();
    fd.append("subject",props.progressSubject);
    fd.append("description",props.progressDescription);
    fd.append("location",props.progressLocation);
    fd.append("range",`${props.progressRange}`);
    fd.append("labelId",`${props.labelId}`);
    fd.append("trackingNumber",`${props.trackingNumber}`);

    return (
        <form onSubmit={(e)=>props.addProgress(e,fd)}>
            <div className="row">
                <div className="col-sm-2"><img src={"/img/hourglass.svg"} alt="" width={15}/></div>
                <div className="col-sm-3">
                    <input type="text" onChange={(e)=>props.inputHandler("progressSubject",e,"Tracking")}
                           placeholder={"subject"} className="add-progress-input" value={props.progressSubject}/>
                </div>
                <div className="col-sm-3">
                    <input type="text" onChange={(e)=>props.inputHandler("progressDescription",e,"Tracking")}
                           placeholder={"description"} className="add-progress-input" value={props.progressDescription}/>
                </div>
                <div className="col-sm-4">
                    <input type="text" onChange={(e)=>props.inputHandler("progressLocation",e,"Tracking")}
                           placeholder={"location"} className="add-progress-input" value={props.progressLocation}/>
                </div>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-2"> </div>
                        <div className="col-sm-8">
                            <small><b>Shipment Progress Bar (Progress: {props.progressRange}%)</b></small>
                            <input type="range" name="progress"
                                   onChange={(e)=>props.inputHandler("progressRange",e,"Tracking")}
                                   min={0} max={100} step={10} value={props.progressRange}
                                   className="tracking-input custom-range"/>
                        </div>
                        <div className="col-sm-2"> <button type={"submit"}>Add</button> </div>
                    </div>

                </div>
            </div>
        </form>
    )
}

AddProgress.propTypes = {
    inputHandler: PropTypes.func,
    addProgress: PropTypes.func,
    progressRange: PropTypes.number,
    progressSubject: PropTypes.string,
    progressDescription: PropTypes.string,
    progressLocation: PropTypes.string,
    labelId: PropTypes.number,
    trackingNumber: PropTypes.number,
}

export default AddProgress;
