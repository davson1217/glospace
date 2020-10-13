import * as ActionTypes from "../Actions/ActionTypes";

const initialState = {
    activeMenu : "Shipment",
    //shipment Props
    trackingNumber : "",
    trackingError : "",
    isRequestTracking:false,
    showShipmentModal : false,
    shipments : [],
    isShowProgress:true,
    progressView: "Overview",
    userLoggedOut: false,

    user:{},
    emailVerifyMessage:"",
    verificationResent:false,

    //:::::Invoice Menu Props :::::::::
    invoiceMenu:{
        activeMenu : "Outstanding",
        invoices: [],
        receipt:null,
        receiptPreview: null,
        invoiceToPay:null
    },

    //:::::Settings Menu Props :::::::::
    settingsMenu:{
        activeMenu:'Address',
        address:'',
        phone:'',
        currentPass:'',
        newPass:'',
        passIncorrect:false,
        passChanged:false,
    }
}

const DashboardReducer = (state=initialState, action)=>{
    switch (action.type) {
        case ActionTypes.NAVIGATE_DASHBOARD:
            return {...state, activeMenu: action.payload.menu}
        case ActionTypes.VERIFY_MAIL_RESENT:
            return {...state,verificationResent: true}
        case ActionTypes.INPUT_HANDLER:
            return {...state,[action.payload.name]: action.payload.value}
        case ActionTypes.TOGGLE_CLIENT_MODAL:
            return {
                ...state,
                showShipmentModal: !state.showShipmentModal,
                trackingError: ""
            }
        case ActionTypes.INCORRECT_TRACKING_NUMBER:
            return {
                ...state,
               trackingError: action.payload.message
            }
        case ActionTypes.TRACKING_REQUEST_SENT:
            return {
                ...state,
                isRequestTracking: !state.isRequestTracking
            }
        case ActionTypes.CLIENT_SHIPMENT_FETCHED:
            return {
                ...state,
                shipments: action.payload.shipment
            }
        case ActionTypes.TOGGLE_SHIPMENT_PROGRESS:
            return {
                ...state,
                isShowProgress: !state.isShowProgress
            }
        case ActionTypes.TRACKING_VIEW_STYLE:
            return {
                ...state,
                progressView: action.payload.view
            }
        case ActionTypes.LOGOUT:
            return {
                ...state,
                userLoggedOut: true
            }
        case ActionTypes.FETCHED_USER:
            return {
                ...state,
                user: action.payload.user
            }
        case ActionTypes.USER_EMAIL_VERIFIED:
            return {
                ...state,
                emailVerifyMessage: action.payload.message
            }

            //Invoice / Payments
        case ActionTypes.NAVIGATE_INVOICE:
            return {
                ...state,
                invoiceMenu: {
                    ...state.invoiceMenu,
                    activeMenu: action.payload.menu
                }
            }
        case ActionTypes.INVOICES:
            return {
                ...state,
                invoiceMenu: {
                    ...state.invoiceMenu,
                    invoices: action.payload.invoices
                }
            }
        case ActionTypes.RECEIPT_UPLOAD_HANDLER:
                let prev = window.URL.createObjectURL(action.payload.file);
                    return {
                        ...state,
                        invoiceMenu: {
                            ...state.invoiceMenu,
                            receipt: action.payload.file,
                            invoiceToPay: action.payload.invoice,
                            receiptPreview: prev,
                        }
                    }
        case ActionTypes.PAYMENT_UPLOADED:
                    return {
                        ...state,
                        invoiceMenu: {
                            ...state.invoiceMenu,
                            receipt: null,
                            invoiceToPay: null,
                            receiptPreview: null,
                        }
                    }

        //Settings
        case "DEFAULT_VALUES":
            return {
                ...state,
                settingsMenu: {
                    ...state.settingsMenu,
                    address:action.payload.address,
                    phone:action.payload.phone,
                }
            }
        case "SETTINGS_MENU":
            return {
                ...state,
                settingsMenu: {
                    ...state.settingsMenu,
                    activeMenu: action.payload.menu,
                }
            }
        case "SETTING_CHANGE":
            return {
                ...state,
                settingsMenu: {
                    ...state.settingsMenu,
                    address: action.payload.name === 'address' ? action.payload.value : state.settingsMenu.address,
                    phone: action.payload.name === 'phone' ? action.payload.value : state.settingsMenu.phone,
                    currentPass: action.payload.name === 'currentPass' ? action.payload.value : state.settingsMenu.currentPass,
                    newPass: action.payload.name === 'newPass' ? action.payload.value : state.settingsMenu.newPass,
                }
            }
        case "SETTING_CHANGED":
            return {
                ...state,
                settingsMenu: {
                    ...state.settingsMenu,
                    address: '',
                    phone: '',
                    currentPass:'',
                    newPass:''
                }
            }

        case "INCORRECT_PASS":
                    return {
                        ...state,
                        settingsMenu: {
                            ...state.settingsMenu,
                            passIncorrect:true
                        }
                    }
        case "CORRECT_PASS":
                    return {
                        ...state,
                        settingsMenu: {
                            ...state.settingsMenu,
                            passChanged:true,
                            passIncorrect: false,
                            currentPass:'',
                            newPass:'',
                        }
                    }

        default: return state;
    }
}

export default DashboardReducer
