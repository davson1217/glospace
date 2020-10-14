import * as ActionTypes from './ActionTypes'
import axios from 'axios';

const headers = {
    "Content-Type":"application/json",
    "Accept":"application/json",
    "Authorization":"Bearer "+ localStorage.getItem('adminToken')
};

export const NavigateMenu = tab => {
    //console.log(tab)
    return dispatch =>{
        dispatch({
            type:ActionTypes.ADMIN_NAVIGATE,
            payload:{tab}
        })
    }
}
export const NavigateAccountTabs = tab => {
    //console.log(tab)
    return dispatch =>{
        dispatch({
            type:ActionTypes.ACCOUNT_NAVIGATE,
            payload:{tab}
        })
    }
}

export const ToggleModal = (shipmentLabel) => {
    return dispatch =>{

        if (shipmentLabel){
            dispatch({
                type:ActionTypes.LABEL_CLICKED,
                payload:{shipmentLabel}
            })
            return;
        }
        dispatch({type:ActionTypes.TOGGLE_MODAL})
    }
}
export const InputHandler = (name,event,component) =>{
    return dispatch =>{
        switch (component) {
            case "Services":
                return dispatch({
                    type:ActionTypes.INPUT_HANDLER,
                    payload:{
                        name,
                        value: name==="servicePhoto"? event.target.files[0] : event.target.value,
                    }
                });
            case "Register":
                return dispatch({
                    type:ActionTypes.REGISTER_INPUT_HANDLER,
                    payload:{
                        name,
                        value: name !== "termsAgreed"? event.target.value : event.target.checked,
                    }
                });
            case "ClientLogin":
                return dispatch({
                    type:ActionTypes.CLIENT_LOGIN_INPUT_HANDLER,
                    payload:{
                        name,
                        value:event.target.value
                    }
                });
            case "Tracking":
                if (event.target.name === 'gs-number'){//GSNtoCheck
                    if (event.target.value.length === 10){
                        axios.post('/api/checkGSNumber',{number:event.target.value},{headers:{
                                "Content-Type":"application/json",
                                "Accept":"application/json",
                                "Authorization":"Bearer "+ localStorage.getItem('adminToken')
                            }})
                            .then(res=>{
                                if (res.data.success){
                                    dispatch({
                                        type:ActionTypes.ACCOUNT_FETCHED_BY_GSN,
                                        payload:{account:res.data.account[0]}
                                    })
                                }
                            })
                            .catch(err=>{})
                    }else dispatch({type:ActionTypes.REFRESH_GSN_ACCOUNT})
                }
                return dispatch({
                    type:ActionTypes.INPUT_HANDLER,
                    payload:{
                        name,value:event.target.value,
                    }
                });
            case "Slides":
                let value;
                if(name === "bgPhoto" || name === "sidePhoto" ){
                    value = event.target.files[0];
                }else
                    value = event.target.value;

                return dispatch({
                    type:ActionTypes.INPUT_HANDLER,
                    payload:{ name,value}
                });

           // case "Register":
            default: dispatch({
                type:ActionTypes.INPUT_HANDLER,
                payload:{ name,value:event.target.value}
            })
        }

    }
};

        //Service Actions

export const FetchServiceHandler = () =>{
    // console.log("here")
    return dispatch =>{
        axios.get('/api/services',{
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem('adminToken')
            }
        }).
        then(res=>{
            if (res.data.success){
                dispatch({
                    type:ActionTypes.SERVICE_LIST,
                    payload: {services:res.data.services}
                })
            }
        }).
        catch(err=>{})
    }
}
export const AddServiceHandler = data =>{
    return dispatch =>{
        axios.post('/api/addService',data,{headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem('adminToken')
            }}).
        then(res=>{
            if (res.data.success){
                dispatch({type:ActionTypes.ADDED_SERVICE});
                dispatch(FetchServiceHandler())
            }
        }).
        catch(err=>{})
    }
}
export const EditServiceHandler = data =>{
    return dispatch =>{
        axios.post('/api/',{data}).
        then(res=>{}).
        catch(err=>{})
    }
}
export const DeleteServiceHandler = (serviceId,fileName) =>{
    return dispatch =>{
        axios.post('/api/deleteService',{serviceId,fileName},{headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem('adminToken')
            }}).
        then(res=>{
            if (res.data.success){
                dispatch(FetchServiceHandler())
            }
        }).
        catch(err=>{})
    }
}

    //Slides Actions

