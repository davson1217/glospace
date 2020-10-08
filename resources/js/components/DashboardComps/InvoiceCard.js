import React from 'react';
import PropTypes from 'prop-types'
const InvoiceCard = props =>{

    let uploadBtn ;
    let invoiceDesc = (
        <div>
            <small className="text-secondary">Value:</small>
            <small className="text-secondary ml-1"> {props.invoice.currency+ " "+ props.invoice.cost}.00</small>
        </div>
    );

    if(props.store.receiptPreview && props.invoice.invoice_number === props.store.invoiceToPay){
      invoiceDesc = (
          <div>
              <img src={props.store.receiptPreview} alt="Avatar" style={{width:"100px"}}/>
          </div>
      )
    uploadBtn = <button className={"upload-receipt-btn"} onClick={()=>props.receiptUpload(props.store.receipt,props.invoice.invoice_number)}> Upload Receipt  </button>
    }

    let receiptBtn = !props.invoice.has_upload || props.invoice.is_paid === 2?(
        <button>
            <label id={"receipt"} className="text-center text-light">
                Select Receipt
                <input type="file"
                       hidden={true}
                       id={"receipt"}
                       onChange={e=>props.receiptUploadHandler(e,props.invoice.invoice_number)}
                />
            </label>
        </button>
    ) : (
        <button disabled>Payment pending approval</button>
    )


    return (
        <div className="payment-card">
           <div style={{width:"100%"}} className="text-center">
               {invoiceDesc}
           </div>

            <div className="payment-card-container">

                <button onClick={()=>{window.open(`/invoice/${props.invoice.invoice_number}`)}}>
                    View Invoice
                </button>

                {receiptBtn}

                {uploadBtn}
            </div>
        </div>

    )
}

InvoiceCard.propTypes ={
    store: PropTypes.object,
    invoice: PropTypes.object,
    receiptUploadHandler: PropTypes.func,
    receiptUpload: PropTypes.func,
}

export default InvoiceCard
