import React from 'react';
import PropTypes from 'prop-types';

export const AccountInfo = props =>{
    let verifiedBtn = props.account.is_verified ?
        <button className="btn btn-secondary" onClick={()=>props.verifiedStatus(props.account.id,props.account.is_verified)}>Mark not verified</button>
        :
        <button className="btn btn-secondary" onClick={()=>props.verifiedStatus(props.account.id,props.account.is_verified)}>Mark Verified </button>
    return(
        <div className="col-sm-12 ml-3">
            <ul>
                <li className="row">
                    <span className="col-sm-4">ID</span>
                    <span className="col-sm-6">{props.account.personalNumber}</span>
                </li>
                <li className="row">
                    <span className="col-sm-4">Email</span>
                    <span className="col-sm-6">{props.account.email}</span>
                </li>
                <li className="row">
                    <span className="col-sm-4">Address</span>
                    <span className="col-sm-6">{props.account.address}</span>
                </li>
                <li className="row">
                    <span className="col-sm-4">City</span>
                    <span className="col-sm-6">{props.account.city}</span>
                </li>
                <li className="row">
                    <span className="col-sm-4">Country</span>
                    <span className="col-sm-6">{props.account.country}</span>
                </li>
                <li className="row">
                    <span className="col-sm-4">Status</span>
                    <span className="col-sm-6">
                        {props.account.is_verified? <span>Verified</span> : <span>Not</span>}
                    </span>
                </li>
                <li className="row">
                    <span className="col-sm-4">Phone</span>
                    <span className="col-sm-6">
                        {props.account.phone}
                    </span>
                </li>
            </ul>
            <div className="text-center">
                {verifiedBtn}
            </div>
        </div>
    )
}

AccountInfo.propTypes = {
    account : PropTypes.object,
    verifiedStatus : PropTypes.func,
}

export default AccountInfo;
