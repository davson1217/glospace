import React,{useEffect} from 'react'
import {connect} from "react-redux";
import {ToggleViewAccount} from "../../../Redux/Actions/AccountActions";
import AccountInfo from "./AccountInfo";
import PropTypes from 'prop-types';


const AllAccounts = props =>{

    const styles ={
        listItem:{
            cursor:'pointer',
        }
    }

    return (
        <li className="row" >
            <div className="col-sm-12 mt-3 row" onClick={()=>props.toggleViewAccount(props.accountId,props.account.accounts)} style={ styles.listItem}>
                <div className="col-sm-4">{props.GSNumber}</div>
                <div className="col-sm-4">{props.name}</div>
                <div className="col-sm-2">
                    {props.is_verified? <span className="text-success">Verified</span>
                        :
                        <span className="text-danger">Not Verified</span>}
                </div>
            </div>
            <div className="col-sm-12 mt-1">
                {props.account.isShowAccountDetails && props.account.accountToView.id === props.accountId
                    ?<AccountInfo
                        account={props.account.accountToView}
                        verifiedStatus={props.verifiedStatus}
                    />
                    : null}
            </div>
            <hr/>
        </li>
    )
}

const MapState = state => {
    return {
        account : state.AccountManagement
    }
}


const MapDispatch = dispatch =>{
    return {
        toggleViewAccount : (id,accounts) => {dispatch(ToggleViewAccount(id,accounts))}
    }
}

AllAccounts.propTypes = {
    accountId : PropTypes.number,
    name : PropTypes.string,
    GSNumber : PropTypes.string,
    is_verified : PropTypes.number,
    verifiedStatus : PropTypes.func,
}

export default connect(MapState,MapDispatch)(AllAccounts)
