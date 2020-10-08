import React from 'react';
import InvoiceForm from "./InvoiceForm";
import PropTypes from 'prop-types';
import InvoiceView from "./InvoiceView";

const InvoiceBubble = props =>{
    let bubbleType = null;
    if (props.isShowInvoiceBubble && props.clickedLabelNumber === props.activeLabelNumber){
            if (props.bubbleType === "CREATE_INVOICE"){
                bubbleType = <div className="speech-bubble"><InvoiceForm/></div>;
            }else if (props.bubbleType === "VIEW_INVOICE"){
                bubbleType = <div className="speech-bubble">
                    <InvoiceView trackingNumber={props.clickedLabelNumber} invoiceId={null} fromCreate={props.fromCreate}/>
                </div>
            }else bubbleType = <h6 className="speech-bubble">NULL</h6>
    }
    return bubbleType
}


InvoiceBubble.propTypes={
    clickedLabelNumber: PropTypes.string,
    activeLabelNumber: PropTypes.string,
    isShowInvoiceBubble: PropTypes.bool,
    bubbleType: PropTypes.string,
    fromCreate: PropTypes.bool,
}

export default InvoiceBubble;
