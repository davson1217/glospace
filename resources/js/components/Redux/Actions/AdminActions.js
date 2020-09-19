import * as ActionTypes from './ActionTypes'
import axios from 'axios';

const headers = {
    "Content-Type":"application/json",
    "Accept":"application/json",
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
        dispatch({type:ActionTypes.TOGGLE_MODAL})

        if (shipmentLabel){
            dispatch({
                type:ActionTypes.LABEL_CLICKED,
                payload:{shipmentLabel}
            })
        }

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
            case "Tracking":
                if (event.target.value.length === 10){
                    axios.post('/api/checkGSNumber',{number:event.target.value},{headers})
                        .then(res=>{
                            if (res.data.success){
                                dispatch({
                                    type:ActionTypes.ACCOUNT_FETCHED_BY_GSN,
                                    payload:{account:res.data.account[0]}
                                })
                            }
                        })
                        .catch(err=>{

                        })
                }else dispatch({type:ActionTypes.REFRESH_GSN_ACCOUNT})
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

            default: return
        }

    }
};

        //Service Actions

export const FetchServiceHandler = () =>{
    // console.log("here")
    return dispatch =>{
        axios.get('/api/services').
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
        axios.post('/api/addService',data,{headers}).
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
        axios.post('/api/deleteService',{serviceId,fileName}).
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
        axios.get('/api/slides').
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
        axios.post('/api/addSlide',data).
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
        axios.post('/api/deleteSlide',{slideId,bgPhoto,sidePhoto}).
        then(res=>{
            if(res.data.success){
              dispatch(FetchSlidesHandler())
            }
        }).
        catch(err=>{})
    }
}

            //Account Handlers

export const FetchAccountsHandler = () =>{
    return dispatch =>{
        axios.get('/api/accounts').
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
