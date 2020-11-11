import * as ActionTypes from "./ActionTypes";

export const ToggleModal = (ref) =>{
    return dispatch =>{
        dispatch({
            type: ActionTypes.TOGGLE_MODAL,
        })
    }
}

export const ViewService = (service) => {
    return dispatch =>{
        dispatch({
            type: ActionTypes.VIEW_SERVICE_CLICK,
            payload:{service}
        })
    }
}

export const SwitchLoginPage = (page) =>{
    return dispatch =>{
        dispatch({
            type: ActionTypes.LOGIN_PAGE,
            payload:{value:page}
        })
    }
}

export const ShowLoader = (component) =>{
    return dispatch =>{
        dispatch({
             type:ActionTypes.PAGE_LOADER,
            payload:{component}
        })
    }
}

export const PageScroll = (e) =>{
    // console.log("Hello")
    return dispatch =>{
        let node = e.current;
        //console.log("HELLO",node.scrollTop)
        dispatch({
             type:ActionTypes.PAGE_SCROLL,
            payload:{scrollValue:node.scrollTop}
        })
    }
}

export const SubmitEnquiry = (data) =>{
    return dispatch =>{
            dispatch({type:"SENDING_ENQUIRY"})
            axios.post('/api/enquiry',data)
                .then(res=>{
                    if (res.data.success){
                        dispatch({type:ActionTypes.ENQUIRY_SENT})
                    }
                }).catch(err=>{})
    }
}

export const APILoader = component =>{
    return dispatch =>{
        dispatch({
            type: ActionTypes.REQUEST_LOADER,
            payload:{component}
        })
    }
}
