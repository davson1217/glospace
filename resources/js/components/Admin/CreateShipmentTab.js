import React,{useEffect} from 'react';
import TrackingCreate from "./Reusable/ShipmentManagement/TrackingCreate";
import PropTypes from 'prop-types'
import ManageShipments from "./ManageShipments";
import Feedback from "../Redux/Feedback";
import {connect } from 'react-redux'

const CreateShipmentTab = props =>{

    useEffect(()=>{
        // props.fetchShipments(3);
    },[]);

    return(
            <div>
                {/*   Shipment creation form */}

                <TrackingCreate/>

                   <div className="mt-3">
                       <small className="text-primary"><u>Recent Labels</u></small>

                       <div className="p-1 mb-5">
                           <ManageShipments fromCreate={true}/>
                       </div>
                   </div>
                {props.Feedback.showFeedback && props.Feedback.feedbackComponent === "CREATE_SHIPMENT"?
                    <Feedback message={props.Feedback.feedbackMessage}/>
                    : null
                }
                </div>
         )
}

CreateShipmentTab.propTypes ={
    labelClick: PropTypes.func,
    fetchShipments: PropTypes.func,
    labelDeleteClick: PropTypes.func,
    isShowModal:PropTypes.bool,
    GSNumber:PropTypes.string,

    shipments: PropTypes.array,
}


const MapState = state =>{
    return{
        Feedback : state.Feedback
    }
}

const MapDispatch = dispatch =>{
    return {

    }
}
export default connect(MapState,MapDispatch)(CreateShipmentTab);
