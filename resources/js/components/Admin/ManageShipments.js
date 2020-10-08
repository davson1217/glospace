import React,{useEffect} from 'react';
import {connect} from "react-redux";
import {DeleteShipment, FetchShipments, InvoiceBubble} from "../Redux/Actions/ShipmentActions";
import './Styles/ManageShipments.css'
import Labels from "./Reusable/ShipmentManagement/Labels";
import * as Actions from "../Redux/Actions/AdminActions";
import Modal from "./Modal/Modal";
import LabelView from "./Reusable/ShipmentManagement/LabelView";
import * as ActionTypes from "../Redux/Actions/ActionTypes";
import {InputHandler} from "../Redux/Actions/AdminActions";
import PropTypes from 'prop-types'

const ManageShipments = props =>{

    useEffect(()=>{
        props.fromCreate  ?
        props.fetchLabels(3) :
        props.fetchLabels(null)
    },[])

    let labels = <h6>Loading</h6>

    if (Object.keys(props.store.shipmentLabels).length){
        labels = props.store.shipmentLabels.map((item,index)=>{
            // console.log(item)
            return <Labels
                label={item}
                onDeleteClick={props.deleteShipment}
                onViewClick={props.viewShipment} // Toggles Modal
                mouseOverLabel={props.showLabelOptions}
                hoveredLabel={props.store.hoveredLabel}
                // hoveredLabelOwner={props.store.hoveredLabelOwner}
                isShowLabelOptions={props.store.isShowLabelOptions}
                invoiceBubble={props.invoiceBubble}
                isShowInvoiceBubble={props.store.isShowInvoiceBubble}
                labelToInvoice={props.store.labelToInvoice}
                bubbleType={props.store.showBubbleFor}
                fromCreate={props.fromCreate}
                key={index}/>
        })
    }

    //Modal to show shipment details on label click
    let viewShipment = props.store.isShowModal ?
        <Modal title={props.store.clickedLabel.tracking_number || "Tracking Number"} closeModal={()=>props.viewShipment(props.store.clickedLabel)} modalWidth={"70%"}>
            <LabelView/>
        </Modal>: null

    return (
        <div>
            <div className="row mt-2">
                {labels}
            </div>
            {viewShipment}
        </div>
    )
}

ManageShipments.propTypes = {
    fromCreate: PropTypes.bool,
}

const MapState = state =>{
    return {
        store : state.ShipmentManagement
    }
}

const MapDispatch = dispatch => {
    return {
        fetchLabels : (limit) => dispatch(FetchShipments(limit)),
        viewShipment : (value) => dispatch(Actions.ToggleModal(value)),
        showLabelOptions : (labelId,labelOwner,event) => {
            let toggleOptions = event === "Enter";
            dispatch({type: ActionTypes.SHOW_LABEL_OPTIONS, payload: {labelId, labelOwner,toggle:toggleOptions}})
        },
        invoiceBubble : (labelId,bubble) => {dispatch(InvoiceBubble(labelId,bubble))},
        deleteShipment : (shipmentId,comp) => {
            if (confirm("Are you sure ?"))
                dispatch(DeleteShipment(shipmentId,comp))
        },
    }
}

export default connect(MapState,MapDispatch)(ManageShipments);
