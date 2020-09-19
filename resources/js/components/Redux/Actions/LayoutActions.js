import * as ActionTypes from "./ActionTypes";

export const ToggleModal = (ref) =>{
    return dispatch =>{
        dispatch({
            type: ActionTypes.TOGGLE_MODAL,
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
export const PageScroll = (e) =>{
    return dispatch =>{
        let node = e.current;
        // console.log(node.scrollTop)
        dispatch({
             type:ActionTypes.PAGE_SCROLL,
            payload:{scrollValue:node.scrollTop}
        })
    }
}
