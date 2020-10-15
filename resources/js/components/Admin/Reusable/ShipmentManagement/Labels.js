import React from 'react';
import PropTypes from 'prop-types'
import Invoicing from "./InvoiceForm";
import InvoiceBubble from "./InvoiceBubble";

const Labels = props => {
    //determine which component makes function calls
    let actionComponent = props.fromCreate ? "Create" : "Manage";

   let options = props.hoveredLabel === props.label.tracking_number && props.isShowLabelOptions ?
       (
           <div className="row justify-content-between">
               <button onClick={()=>props.onViewClick(props.label)}>View</button>
               <button onClick={()=>props.onDeleteClick(props.label.tracking_number,actionComponent)}>Delete</button>
           </div>
       ) : null;

        /**
         * Create dynamic invoice button with the following options
         * ::VIEW INVOICE
         * ::CREATE INVOICE
         * */
           let invoiceBtn;
           if (props.label.invoice_paid === 1){
               invoiceBtn = <button className="btn text-success"
                                    onClick={()=>props.invoiceBubble(props.label.tracking_number,"VIEW_INVOICE")}>
                               { props.isShowInvoiceBubble&&props.labelToInvoice === props.label.tracking_number ? "close bubble" : "Paid"}
                           </button>
           }else if (props.label.invoice_paid === 0 || props.label.invoice_paid === 2){
               invoiceBtn = <button className="btn text-warning" onClick={()=>props.invoiceBubble(props.label.tracking_number,"VIEW_INVOICE")}>
                               { props.isShowInvoiceBubble&&props.labelToInvoice === props.label.tracking_number ? "close bubble" : "Unpaid"}
                           </button>
           }else invoiceBtn = <button className="btn text-danger" onClick={()=>props.invoiceBubble(props.label.tracking_number,"CREATE_INVOICE")}>
                                { props.isShowInvoiceBubble&&props.labelToInvoice === props.label.tracking_number ? "close bubble" : "Create"}
                           </button>
    /**END of invoice buttons creation
     * */


    /**
     * 'All invoice-related functions must be directed to package sender' - OGEDS
     *
     * Collect shipment sender's GSN for system to send 'invoice-create' email(default)
     * If Sender has no GSN (i.e not registered) collect Receiver's
     * Prop Source:::: ManageShipment.js shipmentLabels map
     * */
        let userGSN;
        if (props.label.sender_user_gs_number){
            userGSN = props.label.sender_user_gs_number;
        }else if(props.label.receiver_user_gs_number){
            userGSN = props.label.receiver_user_gs_number;
        }else userGSN= null;
    /** END of User GSN Collection
     * */

    return (
        <div className="col-sm-12 col-lg-3"
             onMouseEnter={()=>props.mouseOverLabel(props.label.tracking_number,userGSN,"Enter")}
             onMouseLeave={()=>props.mouseOverLabel(null,null,"Exit")}>
            <div className="card bg-dark text-white">
                <div className="card-body">
                    <p>{props.label.package_description} ({props.label.package_weight}kg)</p>
                    <p>{props.label.weight}</p>
                    <p>{props.label.tracking_number}</p>
                    <p>Invoice: {invoiceBtn}</p>
                    {/*{options}*/}
                    <div className="row justify-content-between">
                        <button onClick={()=>props.onViewClick(props.label)}>
                            {props.hoveredLabel === props.label.tracking_number && props.isShowLabelOptions ?
                                <img src={"/img/eye.svg"} alt="view" width={15}/>
                                : null}
                        </button>
                        <button onClick={()=>props.onDeleteClick(props.label.tracking_number,actionComponent)}>
                            {props.hoveredLabel === props.label.tracking_number && props.isShowLabelOptions ?
                                <img src={"/img/trash.svg"} alt="view" width={15}/>
                                : null}
                        </button>
                    </div>
                </div>
            </div>
            <InvoiceBubble
                isShowInvoiceBubble={props.isShowInvoiceBubble}
                activeLabelNumber={props.label.tracking_number}
                clickedLabelNumber={props.labelToInvoice}
                bubbleType={props.bubbleType}
                fromCreate={props.fromCreate}
            />
            {/*props.isShowInvoiceBubble && props.labelToInvoice === props.label.tracking_number?<Invoicing/>:null*/}
        </div>
    )
}

Labels.propTypes = {

    onViewClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    mouseOverLabel: PropTypes.func,
    invoiceBubble: PropTypes.func,

    hoveredLabel: PropTypes.string,
    labelToInvoice: PropTypes.string,
    bubbleType: PropTypes.string,
    isShowLabelOptions: PropTypes.bool,
    isShowInvoiceBubble: PropTypes.bool,
    label: PropTypes.object,
    fromCreate: PropTypes.bool,
}

export default Labels;
