import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import * as ActionTypes from "../../../Redux/Actions/ActionTypes";
import {FetchShipments, InvoiceBubble} from "../../../Redux/Actions/ShipmentActions";
import moment from "moment";

const InvoiceView = props =>{

    useEffect(()=>{
        props.fetchInvoice(props.trackingNumber);
        // console.log(props.fetchedInvoice)
    },[])

    //determine which component makes function calls
    let actionComponent = props.fromCreate ? "Create" : "Manage";

    let invoice = <h6>Loading ...</h6>
    let cost = props.store.fetchedInvoice.cost ? props.store.fetchedInvoice.cost : <small>calculating..</small>;
    let payButton = props.store.fetchedInvoice.is_paid === 1 ?
        (
            <button className="btn btn-dark text-light" onClick={()=>props.invoicePaid(props.store.fetchedInvoice.id,actionComponent)}>
                Not Paid
            </button>
        ):
        (
            <button hidden={true} className="btn btn-dark text-light" onClick={()=>props.invoicePaid(props.store.fetchedInvoice.id,actionComponent)}>
                Is Paid
            </button>
        )
    if (props.store.fetchedInvoice){
        invoice = (
            <div className="p-3">
                <div className="invoice-details">

                    <div className="text-light">Amount:
                        <b className="text-dark ml-3">
                         {props.store.fetchedInvoice.currency === "NGN" ? "₦" : props.store.fetchedInvoice.currency === "GEL"? "ლ" : "$"}{cost}
                        </b>
                    </div>

                    <div className="text-light">invoice: <b className="text-dark ml-3">{props.store.fetchedInvoice.invoice_number}</b></div>
                    <div className="text-light">
                        Created : <b className="text-dark ml-3">{moment(props.store.fetchedInvoice.created_at).format("MMM Do YY")}</b>
                    </div>
                    <div className="text-light">
                        Note : <small className="text-dark"><b>{props.store.fetchedInvoice.description}</b></small>
                    </div>
                </div>

                <div className="text-center p-3">
                    <button className="btn btn-dark text-light" onClick={()=>props.deleteInvoice(props.store.fetchedInvoice.id,actionComponent)}>
                        Delete
                    </button>
                    {payButton}
                </div>

            </div>
        )
    }
    return invoice;
}

InvoiceView.propTypes = {
    fetchInvoice: PropTypes.func,
    trackingNumber: PropTypes.string,
    fromCreate: PropTypes.bool,
    // invoiceId: PropTypes.number,
}

const MapState = state =>{
    return {
        store: state.ShipmentManagement
    }
}

const MapDispatch = dispatch =>{
    return {
        fetchInvoice: (number) => {
            const headers = {
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem('adminToken')
            };
            axios.get("/api/getInvoice",{headers,params:{number}}).
            then(res=>{
                res.data.success ? dispatch({type:ActionTypes.INVOICE_FETCHED,payload:{invoice:res.data.invoice[0]}}) : alert("UNKNOWN ERROR");
            }).catch(err=>{})
        },

        deleteInvoice: (id,component) => {
            const headers = {
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem('adminToken')
            };
            if (confirm("are you sure?"))
            axios.delete("/api/deleteInvoice",{headers,params:{id}}).
            then(res=>{
                let limit = component === "Create" ? 3 : null;
               if (res.data.success){
                   dispatch(FetchShipments(limit));
                   dispatch(InvoiceBubble(null,""));
               }
            }).catch(err=>{})
        },

        invoicePaid: (id,component) => {
            const headers = {
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization": "Bearer "+ localStorage.getItem("adminToken")
            };
            axios.post("/api/invoicePaid", {id},{headers}).
            then(res=>{
                if (res.data.success){
                    let limit = component === "Create" ? 3 : null;
                    dispatch(FetchShipments(limit));
                    dispatch(InvoiceBubble(null,""));
                }
//                res.data.success ?  : alert("UNKNOWN ERROR");
            }).catch(err=>{})
        }
    }
}

export default connect(MapState,MapDispatch)(InvoiceView);
