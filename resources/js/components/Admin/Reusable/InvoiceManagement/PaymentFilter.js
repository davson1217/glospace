import React from 'react';
import {connect} from "react-redux";
import * as Actions from '../../../Redux/Actions/FilterActions'
const PaymentFilter = props =>{
    return (
        <div>
            <form>
                <label className="radio-inline mr-2">
                    <input type="radio" name="optradio" checked={props.payment.confirmed} onChange={e=>props.filterHandler("confirmed")}/>Confirmed
                </label>
                <label className="radio-inline mr-2">
                    <input type="radio" name="optradio" checked={props.payment.unconfirmed} onChange={e=>props.filterHandler("unconfirmed")}/>Unconfirmed
                </label>
                <label className="radio-inline mr-2">
                    <input type="radio" name="optradio" checked={props.payment.rejected} onChange={e=>props.filterHandler("rejected")}/>Rejected
                </label>
            </form>
        </div>
    )
}

const MapState = state =>{
    return{
        payment: state.Filter.Payment
    }
}

const MapDispatch = dispatch =>{
    return {
        filterHandler: (name)=>dispatch(Actions.PaymentFilterHandler(name))
    }
}

export default connect(MapState,MapDispatch)(PaymentFilter);
