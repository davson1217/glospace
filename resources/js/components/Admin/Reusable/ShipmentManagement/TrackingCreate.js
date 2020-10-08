import React from 'react';
import {connect} from "react-redux";
import {InputHandler} from "../../../Redux/Actions/AdminActions";
import {CreateTracking, FetchAccountByGS, GenerateTrackingNum} from "../../../Redux/Actions/ShipmentActions";
import './style.css';
import SenderReceiverDetails from "./SenderReceiverDetails";
const TrackingCreate = props =>{

    let senderGSN = props.store.senderHasGS ? props.store.SenderGSNtoCheck : '';
    let receiverGSN = props.store.receiverHasGS ? props.store.ReceiverGSNtoCheck : '';

    //const fd = new FormData();
    const fd ={
        estDelivery:props.store.delivDate,
        deliveryNote:props.store.delivNote,
        subject:props.store.shipActivity,
        location:props.store.currentLocation,
        trackingNum:props.store.trackingNum,
        packageDesc:props.store.packageDesc,
        packageWeight:props.store.packageWeight,
        progressRange:props.store.progressRange,
        sender:props.store.senderHasGS === "Y" ? props.store.SenderGSNtoCheck : {
            name:props.store.SenderName,
            email:props.store.SenderEmail,
            country:props.store.SenderCountry,
            city:props.store.SenderCity,
            address:props.store.SenderAddress,
            phone:props.store.SenderPhone,
        }
        ,
        receiver:props.store.receiverHasGS === "Y" ? props.store.ReceiverGSNtoCheck : {
            name:props.store.ReceiverName,
            email:props.store.ReceiverEmail,
            country:props.store.ReceiverCountry,
            city:props.store.ReceiverCity,
            address:props.store.ReceiverAddress,
            phone:props.store.ReceiverPhone,
        },
    }

    /*fd.append("estDelivery",props.store.delivDate);
    fd.append("deliveryNote",props.store.delivNote);
    fd.append("subject",props.store.shipActivity);
    fd.append("location",props.store.currentLocation);
    fd.append("trackingNum",props.store.trackingNum);
    fd.append("packageDesc",props.store.packageDesc);
    fd.append("packageWeight",props.store.packageWeight);
    fd.append("progressRange",props.store.progressRange);
    fd.append("senderGSN",senderGSN);
    fd.append("receiverGSN",receiverGSN);*/

    let disableConditions = !props.store.delivDate || !props.store.shipActivity || !props.store.currentLocation ||
        !props.store.trackingNum || !props.store.packageDesc || !props.store.packageWeight || !props.store.progressRange
    /*||  !props.store.senderDetails.name || !props.store.senderDetails.country|| !props.store.senderDetails.city
    ||  !props.store.senderDetails.email || !props.store.senderDetails.address|| !props.store.senderDetails.phone
    ||  !props.store.receiverDetails.name || !props.store.receiverDetails.country|| !props.store.receiverDetails.city
    ||  !props.store.receiverDetails.email || !props.store.receiverDetails.address|| !props.store.receiverDetails.phone;*/

    //!props.store.gsNumb ||
    //create dynamic submit button to respond to api request
    let API_MOMENT = props.feedback.isSentAPI && props.feedback.requestingComp === "CREATE_SHIPMENT";
    let submitBtn = API_MOMENT?
        <button type="button" disabled={true}>Creating...<span className="spinner-border spinner-border-sm text-warning" style={{fontSize:"15px"}}/></button>:
        <input type="submit" disabled={disableConditions} name="create-shipment" value="Create Shipment" className="btn btn-dark"/>

        // submitBtn = <input type="submit" disabled={disableConditions} name="create-shipment" value="Create Shipment" className="btn btn-dark"/>;


    return (
        <form onSubmit={(e)=>props.createTracking(e,fd)} className="mt-3">
            <div className="row">

                {/*New Information*/}

                <div className="col-sm-12">
                    <b>Sender Information</b><br/>
                    <label htmlFor="">User has GS Number
                        <select value={props.store.senderHasGS} onChange={(e)=>props.inputHandler('senderHasGS',e,'Tracking')}>
                            <option value="">select</option>
                            <option value="Y">YES</option>
                            <option value="N">NO</option>
                        </select>
                    </label>
                    {!props.store.senderHasGS? null :
                        <SenderReceiverDetails
                            category={'Sender'}
                            hasGS={props.store.senderHasGS}
                            checkGSNumber={props.checkGSNumber}
                            GSNtoCheck={props.store.SenderGSNtoCheck}
                            inputChange={props.inputHandler}
                            user={props.store.senderDetails}
                            country={props.store.SenderCountry}
                            city={props.store.SenderCity}
                            name={props.store.SenderName}
                            address={props.store.SenderAddress}
                            phone={props.store.SenderPhone}
                            email={props.store.SenderEmail}
                        />
                    }
                </div>

                <hr/>

                <div className="col-sm-12">
                    <b>Receiver Information</b><br/>
                    <label htmlFor="hasGS">User has GS Number
                        <select value={props.store.receiverHasGS} onChange={(e)=>props.inputHandler('receiverHasGS',e,'Tracking')}>
                            <option value="">select</option>
                            <option value="Y">YES</option>
                            <option value="N">NO</option>
                        </select>
                    </label>
                    {!props.store.receiverHasGS? null :
                        <SenderReceiverDetails
                            category={'Receiver'}
                            hasGS={props.store.receiverHasGS}
                            checkGSNumber={props.checkGSNumber}//function
                            GSNtoCheck={props.store.ReceiverGSNtoCheck}
                            inputChange={props.inputHandler}
                            user={props.store.receiverDetails}
                            country={props.store.ReceiverCountry}
                            city={props.store.ReceiverCity}
                            name={props.store.ReceiverName}
                            address={props.store.ReceiverAddress}
                            phone={props.store.ReceiverPhone}
                            email={props.store.ReceiverEmail}
                        />
                    }
                </div>

                {/*
                <div className="col-sm-12 d-flex flex-column mt-4">
                    <label htmlFor="gs-number"><b>GS Number</b></label>
                    <input type="text" name="gs-number" placeholder={''}
                           onChange={(e)=>props.inputHandler("gsNumb",e,"Tracking")}
                           value={props.store.gsNumb} className="tracking-input"
                           disabled={API_MOMENT}
                    />
                </div>

                <div className="col-sm-12 d-flex flex-column mt-3">
                    <label htmlFor="ship-dest"><b>Shipment Destination</b></label>
                    <div className="row">
                        <div className="col">
                            <input type="text" name="ship-dest" placeholder={'country'} style={{width:"100%"}}
                            onChange={(e)=>props.inputHandler("destCountry",e,"Tracking")}  value={props.store.destCountry} disabled={true}
                            className="tracking-input"/>
                        </div>
                        <div className="col"><input type="text" name="ship-dest" placeholder={'city'} style={{width:"100%"}}
                            onChange={(e)=>props.inputHandler("destCity",e,"Tracking")}  value={props.store.destCity} disabled={true}
                         className="tracking-input"/></div>
                        <div className="col"><input type="text" name="ship-dest" placeholder={'town/district'} style={{width:"100%"}}
                            onChange={(e)=>props.inputHandler("destAddress",e,"Tracking")} value={props.store.destAddress} disabled={true}
                         className="tracking-input"/></div>
                    </div>
                </div>*/}

                <div className="col-sm-12 d-flex flex-column mt-3">
                    <label htmlFor="delivery"><b>Estimated Delivery</b></label>
                    <div className="row">
                        <div className="col">
                            <input type="date" name="del-date" placeholder={''} style={{width:"100%"}}
                                onChange={(e)=>props.inputHandler("delivDate",e,"Tracking")} value={props.store.delivDate}
                               className="tracking-input" disabled={API_MOMENT}/>
                        </div>
                        <div className="col">
                            <input type="text" name="del-note" placeholder={'Delivery Note (optional)'} style={{width:"100%"}}
                                onChange={(e)=>props.inputHandler("delivNote",e,"Tracking")} value={props.store.delivNote}
                               className="tracking-input" disabled={API_MOMENT}/>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 d-flex flex-column mt-3">
                    <label htmlFor="ship-act"><b>Package Description</b></label>
                    <input type="text" name="ship-desc" placeholder={''}
                        onChange={(e)=>props.inputHandler("packageDesc",e,"Tracking")} value={props.store.packageDesc}
                       className="tracking-input" disabled={API_MOMENT}/>
                </div>

                <div className="col-sm-12 d-flex flex-column mt-3">
                    <label htmlFor="packageWeight"><b>Package Weight</b></label>
                    <input type="text" name="packageWeight" placeholder={''}
                        onChange={(e)=>props.inputHandler("packageWeight",e,"Tracking")} value={props.store.packageWeight}
                       className="tracking-input" disabled={API_MOMENT}/>
                </div>

                <div className="col-sm-12 d-flex flex-column mt-3">
                    <label htmlFor="ship-act"><b>Shipment Activity</b></label>
                    <input type="text" name="ship-act" placeholder={''}
                        onChange={(e)=>props.inputHandler("shipActivity",e,"Tracking")} value={props.store.shipActivity}
                       className="tracking-input" disabled={API_MOMENT}/>
                </div>

                <div className="col-sm-12 d-flex flex-column  mt-3">
                    <label htmlFor="ship-location"><b>Shipment Location</b></label>
                    <input type="text" name="ship-location" placeholder={''}
                        onChange={(e)=>props.inputHandler("currentLocation",e,"Tracking")} value={props.store.currentLocation}
                       className="tracking-input" disabled={API_MOMENT}/>
                </div>

                <div className="col-sm-12 d-flex flex-column mt-3">
                    <div className="row">
                        <div className="col-sm-8">
                            <label htmlFor="progress"><b>Shipment Progress</b></label>
                            <input type="range" name="progress"
                                   onChange={(e)=>props.inputHandler("progressRange",e,"Tracking")} min={0} max={100} step={10} value={props.store.progressRange}
                                   className="tracking-input custom-range" disabled={API_MOMENT}/>
                        </div>
                        <div className="col-sm-4">
                            <div className="custom-control custom-switch">
                                <input type="checkbox" className="custom-control-input" id="switch1" name="example"
                                       onChange={(e)=>props.inputHandler('showBar',e,'Tracking')}/>
                                    <label className="custom-control-label" htmlFor="switch1">Show Bar</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 d-flex flex-column mt-3">
                    <label htmlFor="ship-act"><b>Tracking Number</b></label>
                    <div className="row">
                        <div className="col-sm-10">
                            <input type="text" name="tracking-number" placeholder={''} style={{width:"100%"}}
                                onChange={(e)=>props.inputHandler("trackingNum",e,"Tracking")} value={props.store.trackingNum} disabled={true}
                               className="tracking-input"/>
                        </div>
                        <div className="col-sm-2">
                            <button type="button" disabled={API_MOMENT} onClick={()=>props.generateTrackingNum()}>Generate Number</button>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 mt-3">
                    {submitBtn}
                </div>

            </div>
        </form>
    )
}

const MapState = state =>{
    return{
        store : state.ShipmentManagement,
        feedback: state.Feedback
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
        checkGSNumber : (GSN,category) => dispatch(FetchAccountByGS(GSN,category))
    }
}

export default connect(MapState,MapDispatch)(TrackingCreate);
