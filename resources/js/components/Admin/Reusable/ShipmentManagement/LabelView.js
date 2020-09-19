import React,{useEffect} from 'react';
import ShipmentProgress from "./ShipmentProgress";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {FetchShipmentProgress} from "../../../Redux/Actions/ShipmentActions";

const LabelView = props =>{

    useEffect(()=>{
        props.fetchShipmentProgress(props.store.clickedLabel.tracking_number)
    },[])

        return(
            <div>

                <div>
                    <h2>{props.headerUpdate}</h2>
                    <small>{props.headerDesc}</small>
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" style={{width:"10%"}}> </div>
                    </div>
                </div>

                <div className="progress-container mt-4">
                    <div className="mb-2 bg-secondary text-light">Shipment Progress</div>
                    <ShipmentProgress progress={props.store.clickedLabelProgress}/>
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
        fetchShipmentProgress : trackingNumber => dispatch(FetchShipmentProgress(trackingNumber))
    }
}

export default connect(MapState,MapDispatch)(LabelView);
