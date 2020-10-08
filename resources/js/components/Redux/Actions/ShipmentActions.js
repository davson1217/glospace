import * as ActionTypes from "./ActionTypes";
import axios from "axios";

const headers = {
    "Content-Type":"application/json",
    "Accept":"application/json",
    "Authorization":"Bearer "+ localStorage.getItem('adminToken')
};


export const NavigateShipmentTab = tab => {
    return dispatch =>{
        dispatch({
            type:ActionTypes.SHIPMENT_NAVIGATE,
            payload:{tab}
        })
    }
}

 //Tracking Creating Actions
export const GenerateTrackingNum = () => {
    return dispatch =>{
       let number = Math.floor(Math.random() * (1000000000000 - 1 + 1) ) + 1;
        const trackingNumber = "G"+number;
        dispatch({
            type:ActionTypes.TRACKING_NUMBER_GENERATED,
            payload:{trackingNumber}
        })
    }
}

export const FetchAccountByGS = (GSN,category) => {
    // console.log(category)
    return dispatch =>{
        // if (GSN.length === 10){
            axios.post('/api/checkGSNumber',{number:GSN},{headers})
                .then(res=>{
                    if (res.data.success){
                        dispatch({
                            type:ActionTypes.ACCOUNT_FETCHED_BY_GSN,
                            payload:{account:res.data.account[0],category}
                        })
                    }
                })
                .catch(err=>{})
        // }else dispatch({type:ActionTypes.REFRESH_GSN_ACCOUNT})
    }
}

export const CreateTracking = (data) => {
    return dispatch =>{
        dispatch({type:ActionTypes.API_REQUEST_SENT,payload:{component:"CREATE_SHIPMENT"}})
       axios.post("/api/createTracking",data,{headers:{
               "Content-Type":"application/json",
               "Accept":"application/json",
               "Authorization":"Bearer "+ localStorage.getItem('adminToken')
           }})
       .then(res=>{
            if (res.data.success){
                dispatch({type:ActionTypes.API_REQUEST_SENT,payload:{component:"CREATE_SHIPMENT"}})
                dispatch({type:ActionTypes.NEW_SHIPMENT_CREATED})
                dispatch({
                    type:ActionTypes.SHOW_FEEDBACK,
                    payload:{
                        message:"New Shipment Created",
                        component:"CREATE_SHIPMENT",
                    }
                })
                setTimeout(()=>{
                    dispatch(FetchShipments(3))
                },1000)
            }
       }).catch(err=>{
           dispatch({type:ActionTypes.API_REQUEST_SENT,payload:{component:"CREATE_SHIPMENT"}})
       })
    }
}


// Shipment management actions
export const FetchShipments = (limit) => {
    return dispatch =>{
       axios.get("/api/fetchShipments",{headers:{
               "Content-Type":"application/json",
               "Accept":"application/json",
               "Authorization":"Bearer "+ localStorage.getItem('adminToken')
           },params:{limit}})
       .then(res=>{
            if (res.data.success){
               dispatch({
                   type:ActionTypes.SHIPMENTS_FETCHED,
                   payload:{shipments:res.data.shipments}
               })
            }
       }).catch(err=>{})
    }
}

export const InvoiceBubble = (labelId,bubbleType) =>{
    return dispatch=>{
        dispatch({
            type: ActionTypes.SHOW_INVOICE_BUBBLE,
            payload: {labelId,bubbleType}
        })
    }
}

export const CreateInvoice = data =>{
    return (dispatch)=> {
        let invoiceNumber;
        invoiceNumber = Math.floor(Math.random() * (1000000 - 100) ) + 100;
        data.invoice_number = invoiceNumber;
        dispatch({type:ActionTypes.API_REQUEST_SENT,payload:{component:"CREATE_INVOICE"}})
        axios.post("/api/createInvoice",data,{headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem('adminToken')
            }})
            .then(res=>{
                if (res.data.success){
                    dispatch(FetchShipments(null));
                    dispatch({type:ActionTypes.INVOICE_CREATED})
                    dispatch({type:ActionTypes.API_REQUEST_SENT})
                }
            })
            .catch(err=>{
                dispatch({type:ActionTypes.API_REQUEST_SENT,payload:{component:"CREATE_INVOICE"}})
            })
    }
}

export const DeleteShipment = (shipmentId,component) => {
    return dispatch =>{
        // console.log(shipmentId)
       axios.delete("/api/deleteShipment",{headers:{
               "Content-Type":"application/json",
               "Accept":"application/json",
               "Authorization":"Bearer "+ localStorage.getItem('adminToken')
           },params:{shipmentId}})
       .then(res=>{
           let limit = component === "Create" ? 3 : null;
            if (res.data.success){
               dispatch(FetchShipments(limit));//check limit based on action-calling component
            }
       }).catch(err=>{})
    }
}

//Shipment Progress Actions
export const FetchShipmentProgress = trackingNumber => {
  //  console.log(trackingNumber)
    return dispatch =>{
       axios.post("/api/shipmentProgress",{trackingNumber},{headers:{
               "Content-Type":"application/json",
               "Accept":"application/json",
               "Authorization":"Bearer "+ localStorage.getItem('adminToken')
           }})
       .then(res=>{
            if (res.data.success){
               dispatch({
                   type:ActionTypes.SHIPMENTS_PROGRESS_FETCHED,
                   payload:{progress:res.data.progress}
               })
            }
       }).catch(err=>{})
    }
}

export const AddProgressClickHandler = () => {
    return dispatch =>{
        dispatch({type:ActionTypes.ADD_PROGRESS_CLICKED})
    }
}

export const AddProgressHandler = (data) => {
    return dispatch =>{
        axios.post("/api/addProgress",data,{headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem('adminToken')
            }})
            .then(res=>{
                if (res.data.success){
                    dispatch(AddProgressClickHandler());
                    dispatch(FetchShipmentProgress(res.data.trackingNumber));
                }
            }).catch(err=>{})
    }
}
