import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import InvoiceCard from "./InvoiceCard";

const OutstandingInvoices = props =>{

    useEffect(()=>{
         props.invoices("Unpaid")

    },[])

    let invoiceList ;
    if (Object.keys(props.invoiceStore.invoices).length){
        invoiceList = props.invoiceStore.invoices.map((item,index)=>{
            //console.log(item)
            return (
                <div key={index} className="mt-3 col-sm-6 col-lg-3">
                    <InvoiceCard
                        invoice={item}
                        receiptUploadHandler={props.receiptUploadHandler}
                        store={props.invoiceStore}
                        receiptUpload={props.receiptUpload}
                    />
                </div>
            )
        })
    } else invoiceList = <div className="text-center col-sm-12"><b>You have no outstanding invoice</b></div>


    return (
        <div className={"row mt-2"}>
            {invoiceList}
        </div>
    )
}

OutstandingInvoices.propTypes ={
    invoices : PropTypes.func,
    receiptUploadHandler : PropTypes.func,
    receiptUpload : PropTypes.func,
    invoiceStore: PropTypes.object,
}

export default OutstandingInvoices;
/*

{item.invoice_number}
                    <label className="text-primary ml-3" id={"receipt"}>
                        upload payment
                        <input type="file"
                               hidden={true}
                               id={"receipt"}
                               onChange={e=>props.receiptUploadHandler(e)}
                        />
                    </label>
                    {props.invoiceStore.receipt ?
                    <button onClick={()=>props.receiptUpload(props.invoiceStore.receipt,item.invoice_number)}>
                        upload
                    </button> : null}

* */
