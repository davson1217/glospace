import * as ActionTypes from '../Actions/ActionTypes'
const initialState = {
    activeTab : "Shipment",
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
}

const AdminReducer = (state = initialState, action) =>{
    switch (action.type) {
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
        default: return state;
    }
}

export default AdminReducer;
