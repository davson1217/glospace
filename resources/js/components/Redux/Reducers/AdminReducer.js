import * as ActionTypes from '../Actions/ActionTypes'
const initialState = {

    createSuper:{
      adminFirstName:"",
      adminLastName:"",
      emailAddress:"",
      password:"",
    },

    Login:{
      username:"",
      password:"",
      isAuthenticated:false,
      error:false
    },


    activeTab : "Services",
    isShowModal : false,

    //Service Props
    title:"",
    description:"",
    servicePhoto:null,
    services : [],

    //Accounts Props
    accounts : [],
    activeSubTab:"ALL",


    //Slides Props
    introText:"",
    headerTextOne:"",
    btnText:"",
    btnURL:"",
    headerTextTwo:"",
    closingText:"",
    bgPhoto:null,
    sidePhoto:null,
    slides:[],
    //payments
    payment:{
        paymentUploads:[],
        invoiceToView:[],
        rejectedInvoice:null,
        filter:""
    },
    rejectionMessage:"",
    filter:""
}

const AdminReducer = (state = initialState, action) =>{
    switch (action.type) {

        case "CREATE_SUPER_INPUT":
            return{
                ...state,
                createSuper: {
                    ...state.createSuper,
                    [action.payload.name]:action.payload.value
                }
            }
        case "SUPER_CREATED":
            return{
                ...state,
                createSuper: {
                    adminFirstName:"",
                    adminLastName:"",
                    emailAddress:"",
                    password:"",
                }
            }
        case "ADMIN_LOGIN_INPUT":
            return{
                ...state,
                Login: {
                    ...state.Login,
                    [action.payload.name]:action.payload.value
                }
            }
        case "ADMIN_LOGGED_IN":
            return{
                ...state,
                Login: {
                    ...state.Login,
                    isAuthenticated: true,
                    error: false,
                }
            }
        case ActionTypes.LOGIN_ERROR:
            return{
                ...state,
                Login: {
                    ...state.Login,
                    error: true
                }
            }
        case ActionTypes.ADMIN_NAVIGATE:
            return{
                ...state,
                activeTab: action.payload.tab
            }
        case ActionTypes.TOGGLE_MODAL:
            return{
                ...state,
                isShowModal: !state.isShowModal
            }
        case ActionTypes.INPUT_HANDLER:
            // console.log(action.payload.value)
            return{
                ...state,
                [action.payload.name]: action.payload.value
            }

        case ActionTypes.SERVICE_LIST:
            return{
                ...state,
                services: action.payload.services
            }
        case ActionTypes.SLIDE_LIST:
            return{
                ...state,
                slides: action.payload.slides
            }
        case ActionTypes.ADDED_SERVICE:
            return{
                ...state,
                isShowModal: false
            }
        case ActionTypes.ADDED_SLIDE:
            return{
                ...state,
                isShowModal: false
            }

        case "PAYMENT_UPLOADS":
            return {
                ...state,
                payment:{
                    ...state.payment,
                    paymentUploads: action.payload.invoicePayments
                }
            }
        case "INVOICE_DETAILS":
            return {
                ...state,
                payment:{
                    ...state.payment,
                    invoiceToView: action.payload.invoiceDetails
                }
            }
        case "CURRENT_FILTER":
            return {
                ...state,
                payment:{
                    ...state.payment,
                    filter: action.payload.filter
                }
            }
        case "REJECT_PAYMENT_CLICK":
            return {
                ...state,
                isShowModal: !state.isShowModal,
                payment:{
                    ...state.payment,
                    rejectedInvoice: action.payload.invoice
                }
            }
        case "PAYMENT_REJECTED":
            return {
                ...state,
                isShowModal: false,
                rejectionMessage: false,
                payment:{
                    ...state.payment,
                    rejectedInvoice: null
                }
            }
        default: return state;
    }
}

export default AdminReducer;