export const FetchSlidesHandler = () =>{
    return dispatch =>{
        axios.get('/api/slides',{headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem('adminToken')
            }}).
        then(res=>{
            if (res.data.success){
                dispatch({
                    type:ActionTypes.SLIDE_LIST,
                    payload:{slides:res.data.slides}
                })
            }
        }).
        catch(err=>{})
    }
}
export const AddSlidesHandler = data =>{
    return dispatch =>{
        axios.post('/api/addSlide',data,{headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem('adminToken')
            }}).
        then(res=>{
            if (res.data.success){
                dispatch(FetchSlidesHandler());
                dispatch({type:ActionTypes.ADDED_SLIDE})
            }
        }).
        catch(err=>{})
    }
}
export const EditSlidesHandler = data =>{
    return dispatch =>{
        axios.post('/api/',{data}).
        then(res=>{}).
        catch(err=>{})
    }
}
export const DeleteSlideHandler = (slideId,bgPhoto,sidePhoto) =>{
    return dispatch =>{
        axios.post('/api/deleteSlide',{slideId,bgPhoto,sidePhoto},{headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem('adminToken')
            }}).
        then(res=>{
            if(res.data.success){
              dispatch(FetchSlidesHandler())
            }
        }).
        catch(err=>{})
    }
}

            //Account Handlers

export const FetchAccountsHandler = (accountStatus) =>{
    return dispatch =>{
        axios.get('/api/accounts',{headers:{
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
        }).
        catch(err=>{})
    }
}
export const ClientPaymentUploads = (filter) => {
    return dispatch =>{
        axios.get('/api/getPaymentUploads',{headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem('adminToken')
            },params:{filter}}).
        then(res=>{
            if (res.data.success){
                dispatch({
                    type:"PAYMENT_UPLOADS",
                    payload:{invoicePayments:res.data.uploads}
                })
            }
        }).
        catch(err=>{})
    }
}

export const API_SENT = (component) =>{
    return dispatch =>{
        dispatch({
            type:ActionTypes.API_REQUEST_SENT,
            payload:{component}
        })
    }
}

export const PaymentConfirmed = (invoiceNumber) => {
    return dispatch =>{
        dispatch(API_SENT("ADMIN_PAYMENT_CONFIRM"))
        axios.post('/api/paymentConfirmed',{invoiceNumber},{headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem('adminToken')
            }}).
        then(res=>{
            if (res.data.success){
                dispatch(API_SENT("ADMIN_PAYMENT_CONFIRM"))
                dispatch(ClientPaymentUploads())
                dispatch({
                    type:"PAYMENT_CONFIRMED",
                })
            }
        }).
        catch(err=>{
            dispatch(API_SENT("ADMIN_PAYMENT_CONFIRM"))
        })
    }
}
export const PaymentRejectionSubmit = (invoiceNumber,message) =>{
    return dispatch =>{
        dispatch({type:ActionTypes.API_REQUEST_SENT,payload:{component:"PAYMENT_REJECT"}})
        axios.post('/api/rejectPayment',{invoiceNumber,message},{headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem('adminToken')
            }}).
        then(res=>{
            if (res.data.success){
                dispatch(ClientPaymentUploads('confirmed'))
                dispatch({
                    type:"PAYMENT_REJECTED",
                })
            }
        }).
        catch(err=>{

        })
    }
}

// export const
/*
export const InvoiceDetails = (invoiceNumber) => {
    return dispatch =>{
        axios.get('/api/invoiceDetails',{params:{invoiceNumber}}).
        then(res=>{
            if (res.data.success){

            }
        }).
        catch(err=>{})
    }
}
*/
