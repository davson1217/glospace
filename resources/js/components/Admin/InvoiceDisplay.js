import React, {useEffect} from 'react'
import {Table} from "reactstrap";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import axios from "axios";
import moment from "moment";
import './Styles/Invoice.css'

const InvoiceTable = (props) => {

    useEffect(()=>{
        props.invoiceDetails(props.match.params.invoice_number)
    },[])

    let invoice = <h4>Loading ...</h4>

    if (Object.keys(props.invoice).length){
        invoice = (
            <div className="container">

                <div className="row">

                    <div className="col-sm-3">
                        <div>
                            <img src={"/img/GS.png"} alt="logo" width={100}/>
                        </div>
                    </div>

                    <div className="col-sm-9 invoice-header-info">
                        <div className="text-right">
                            <span className="invoice-header-desc">Date:</span> <span><b>{moment(props.invoice[0].invoice_date).format('MMM Do YYYY')}</b></span><br/>
                            <span className="invoice-header-desc">Weight:</span> <span><b>{props.invoice[0].package_weight}kg</b></span><br/>
                            <span className="invoice-header-desc">Invoice:</span> <span><b>{props.invoice[0].invoice_number}</b></span><br/>
                            <span className="invoice-header-desc">Tracking:</span> <span><b>{props.invoice[0].tracking_number}</b></span><br/>
                        </div>
                    </div>

                    <div className="col-sm-12 pt-5">
                        <div className="row">
                            <div className="col-sm-4 invoice-clients mt-1">
                                <h6 className='clients-headers'>Sender</h6>
                                {props.invoice[0].sender[0].name}<br/>
                                {props.invoice[0].sender[0].address}<br/>
                                {props.invoice[0].sender[0].state}, {props.invoice[0].sender[0].country}<br/>
                                {props.invoice[0].sender[0].gs_number?props.invoice[0].sender[0].gs_number: <small><b>No GSN</b></small>}
                            </div>
                            <div className="col-sm-4 invoice-clients mt-1">
                                <h6 className='clients-headers'>Receiver</h6>
                                {props.invoice[0].receiver[0].name}<br/>
                                {props.invoice[0].receiver[0].address}<br/>
                                {props.invoice[0].receiver[0].state}, {props.invoice[0].receiver[0].country}<br/>
                                {props.invoice[0].receiver[0].gs_number?props.invoice[0].receiver[0].gs_number: <small><b>No GSN</b></small>}
                            </div>
                            <div className="col-sm-4 invoice-clients mt-1">
                                <h6 className='clients-headers'>Glospace Logistics LLC</h6>
                                Merab Kostava 26 Floor 5, Flat 14<br/>
                                Customer Support: +995 591 880 567<br/>
                                sales@glospacelogistics.com<br/>
                                www.glospacelogistics.com.
                            </div>
                        </div>
                    </div>

                </div>


                <Table className={"mt-3"}>
                    <thead>
                    <tr>
                        <th className='invoice-table-headers'>Description</th>
                        <th className='invoice-table-headers'>Amount</th>
                        <th className='invoice-table-headers'>VAT</th>
                        <th className='invoice-table-headers'>Sum</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td scope="row" className='invoice-table-data'>Transportation of {props.invoice[0].package_description}</td>
                        <td className='invoice-table-data'>{props.invoice[0].currency + " " +props.invoice[0].cost}.00</td>
                        <td className='invoice-table-data'>{props.invoice[0].currency} 0.00</td>
                        <td className='invoice-table-data'>{props.invoice[0].currency + " " +props.invoice[0].cost}.00</td>
                    </tr>
                    </tbody>
                </Table>

                    <div className="invoice-info">
                        <i>{props.invoice[0].description}</i>
                    </div>

                </div>
        )
    }

    return invoice
}

InvoiceTable.propTypes ={
    //invoiceDetails : PropTypes.number
}

const MapState = state =>{
    return {
        invoice : state.Admin.payment.invoiceToView
    }
}

const MapDispatch = dispatch =>{
    return {
        invoiceDetails : (number) => {
            let token = localStorage.getItem('token') ? localStorage.getItem('token') : localStorage.getItem('adminToken')
            axios.get('/api/invoiceDetails',{headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                    "Authorization":"Bearer "+ token
                },params:{number}}).
            then(res=>{
                if (res.data.success){
                    dispatch({
                        type:"INVOICE_DETAILS",
                        payload:{invoiceDetails:res.data.details}
                    })
                }
            }).
            catch(err=>{})
        }
    }

}

export default connect(MapState,MapDispatch)(InvoiceTable);
