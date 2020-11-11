import * as ActionTypes from '../Actions/ActionTypes';

const initialState = {

    openPageLoader: {
        home:true,
        service:true,
        about:true,
        contact:true,
    },

    serviceView :{
      showServiceModal:false,
      serviceToView:{}
    },

    isShowModal : false,
    loginPage: "LOGIN",
    scrollValue:0,

    isSentRequest:false,
    requestComponent:"",
    //contact props
    enquiry_API:false,
    clientFirstName:"",
    clientLastName:"",
    clientEmail:"",
    querySubject:"",
    query:"",
}

const LayoutReducer = (state = initialState, action) =>{
    switch (action.type) {
        case ActionTypes.TOGGLE_MODAL :
            return{
                ...state,
                isShowModal: !state.isShowModal
            };
        case ActionTypes.VIEW_SERVICE_CLICK :
            return{
                ...state,
               serviceView: {
                    ...state.serviceView,
                   showServiceModal: !state.serviceView.showServiceModal,
                   serviceToView: action.payload.service
               }
            };
        case ActionTypes.LOGIN_PAGE :
            return{
                ...state,
                loginPage: action.payload.value
            };
        case ActionTypes.PAGE_SCROLL :
            // console.log(action.payload.scrollValue)
            return{
                ...state,
                scrollValue: action.payload.scrollValue
            }
        case ActionTypes.PAGE_LOADER :
            return{
                ...state,
                openPageLoader: {
                    ...state.openPageLoader,
                    home: action.payload.component === "Home" ? false : state.openPageLoader.home,
                    about: action.payload.component === "About" ? false : state.openPageLoader.about,
                    service: action.payload.component === "Service" ? false : state.openPageLoader.service,
                    contact: action.payload.component === "Contact" ? false : state.openPageLoader.contact,
                }
            }
        case ActionTypes.INPUT_HANDLER :
            return{
                ...state,
                [action.payload.name]: action.payload.value
            }
        case ActionTypes.REQUEST_LOADER :
            return{
                ...state,
               isSentRequest: !state.isSentRequest,
                requestComponent: action.payload.component
            }
        case "SENDING_ENQUIRY" :
            return{
                    ...state,
                    enquiry_API : true,
                }
        case ActionTypes.ENQUIRY_SENT :
            return{
                ...state,
                clientFirstName:"",
                clientLastName:"",
                clientEmail:"",
                querySubject:"",
                query:"",
                enquiry_API:false
            }
        default : return state;
    }
}

export default LayoutReducer;
