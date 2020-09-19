import React from 'react';
import {connect} from "react-redux";
import {InputHandler} from "../../../Redux/Actions/AdminActions";
import {CreateTracking, GenerateTrackingNum} from "../../../Redux/Actions/ShipmentActions";
import './style.css';
const TrackingCreate = props =>{
    const fd = new FormData();
    fd.append("GSNumber",props.store.gsNumb);
    fd.append("estDelivery",props.store.delivDate);
    fd.append("deliveryNote",props.store.delivNote);
    fd.append("subject",props.store.shipActivity);
    fd.append("location",props.store.currentLocation);
    fd.append("trackingNum",props.store.trackingNum);
    return (
        <form onSubmit={(e)=>props.createTracking(e,fd)}>
            <div className="row">

                <div className="col-sm-12 d-flex flex-column mt-4">
                    <label htmlFor="gs-number">GS Number</label>
                    <input type="text" name="gs-number" placeholder={'User GS number'}
                           onChange={(e)=>props.inputHandler("gsNumb",e,"Tracking")} value={props.store.gsNumb} className="tracking-input"/>
                </div>

                <div className="col-sm-12 d-flex flex-column mt-3">
                    <label htmlFor="ship-dest">Shipment Destination</label>
                    <div className="row">
                        <div className="col"><input type="text" name="ship-dest" placeholder={'Country'} style={{width:"100%"}}
                            onChange={(e)=>props.inputHandler("destCountry",e,"Tracking")}  value={props.store.destCountry} disabled={true}
                         className="tracking-input"/></div>
                        <div className="col"><input type="text" name="ship-dest" placeholder={'City'} style={{width:"100%"}}
                            onChange={(e)=>props.inputHandler("destCity",e,"Tracking")}  value={props.store.destCity} disabled={true}
                         className="tracking-input"/></div>
                        <div className="col"><input type="text" name="ship-dest" placeholder={'Address'} style={{width:"100%"}}
                            onChange={(e)=>props.inputHandler("destAddress",e,"Tracking")} value={props.store.destAddress} disabled={true}
                         className="tracking-input"/></div>
                    </div>
                </div>

                <div className="col-sm-12 d-flex flex-column mt-3">
                    <label htmlFor="delivery">Estimated Delivery</label>
                    <div className="row">
                        <div className="col">
                            <input type="date" name="del-date" placeholder={'Delivery Date'} style={{width:"100%"}}
                                onChange={(e)=>props.inputHandler("delivDate",e,"Tracking")} value={props.store.delivDate}
                               className="tracking-input"/>
                        </div>
                        <div className="col">
                            <input type="text" name="del-note" placeholder={'Delivery Note (optional)'} style={{width:"100%"}}
                                onChange={(e)=>props.inputHandler("delivNote",e,"Tracking")} value={props.store.delivNote}
                               className="tracking-input"/>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 d-flex flex-column mt-3">
                    <label htmlFor="ship-act">Shipment Activity</label>
                    <input type="text" name="ship-act" placeholder={'Activity'}
                        onChange={(e)=>props.inputHandler("shipActivity",e,"Tracking")} value={props.store.shipActivity}
                       className="tracking-input"/>
                </div>

                <div className="col-sm-12 d-flex flex-column  mt-3">
                    <label htmlFor="ship-location">Shipment Location</label>
                    <input type="text" name="ship-location" placeholder={'Location'}
                        onChange={(e)=>props.inputHandler("currentLocation",e,"Tracking")} value={props.store.currentLocation}
                       className="tracking-input"/>
                </div>

                <div className="col-sm-12 d-flex flex-column mt-3">
                    <label htmlFor="ship-act">Tracking Number</label>
                    <div className="row">
                        <div className="col-sm-10">
                            <input type="text" name="tracking-number" placeholder={'Tracking Number'} style={{width:"100%"}}
                                onChange={(e)=>props.inputHandler("trackingNum",e,"Tracking")} value={props.store.trackingNum} disabled={true}
                               className="tracking-input"/>
                        </div>
                        <div className="col-sm-2">
                            <button type="button" onClick={()=>props.generateTrackingNum()}>Generate Number</button>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 mt-3">
                    <input type="submit" name="create-shipment" value="Create Shipment" className="btn btn-dark"/>
                </div>

            </div>
        </form>
    )
}

const MapState = state =>{
    return{
        store : state.ShipmentManagement,
    }
}

const MapDispatch = dispatch =>{
    return{
        inputHandler : (name,event,component) => dispatch(InputHandler(name,event,component)),
        generateTrackingNum : () => dispatch(GenerateTrackingNum()),
        createTracking : (e,data) => {
            e.preventDefault();
            dispatch(CreateTracking(data))
        },
    }
}

export default connect(MapState,MapDispatch)(TrackingCreate);
