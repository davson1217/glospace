import React, {useEffect} from 'react';
import {connect} from "react-redux";
import * as Actions from "../Redux/Actions/AdminActions";
import PaymentCard from "./Reusable/InvoiceManagement/InvoicePaymentCard";
import Modal from "./Modal/Modal";
import PaymentRejection from "./Reusable/InvoiceManagement/PaymentRejection";
import Filter from "./Reusable/Filter";
import PaymentFilter from "./Reusable/InvoiceManagement/PaymentFilter";

const Payments = props =>{
    useEffect(()=>{
        props.paymentUploads()
    },[])

    let paymentUpload;

    if (Object.keys(props.store.payment.paymentUploads).length){

        paymentUpload = props.store.payment.paymentUploads.map((item,index)=>{
            return (
                <div className="col-sm-12 col-lg-3" key={index}>
                        <PaymentCard
                            file={item.payment_document}
                            payment={item}
                            confirmClick={props.confirmClick}
                            rejectClick={props.rejectClick}
                            filter = {props.store.payment.filter}
                            feedback={props.feedback}
                        />
                </div>
            )
        })
    }else paymentUpload = <h4>No Uploads</h4>

    return (
        <div>
            <Filter filterHandler={props.paymentUploads} radioNames={["unconfirmed", "confirmed", "rejected"]}/>
            {/*<PaymentFilter/>*/}
                <hr/>
            <div className="row mt-4">
                {paymentUpload}
            </div>

            {props.store.isShowModal ?
                <Modal title={"Rejection Message"} modalHeight={"200px"} closeModal={()=>props.rejectClick(null)}>
                    <PaymentRejection
                        invoiceNumber={props.store.payment.rejectedInvoice}
                        rejectionSubmit={props.rejectionSubmit}
                        inputHandler={props.inputHandler}
                        rejectionMessage={props.store.rejectionMessage}
                        feedback={props.feedback}
                    />
                </Modal>
                :
                null
            }
        </div>
    )
}

const MapState = state =>{
    return {
        store: state.Admin,
        feedback: state.Feedback,
    }
}

const MapDispatch = dispatch =>{
    return {
        paymentUploads : (filter) => {
            filter ? dispatch({type:"CURRENT_FILTER",payload:{filter}}) : null;
            dispatch(Actions.ClientPaymentUploads(filter))
        },
        confirmClick : (invoiceNumber) => dispatch(Actions.PaymentConfirmed(invoiceNumber)),
        rejectClick : (invoice) => dispatch({type:"REJECT_PAYMENT_CLICK",payload:{invoice}}),
        inputHandler : (name,e,comp) => dispatch(Actions.InputHandler(name,e,comp)),
        // filer : (filter) => console.log(filter),
        rejectionSubmit : (invoiceNumber,message) => dispatch(Actions.PaymentRejectionSubmit(invoiceNumber,message))
    }
}

export default connect(MapState,MapDispatch)(Payments);
