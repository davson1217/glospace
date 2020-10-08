import React,{useEffect} from 'react'
import PropTypes from 'prop-types';
import AllAccounts from "./Reusable/AccountManagement/AllAccounts";
import {connect} from "react-redux";
import * as Actions from "../Redux/Actions/AccountActions";
import Filter from "./Reusable/Filter";
import {InputHandler} from "../Redux/Actions/AdminActions";
import './Styles/Accounts.css'
const AccountsTab = props =>{

    useEffect(()=>{
        props.fetchAccounts()
    },[])

    let accounts = (
        <div className="no-service text-center d-flex justify-content-center align-items-center" style={{height:"70vh", width:"100%"}}>
            <h4>No Account found</h4>
        </div>
    )

    if (Object.keys(props.accounts).length){
        accounts = props.accounts.map((item,index)=>{
            if(item.user_type !== 2)
            return <AllAccounts
                accountId={item.id}
                GSNumber={item.gs_number}
                name={item.name}
                is_verified={item.email_verified_at}
                verifiedStatus={props.verifiedStatus}
                key={index}
            />
        })
    }

    return (
        <div>
            <div className="row">
                <div className="col-sm-12 ">
                    <div className="filter p-2 col-sm-12 row">

                        <Filter
                            filterHandler={()=>props.filterAccountsList(sessionStorage.getItem("filter"))}
                            radioNames={["All","Verified","Unverified"]}
                            radioValue={props.store.radioValue}
                        />

                        <div className="search-container">
                            <form onSubmit={e=>{e.preventDefault();props.filterAccountsList("GSN",props.store.GSearch)}}>
                                <input type="text" placeholder="GS123456789" name="search"
                                       onChange={e=>props.inputHandler("GSearch",e,"Accounts")}
                                       value={props.store.GSearch}/>
                                <button type="submit" disabled={!props.store.GSearch}>
                                    <img src={"/img/search.svg"} alt="search" width={15}/>
                                </button>
                            </form>
                        </div>

                    </div>

                    <hr/>

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
        store: state.AccountManagement,
    }
}

const MapDispatch = dispatch =>{
    return {
        verifiedStatus : (accountId,status) => dispatch(Actions.VerifiedStatus(accountId,status)),
        // filterRadioHandler : ()=>{},
        filterAccountsList : (filter,GSN) => {
            let f = filter === "All" ? 2 : filter === "Verified" ? 1 : filter === "Unverified"? 0 : "GSN";
            dispatch(Actions.FilterAccountsList(f,GSN))
        },
       // filterByGS: (GSNumber) => dispatch(Actions.FilterByGS(GSNumber)),
        inputHandler: (name,e,comp) => dispatch(InputHandler(name,e,comp)),
    }
}

export default connect(MapState,MapDispatch)(AccountsTab);
