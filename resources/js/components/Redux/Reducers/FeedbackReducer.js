import * as ActionTypes from "../Actions/ActionTypes";

const initialState = {
    showFeedback:false,
    feedbackComponent:"",
    feedbackMessage:"",

    loginError : false,
    isSentAPI: false,
    requestingComp:""
}

const FeedbackReducer = (state=initialState,action)=>{
    switch (action.type) {
        case ActionTypes.SHOW_FEEDBACK:
            return{
                ...state,
                showFeedback : !state.showFeedback,
                feedbackComponent: action.payload.component?action.payload.component : "",
                feedbackMessage: action.payload.message?action.payload.message : ""
            }
        case ActionTypes.API_REQUEST_SENT:
            return{
                isSentAPI: !state.isSentAPI,
                requestingComp: action.payload.component
            }
        default:return state;
    }
}

export default FeedbackReducer;
