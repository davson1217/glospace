import React,{useEffect} from 'react';
import TrackingCreate from "./Reusable/ShipmentManagement/TrackingCreate";
import Labels from "./Reusable/ShipmentManagement/Labels";
import PropTypes from 'prop-types'
import Modal from "./Modal/Modal";
import LabelView from "./Reusable/ShipmentManagement/LabelView";

const CreateShipmentTab = props =>{
    useEffect(()=>{
        props.fetchShipments();
    },[]);

    //shipment labels to show on document mount
    let labels ;
    if (Object.keys(props.shipments).length){
        labels = props.shipments.map((item,index)=>{
            return <Labels key={index} onLabelClick={props.labelClick} label={item}/>
        })
    }else if (props.shipments.length === 0) labels = <h5>Loading</h5>

    //Modal to show shipment details on label click
    let viewShipment = props.isShowModal ?
            <Modal title={props.GSNumber || "Tracking Number"} closeModal={()=>props.labelClick()} modalWidth={"70%"}>
                <LabelView/>
            </Modal>: null

    return(
            <div>
                   <TrackingCreate/>
                   <div className="mt-3">
                       <small className="text-primary"><u>Recent Labels</u></small>
                       {labels}
                   </div>
                    {viewShipment}
                </div>
         )
}

CreateShipmentTab.propTypes ={
    labelClick: PropTypes.func,
    fetchShipments: PropTypes.func,
    isShowModal:PropTypes.bool,
    GSNumber:PropTypes.string,

    shipments: PropTypes.array,
}

export default CreateShipmentTab;
