import * as ActionTypes from "../Actions/ActionTypes";

const initialState = {
        activeTab:"Create",
        gsNumb : "",
        destCountry : "",
        destCity : "",
        destAddress : "",
        delivDate : "",
        delivNote : "",
        shipActivity : "Label Created",
        currentLocation : "Georgia",
        trackingNum : "",
        //account to create shipment for
        accountForShipment:{},

    //fetched shipments
    shipmentLabels:[],
    clickedLabel:{},
    clickedLabelProgress:[]
}

const ShipmentManagement = (state=initialState, action) =>{
    switch (action.type) {
        case ActionTypes.SHIPMENT_NAVIGATE:
            return{
                ...state,
                activeTab: action.payload.tab
            }
        case ActionTypes.INPUT_HANDLER:
            return{
                ...state,
                [action.payload.name]: action.payload.value
            }
        case ActionTypes.TRACKING_NUMBER_GENERATED:
            return{
                ...state,
                trackingNum: action.payload.trackingNumber
            }
        case ActionTypes.ACCOUNT_FETCHED_BY_GSN:
            return{
                ...state,
                destCountry: action.payload.account.country,
                destCity: action.payload.account.city,
                destAddress: action.payload.account.address,
            }
        case ActionTypes.REFRESH_GSN_ACCOUNT:
            return{
                ...state,
                destCountry: "",
                destCity: "",
                destAddress: "",
            }
        case ActionTypes.NEW_SHIPMENT_CREATED:
            return{
                ...state,
                destCountry: "",
                destCity: "",
                destAddress: "",
            }
        case ActionTypes.SHIPMENTS_FETCHED:
            return{
                ...state,
                shipmentLabels: action.payload.shipments
            }
        case ActionTypes.LABEL_CLICKED:
            return{
                ...state,
                clickedLabel: action.payload.shipmentLabel
            }
        case ActionTypes.SHIPMENTS_PROGRESS_FETCHED:
            return{
                ...state,
                clickedLabelProgress: action.payload.progress
            }
        default : return state;
    }
}

export default ShipmentManagement;
