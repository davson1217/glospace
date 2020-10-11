import * as ActionTypes from './ActionTypes'
import axios from "axios";
import {FetchAccountsHandler} from "./AdminActions";

const headers = {
    "Content-Type":"application/json",
    "Accept":"application/json",
    "Authorization":"Bearer "+ localStorage.getItem('adminToken')
};


const AuthRequest = (username,password,comp) =>{
    return dispatch=>{
    const data = {
        grant_type: 'password',
        client_id: '2',
        client_secret: 'c0PAYjNYH9SnZuvoHjyt9diHaVHl77TIYpeCKrF8',
        username,password
    }
    let param = '';

    Object.keys(data).map(key =>{
        return param += ""+key+"="+data[key]+"&"
    });

    param = param.slice(0, param.length-1);

    axios.post(`oauth/token`,param)
        .then(response=>{
            if(response.data.access_token){
                dispatch({type:ActionTypes.API_REQUEST_SENT,payload:{component:comp}})
                localStorage.setItem("token", response.data.access_token);
                dispatch({type:ActionTypes.SHOW_FEEDBACK,payload:{message:"Authentication Successful"}});
                setTimeout(()=>{
                    dispatch({type:ActionTypes.USER_REGISTERED});
                },1800)

            }else{

            }
        })
        .catch(err=>{
            // console.log("POOP")
            dispatch({type:ActionTypes.LOGIN_ERROR})
            dispatch({type:ActionTypes.API_REQUEST_SENT,payload:{component:comp}})
        })
    }
}

export const RegisterUserHandler = data =>{
    return dispatch =>{
        dispatch({type:ActionTypes.API_REQUEST_SENT,payload:{component:"REGISTER_USER"}})
        axios.post('/api/registerUser', data,{headers}).
        then(res=>{
            if (res.data.success){
                dispatch(AuthRequest(data.email,data.password,"REGISTER_USER"))
            }
        }).
        catch(err=>{

        })
    }
}
export const LoginHandler = data =>{
    return dispatch =>{
        dispatch({type:ActionTypes.API_REQUEST_SENT,payload:{component:"CLIENT_LOGIN"}})
        dispatch(AuthRequest(data.email,data.password,"CLIENT_LOGIN"))
    }
}

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
        axios.post('/api/verifiedStatus',{accountId,status},{
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem('adminToken')
            }
        }).
        then(res=>{
            if(res.data.success){
                // dispatch(FetchAccountsHandler())
                dispatch(FilterAccountsList(status))
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

export const FilterAccountsList = (filter,GSN) =>{
    // console.log(filter);
    return dispatch=>{
        axios.post('/api/filterList',{filter,GSN},{headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem('adminToken')
            }}).
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

export const FilterByGS = GSN =>{
    // console.log(filter);
    return dispatch=>{
        axios.get('/api/filterByGSN',{headers:headers,params:{GSN}}).
            then(res=>{
                if (res.data.success){

                }
            }).catch(err=>{

            })
    }
}

export const VerifiedClick = (accountId) =>{
    return dispatch =>{
        axios.post('/api/verified',{accountId},{headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem('adminToken')
            }}).
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

