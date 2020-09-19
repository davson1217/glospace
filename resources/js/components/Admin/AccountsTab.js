import React,{useEffect} from 'react'
import PropTypes from 'prop-types';
import AllAccounts from "./Reusable/AccountManagement/AllAccounts";
import {connect} from "react-redux";
import * as Actions from "../Redux/Actions/AccountActions";

const AccountsTab = props =>{

    useEffect(()=>{
        props.fetchAccounts()
    },[])

    let accounts = (
        <div className="no-service text-center d-flex justify-content-center align-items-center" style={{height:"70vh", width:"100%"}}>
            <h4>No Accounts registered</h4>
        </div>
    )

    if (Object.keys(props.accounts).length){
        accounts = props.accounts.map((item,index)=>{
            return <AllAccounts
                accountId={item.id}
                GSNumber={item.gs_number}
                name={item.name}
                is_verified={item.is_verified}
                verifiedStatus={props.verifiedStatus}
                key={index}
            />
        })
    }

    return (
        <div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="filter col-sm-12">
                        <form>
                            <div className="row text-center">
                                <div className="col-sm-3">
                                    <div className="row">
                                        <div className="col-sm-12">All</div>
                                        <div className="col-sm-12">
                                            <input type="radio" name={'accountsFilter'} onChange={()=>props.filterAccountsList(2)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="row">
                                        <div className="col-sm-12">Verified</div>
                                        <div className="col-sm-12">
                                            <input type="radio" name={'accountsFilter'} onChange={()=>props.filterAccountsList(1)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="row">
                                        <div className="col-sm-12">Unverified</div>
                                        <div className="col-sm-12">
                                            <input type="radio" name={'accountsFilter'} onChange={()=>props.filterAccountsList(0)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3 mt-2">
                                    <div className="col-sm-12">
                                        <input type="text" name={'accountsFilter'} onChange={()=>props.filterAccountsList(0)}/>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                    {/* Account List */}
                    <ul>
                        {accounts}
                    </ul>
                </div>
            </div>
        </div>
    )
}

AccountsTab.propTypes = {
    fetchAccounts: PropTypes.func,
    accounts : PropTypes.array,
}

const MapState = state =>{
    return{

    }
}

const MapDispatch = dispatch =>{
    return {
        verifiedStatus : (accountId,status) => dispatch(Actions.VerifiedStatus(accountId,status)),
        filterAccountsList : (filter) => dispatch(Actions.FilterAccountsList(filter)),
    }
}

export default connect(MapState,MapDispatch)(AccountsTab);
