import * as ActionTypes from '../Actions/ActionTypes';

const initialState = {
    isShowModal : false,
    loginPage: "LOGIN",
    scrollValue:0,

}

const LayoutReducer = (state = initialState, action) =>{
    switch (action.type) {
        case ActionTypes.TOGGLE_MODAL :
            return{
                ...state,
                isShow: !state.isShow
            };
        case ActionTypes.LOGIN_PAGE :
            return{
                ...state,
                loginPage: action.payload.value
            };
        case ActionTypes.PAGE_SCROLL :
            return{
                ...state,
                scrollValue: action.payload.scrollValue
            }
        default : return state;
    }
}

export default LayoutReducer;
