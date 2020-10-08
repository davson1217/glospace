import React from 'react';
import {InputHandler} from "../../../Redux/Actions/AdminActions";
import {connect} from "react-redux";
import {CreateInvoice} from "../../../Redux/Actions/ShipmentActions";

const InvoiceForm = props =>{
    let data = {
        tracking_number: props.store.labelToInvoice,
        currency: props.store.currency,
        amount: props.store.amount,
        invoiceNote: props.store.invoiceNote,
        checkAlert: props.store.checkAlert,
        user_gs: props.store.hoveredLabelOwner,
    }
    let invoiceSubmitBtn = props.feedback.isSentAPI && props.feedback.requestingComp === "CREATE_INVOICE" ?
        <button disabled><span className="spinner-grow text-warning"/></button>:
        <button type={"submit"} disabled={!props.store.currency || !props.store.amount}>
            Create Invoice
        </button>
    return (
        <div>
            <h6 className="text-center">Create Invoice</h6>
            <form className={"text-center p-2"} onSubmit={e=>props.createInvoice(e,data)}>
                <select name="currency" value={props.store.currency} onChange={e=>props.inputHandler("currency",e,"Shipment")}>
                    <option value="GEL">ლ</option>
                    <option value="NGN">₦</option>
                    <option value="USD">$</option>
                </select>
                <input type="text" placeholder={"Amount"} value={props.store.amount} onChange={e=>props.inputHandler("amount",e,"Shipment")}/>
                <div className="text-center mt-1">
                    <textarea placeholder={"Additional note"} style={{width:"100%"}}
                              onChange={e=>props.inputHandler("invoiceNote",e,"Shipment")} value={props.store.invoiceNote}/>
                </div>
                <label htmlFor="send_mail">
                    <b>Alert client</b>
                    <input type="checkbox" checked={true} disabled={true}/>
                </label>
                <div>
                    {invoiceSubmitBtn}
                </div>
            </form>
        </div>
    )
}

const MapState = state =>{
    return {
        store : state.ShipmentManagement,
        feedback : state.Feedback,
    }
}

const MapDispatch = dispatch =>{
    return {
        inputHandler : (name,e,comp) => dispatch(InputHandler(name,e,comp)),
        createInvoice: (e,data) =>{
            e.preventDefault();
            dispatch(CreateInvoice(data))
        }
    }
}

export default connect(MapState,MapDispatch)(InvoiceForm);
