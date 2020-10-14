import React from 'react'
import PropTypes from 'prop-types';

const TrackingForm = props =>{
    return (
        <div className="tacking-wrapper">
            <ul>
                {/*<li>Track a Shipment</li>*/}
                {/*<li>Received </li>*/}
            </ul>
            <h5 className={"text-center"}>Track a shipment</h5>
            {props.dashboard.trackingError?<h6 className="text-danger text-center">{props.dashboard.trackingError}</h6> : null}
            <form className="mt-4 text-center">
                <div className="row">
                    <div className="col-sm-12 tracking-num-input-wrap">
                        <input type="text"
                               placeholder={"Consignment Number e.g G0123456789"}
                               style={{width:"80%",height:"40px"}}
                               value={props.dashboard.trackingNumber}
                               onChange={e=>props.inputHandler("trackingNumber",e,"Dashboard")}
                        />
                    </div>
                    <div className="col-sm-12 mt-3 text-center">
                        {props.dashboard.isRequestTracking?
                            <button className="btn btn-dark" type={"button"} disabled={true}>Tracking...</button>:
                            <button className=""
                                    disabled={!props.dashboard.trackingNumber}
                                    style={{width:"120px",height:"40px",backgroundColor:'black',color:'white'}}
                                    onClick={e=>props.trackShipment(e,props.dashboard.trackingNumber)}
                            >Track</button>
                        }
                    </div>
                </div>
            </form>
        </div>
    )
}

TrackingForm.propTypes ={
    dashboard: PropTypes.object,
    inputHandler: PropTypes.func,
    trackShipment: PropTypes.func
}

export  default  TrackingForm;
