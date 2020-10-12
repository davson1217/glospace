import React,{useEffect} from 'react';
import ShipmentProgress from "./ShipmentProgress";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import * as Actions from "../../../Redux/Actions/ShipmentActions";
import {InputHandler} from "../../../Redux/Actions/AdminActions";
import {AddProgressHandler} from "../../../Redux/Actions/ShipmentActions";

const LabelView = props =>{

    useEffect(()=>{
        props.fetchShipmentProgress(props.store.clickedLabel.tracking_number)
        // console.log(props.store.clickedLabel.progress)
    },[])

        let clients ;

        if (Object.keys(props.store.clickedLabelProgress).length){
            clients = (
                <div className="row">

                    <div className="col-sm-12 col-lg-6">
                        <h6 className="text-center">Sender</h6>
                        <div className="col-sm-12 row">
                            <div className="col-sm-6">Name:</div>
                            <div className="col-sm-6">{props.store.clickedLabelProgress[0].sender[0].name}</div>
                        </div>
                        <div className="col-sm-12 row">
                            <div className="col-sm-6">Address:</div>
                            <div className="col-sm-6">{props.store.clickedLabelProgress[0].sender[0].address}</div>
                        </div>
                        {/*<div className="col-sm-12 row">
                            <div className="col-sm-6">GS Number:</div>
                            <div className="col-sm-6">{props.store.clickedLabelProgress[0].sender[0].gs_number}</div>
                        </div>*/}
                        <div className="col-sm-12 row">
                            <div className="col-sm-6">State:</div>
                            <div className="col-sm-6">{props.store.clickedLabelProgress[0].sender[0].state}</div>
                        </div>
                        <div className="col-sm-12 row">
                            <div className="col-sm-6">Country:</div>
                            <div className="col-sm-6">{props.store.clickedLabelProgress[0].sender[0].country}</div>
                        </div>
                    </div>


                    <div className="col-sm-12 col-lg-6">
                        <h6 className="text-center">Receiver</h6>
                        <div className="col-sm-12 row">
                            <div className="col-sm-6">Name:</div>
                            <div className="col-sm-6">{props.store.clickedLabelProgress[0].receiver[0].name}</div>
                        </div>
                        <div className="col-sm-12 row">
                            <div className="col-sm-6">Address:</div>
                            <div className="col-sm-6">{props.store.clickedLabelProgress[0].receiver[0].address}</div>
                        </div>
                        {/*<div className="col-sm-12 row">
                            <div className="col-sm-6">GS Number:</div>
                            <div className="col-sm-6">{props.store.clickedLabelProgress[0].sender[0].gs_number}</div>
                        </div>*/}
                        <div className="col-sm-12 row">
                            <div className="col-sm-6">State:</div>
                            <div className="col-sm-6">{props.store.clickedLabelProgress[0].receiver[0].state}</div>
                        </div>
                        <div className="col-sm-12 row">
                            <div className="col-sm-6">Country:</div>
                            <div className="col-sm-6">{props.store.clickedLabelProgress[0].receiver[0].country}</div>
                        </div>
                    </div>


                </div>
            )
        }

        return(
            <div>

                {/*Client Details*/}
                <div className="client-details-section">
                    <h2>Clients Details</h2>
                    {clients}
                </div>
                <hr/>
                {/*Progress Bar Container*/}
                <div>
                    <h2>{props.headerUpdate}</h2>
                    <small>{props.headerDesc}</small>
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                             style={{width:`${props.store.clickedLabel.progress_bar}%`,minHeight:"30px"}}/>
                    </div>
                </div>

                {/*Progress Container*/}
                <div className="progress-container mt-4">
                    <div className="mb-2 bg-secondary text-light">Shipment Progress</div>
                    <ShipmentProgress
                        progress={props.store.clickedLabelProgress}
                        addProgressClick={props.addProgressClick}
                        isShowAddProgress={props.store.isShowAddProgress}
                        progressRange={props.store.progressRange}
                        inputHandler={props.inputHandler}
                        subject={props.store.progressSubject}
                        description={props.store.progressDescription}
                        location={props.store.progressLocation}
                        labelId={props.store.clickedLabel.id}
                        addProgress={props.addProgress}
                        trackingNumber={props.store.clickedLabel.tracking_number}
                    />
                </div>

            </div>
        )
}

LabelView.defaultProps={
    headerUpdate: 'Shipment Processed',
    headerDesc: 'Your order is ready to be shipped',
}

LabelView.propTypes = {
    headerUpdate : PropTypes.string,
    headerDesc : PropTypes.string,
    trackingNumber : PropTypes.string,
}

const MapState = state =>{
    return {
        store : state.ShipmentManagement
    }
}

const MapDispatch = dispatch =>{
    return {
        fetchShipmentProgress : trackingNumber => dispatch(Actions.FetchShipmentProgress(trackingNumber)),
        addProgressClick : () => dispatch(Actions.AddProgressClickHandler()),
        inputHandler : (name,e,component) => dispatch(InputHandler(name,e,component)),
        addProgress : (e,data) => {
            e.preventDefault();
            dispatch(AddProgressHandler(data))
        }
    }
}

export default connect(MapState,MapDispatch)(LabelView);
