import * as ActionTypes from "./ActionTypes";

const headers = {
    "Content-Type":"application/json",
    "Accept":"application/json",
};


export const NavigateShipmentTab = tab => {
    return dispatch =>{
        dispatch({
            type:ActionTypes.SHIPMENT_NAVIGATE,
            payload:{tab}
        })
    }
}

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

export const CreateTracking = (data) => {
    return dispatch =>{
       axios.post("/api/createTracking",data,{headers})
       .then(res=>{
            if (res.data.success){
                dispatch({type:ActionTypes.NEW_SHIPMENT_CREATED})
            }
       }).catch(err=>{})
    }
}

export const FetchShipments = () => {
    return dispatch =>{
       axios.get("/api/fetchShipments",{headers})
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

export const FetchShipmentProgress = trackingNumber => {
  //  console.log(trackingNumber)
    return dispatch =>{
       axios.post("/api/shipmentProgress",{trackingNumber},{headers})
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
