import * as ActionTypes from "./ActionTypes";
import {APILoader} from "./LayoutActions";
import {API_SENT} from "./AdminActions";
const headers = {
    "Content-Type":"application/json",
    "Accept":"application/json",
};
const authHeader={
        "Content-Type":"application/json",
        "Accept":"application/json",
        "Authorization":"Bearer "+ localStorage.getItem('token')
}

export const NavigateDashboard = menu =>{
    return dispatch =>{
        dispatch({
            type:ActionTypes.NAVIGATE_DASHBOARD,
            payload: {menu}
        })
    }
}

export const FetchAuthUser = () => {
    return dispatch=>{
        dispatch({type:ActionTypes.API_REQUEST_SENT,payload:{component:"FETCH_CLIENT"}})
        axios.get("/api/user",{headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem('token')
            }}).
        then(res=>{
            dispatch({type:ActionTypes.API_REQUEST_SENT,payload:{component:"FETCH_CLIENT"}})
            if (res.data.success){
                dispatch({type:ActionTypes.FETCHED_USER,payload:{user:res.data.user}})
            }
        }).catch(err=>{
            dispatch({type:ActionTypes.API_REQUEST_SENT,payload:{component:"FETCH_CLIENT"}})
        })
    }
}

export const VerificationMailResend = () => {
    return dispatch =>{
        dispatch(API_SENT("RESENDING_VERIFY_EMAIL"))
        axios.post("/api/emailVerifyResend",null,{headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem('token')
            }
        }).then(res=>{
            if (res.data.success){
                dispatch({type:ActionTypes.VERIFY_MAIL_RESENT})
            }
        }).catch(err=>{

        })
    }
}

export const UserEmailVerified = userID =>{
    return dispatch =>{
        dispatch(APILoader("VerifyEmail"))
        axios.post("/api/emailVerified",{userID},{headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                // "Authorization":"Bearer "+ localStorage.getItem('token')
            }
        })
            .then(res=>{
                if (res.data.success){
                    dispatch(APILoader("VerifyEmail"));
                    dispatch({
                        type:ActionTypes.USER_EMAIL_VERIFIED,
                        payload:{message: res.data.msg}
                    })
                }
            })
            .catch(err=>{})
    }
}
//:::::::::::Dashboard Tracking Actions::::::::::::::::
export const TrackShipment = tracking_number =>{
    return dispatch =>{
        dispatch({type:ActionTypes.TRACKING_REQUEST_SENT})
            axios.get("/api/clientTracking",{headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                    "Authorization":"Bearer "+ localStorage.getItem('adminToken')
                },params:{tracking_number}}).
            then(res=>{
                if (res.data.success){
                    dispatch({type:ActionTypes.TRACKING_REQUEST_SENT})
                    if (res.data.tracking === null) {
                        return dispatch({
                            type: ActionTypes.INCORRECT_TRACKING_NUMBER,
                            payload:{message:"We couldn't find any shipment with that number"}
                        })
                    }
                    dispatch({type:ActionTypes.TOGGLE_CLIENT_MODAL})
                    dispatch({
                        type:ActionTypes.CLIENT_SHIPMENT_FETCHED,
                        payload:{shipment:res.data.tracking}
                    })
                }
            }).catch(err=>{

            })
        // dispatch({ type: ActionTypes.TOGGLE_CLIENT_MODAL})
    }
}


//:::::::::::Dashboard Invoice Action Creators::::::::::::::::
export const NavigateInvoice = menu =>{
    return dispatch=>{
        dispatch({
            type:ActionTypes.NAVIGATE_INVOICE,
            payload:{menu}
        })
    }
}
export const GetInvoices = category =>{
    return dispatch=>{
        axios.get(`/api/invoices`,{headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem('token')
            },params:{category}})
            .then(res=>{
                if (res.data.success){
                    dispatch({
                        type:ActionTypes.INVOICES,
                        payload:{invoices:res.data.invoices}
                    })
                }
            })
            .catch()
    }
}
export const ReceiptUploadHandler = (event,invoice) =>{
    return dispatch =>{
        let file = event.target.files[0];
        if(file)
        if (!file.name.match(/.(jpg|png|jpeg|pdf)$/i)){
            alert("File format not accepted")
        }else dispatch({type:ActionTypes.RECEIPT_UPLOAD_HANDLER,payload:{file,invoice}})
    }
}
export const UploadPaymentReceipt = (file,invoice_number) =>{
    return dispatch=>{
        const fd = new FormData();
        fd.append("file",file)
        fd.append("invoice_number",invoice_number)
        axios.post("/api/receiptUpload",fd,{headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem('token')
            }}).then(res=>{
                if (res.data.success){
                    dispatch({ type:ActionTypes.PAYMENT_UPLOADED})
                    dispatch(GetInvoices('Unpaid'))
                }
        }).catch(err=>{})
        // console.log(file)
    }
}


//:::::::::::Dashboard Settings Actions::::::::::::::::
export const ChangeSubmit = (change,name) =>{
    return dispatch =>{
        let data = name === 'password'? change : {change,name};
        axios.post("/api/updateUser",data,{headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem('token')
            }}).
        then(res=>{
            if (res.data.success){
                if (name==='password')
                if (res.data.message === 'INCORRECT'){
                    dispatch({type:"INCORRECT_PASS"})
                    return false;
                }else {
                    dispatch({type:"CORRECT_PASS"})
                    return true;
                }
                dispatch(FetchAuthUser());
                dispatch({type:"SETTING_CHANGED"})
            }
        }).catch(err=>{

        })
    }
}
