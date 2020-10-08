import React from 'react';
import '../../Styles/PaymentCard.css';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";

const PaymentCard = props =>{
    let API_MOMENT = props.feedback.isSentAPI && props.feedback.requestingComp === "ADMIN_PAYMENT_CONFIRM";

    let confirmBtn = API_MOMENT ? <button disabled>working...<span className="spinner-border spinner-border-sm"/> </button>:
        <button onClick={()=>props.confirmClick(props.payment.invoice_number)}>Confirm Payment</button>
    let rejectBtn = API_MOMENT ? <button disabled>working...<span className="spinner-border spinner-border-sm"/> </button>:
        <button onClick={()=>props.rejectClick(props.payment.invoice_number)}>Reject Payment</button>
    return (

        <div className="payment-card">
           <span onClick={()=>{ window.open(`/paymentUpload/${props.payment.payment_document}`)}}>
               <img src={`/storage/payments/${props.payment.payment_document}`} alt="Avatar" style={{width:"100%"}}/>
           </span>

            <div className="payment-card-container">

                <button onClick={()=>{window.open(`/invoice/${props.payment.invoice_number}`)}}>
                    View Invoice
                </button>

                {props.filter !== "confirmed" ? confirmBtn : null}

                {props.filter === "rejected" ? null : rejectBtn }

            </div>
        </div>

    )
}

PaymentCard.propTypes = {
    // file:PropTypes.string,
    payment:PropTypes.object,
    feedback:PropTypes.object,
    confirmClick:PropTypes.func,
    rejectClick:PropTypes.func,
}

export default PaymentCard;
