import * as ActionTypes from '../Actions/ActionTypes'
const initialState = {
    firstName:"",
    lastName:"",
    country:"",
    state:"",
    city:"",
    address:"",
    addressTwo:"",
    email:"",
    phone:"",
    password:"",
    confirmPass:"",
    ID:"",
    termsAgreed:false,
    userRegistered:false,
    focusedInput : "",
    showHelper : false,
//    :::::::LOGIN PROPS ::::::::
    loginEmail:"",
    loginPassword:"",
//    :::::::LOGIN PROPS END ::::::::

}

const RegisterReducer = (state = initialState, action )=>{
    switch (action.type) {
        case ActionTypes.REGISTER_INPUT_HANDLER:
            return{
                ...state,
                [action.payload.name] : action.payload.value
            }
        case ActionTypes.CLIENT_LOGIN_INPUT_HANDLER:
            return{
                ...state,
                [action.payload.name] : action.payload.value
            }
        case ActionTypes.USER_REGISTERED:
            return{
                ...state,
                userRegistered : true,
                loginError: false
            }
        case ActionTypes.LOGOUT:
            return{
                ...state,
                userRegistered : false
            }

        case ActionTypes.LOGIN_ERROR:
            return{
                ...state,
               loginError: !state.loginError
            }
        case ActionTypes.INPUT_FOCUS:
            return{
                ...state,
                showHelper: !state.showHelper,
                focusedInput : action.payload.name
            }
        default: return state;
    }
}

export default RegisterReducer;
