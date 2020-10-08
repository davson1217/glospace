import React from  'react'
import PropTypes from 'prop-types';

const PaymentRejection = props =>{
    let API_MOMENT = props.feedback.isSentAPI && props.feedback.requestingComp === "PAYMENT_REJECT";
        let submitBtn = API_MOMENT?
        <button disabled className="btn btn-dark">working... <span className="spinner-border spinner-border-sm"/> </button>:
        <button type="submit" className="btn btn-dark" disabled={!props.rejectionMessage}>Send</button>
    return (
        <div>
            <form onSubmit={e=> {e.preventDefault();props.rejectionSubmit(props.invoiceNumber,props.rejectionMessage)}}>
                <div>
                    <textarea placeholder={"Enter reason(s) for rejecting the payment... "}
                        style={{width:"100%", minHeight:"100px"}}
                        onChange={e=>props.inputHandler("rejectionMessage",e,"Payment")}
                        value={props.rejectionMessage}
                    />
                </div>
                <div className="text-right">
                    {submitBtn}
                </div>
            </form>
        </div>
    )
}

PaymentRejection.propTypes ={
    rejectionSubmit: PropTypes.func,
    inputHandler: PropTypes.func,
    invoiceNumber: PropTypes.number,
    rejectionMessage: PropTypes.string,
    feedback: PropTypes.object,
}

export default PaymentRejection;
