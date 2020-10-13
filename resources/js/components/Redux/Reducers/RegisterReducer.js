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

    passReset:{
        email:"",
        emailSent:false,
    },
    passChange:{
        password:"",
        confirmPassword:"",
        changed:false,
    }
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
        case "PASS_EMAIL_RESET":// Password reset email address
            return{
                ...state,
                passReset: {
                    ...state.passReset,
                    email:action.payload.value
                }
            }
        case "NEW_PASSWORD":// Password reset email address
            return{
                ...state,
                passChange:{
                    ...state.passChange,
                    password: action.payload.name === 'password'? action.payload.value : state.passChange.password,
                    confirmPassword: action.payload.name === 'confirm'? action.payload.value : state.passChange.confirmPassword
                }
            }
        case "PASS_EMAIL_SENT":{
            return{ ...state, passReset: {...state.passReset,emailSent: true,email:''}}
        }
        case "PASSWORD_CHANGED":{
            return{ ...state, passChange: {...state.passChange,changed: true,password:'',confirmPassword:''}}
        }
        default: return state;
    }
}

export default RegisterReducer;
