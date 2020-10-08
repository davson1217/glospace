import React, {Component} from 'react';
import {connect} from "react-redux";
import * as Actions from "../Redux/Actions/DashboardActions";
import OutstandingInvoices from "./OutstandingInvoices";

class InvoiceMenu extends Component {
    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //console.log(this.props.store.activeMenu)
    }

    render() {

        const styles = {
            outstandingActive:{
                color:this.props.store.activeMenu === "Outstanding" ? "#DD500A" : "black",
                textDecoration:this.props.store.activeMenu === "Outstanding" ? "underline" : null
            },
            paidActive:{
                color:this.props.store.activeMenu === "Paid" ? "#DD500A" : "black",
                textDecoration:this.props.store.activeMenu === "Paid" ? "underline" : null
            }

        }

        let activeMenu = this.props.store.activeMenu === "Outstanding" ?
            <OutstandingInvoices
                invoices={this.props.fetchInvoices}
                invoiceStore={this.props.store}
                receiptUploadHandler={this.props.receiptUploadHandler}
                receiptUpload={this.props.uploadDocument}
            />
            :
            <h3>No Paid</h3>

        return (
            <div className="row">
                <ul className="col-sm-12 invoice-menu-nav">
                    <li onClick={()=>this.props.navigateInvoice("Outstanding")} style={styles.outstandingActive}>
                        <span>Outstanding</span>
                    </li>
                    {/*<li onClick={()=>this.props.navigateInvoice("Paid")} style={styles.paidActive}>*/}
                    {/*    <span>Paid</span>*/}
                    {/*</li>*/}
                </ul>
                <div className="col-sm-12 mt-2">
                    {activeMenu}
                </div>
            </div>
        );
    }
}

const MapState = state =>{
    return {
        store : state.Dashboard.invoiceMenu
    }
}

const MapDispatch = dispatch =>{
    return {
        navigateInvoice : menu => dispatch(Actions.NavigateInvoice(menu)),
        fetchInvoices : category => dispatch(Actions.GetInvoices(category)),
        receiptUploadHandler : (e,activeInvoice) => dispatch(Actions.ReceiptUploadHandler(e,activeInvoice)),
        uploadDocument : (file,inv_num) => {
            if (confirm("Please confirm you are uploading the right file. You won't be able to change it after uploading is done. Click 'Cancel' to abort upload and check the file or 'OK' to proceed with upload."))
            dispatch(Actions.UploadPaymentReceipt(file, inv_num))
        },
    }
}

export default connect(MapState,MapDispatch)(InvoiceMenu);
