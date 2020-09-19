import * as ActionTypes from './ActionTypes'
import axios from "axios";
import {FetchAccountsHandler} from "./AdminActions";

export const ToggleViewAccount = (accountId,accounts) =>{
    return dispatch =>{
        let account = accounts.filter((item)=>item.id === accountId)[0]
        dispatch({
            type:ActionTypes.TOGGLE_ACCOUNT,
            payload:{account}
        })
    }
}

export const VerifiedStatus = (accountId,status) =>{
    return dispatch =>{
        axios.post('/api/verifiedStatus',{accountId,status}).
        then(res=>{
            if(res.data.success){
                dispatch(FetchAccountsHandler())
                dispatch({
                    // type:ActionTypes.TOGGLE_ACCOUNT,
                    // payload:{account}
                })
            }
        }).
        catch(err=>{

        })
    }
}

export const FilterAccountsList = filter =>{
    return dispatch=>{
        axios.post('/api/filterList',{filter}).
            then(res=>{
                if (res.data.success){
                    dispatch({
                        type:ActionTypes.FETCHED_ACCOUNTS,
                        payload:{accounts:res.data.accounts}
                    })
                }
            }).catch(err=>{

            })
    }
}

export const VerifiedClick = (accountId) =>{
    return dispatch =>{
        axios.post('/api/verified',{accountId}).
        then(res=>{
            if(res.data.success){
                dispatch(FetchAccountsHandler())
                dispatch({
                    // type:ActionTypes.TOGGLE_ACCOUNT,
                    // payload:{account}
                })
            }
        }).
        catch(err=>{})
    }
}

