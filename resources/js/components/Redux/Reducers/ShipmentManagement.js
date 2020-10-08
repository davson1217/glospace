import * as ActionTypes from "../Actions/ActionTypes";

const initialState = {
//::::::::::::::::::: Shipment Creation props :::::::::::::::::::::::::::::
        activeTab:"Create",
        senderHasGS:'',
        receiverHasGS:'',
        // GSNtoCheck:'',
        SenderGSNtoCheck:'',
        ReceiverGSNtoCheck:'',
        senderDetails:{},
        receiverDetails:{},

        SenderName:"",
        SenderEmail:"",
        SenderCountry:"",
        SenderCity:"",
        SenderAddress:"",
        SenderPhone:"",

        ReceiverName:"",
        ReceiverEmail:"",
        ReceiverCountry:"",
        ReceiverCity:"",
        ReceiverAddress:"",
        ReceiverPhone:"",
        delivDate : "",
        delivNote : "",
        packageDesc : "",
        packageWeight : "",
        shipActivity : "Label Created",
        currentLocation : "Georgia",
        trackingNum : "",
        progressRange : 10,
        showBar : false,
        accountForShipment:{},//account to create shipment for
//::::::::::::::::::: Shipment Creation props end :::::::::::::::::::::::::::::


//::::::::::::::::::: Shipments props :::::::::::::::::::::::::::::
        shipmentLabels:[],
        clickedLabel:{},
        isShowModal:false,
        isShowLabelOptions:false,
        hoveredLabel:null,
        hoveredLabelOwner:null,
    //::::: Invoice props ::::
        isShowInvoiceBubble:false,
        showBubbleFor:"",
        labelToInvoice:null,
        currency:"NGN",
        amount:"",
        invoiceNote:"",
        fetchedInvoice:{
            cost: false,
            is_paid:null,
        },
        checkAlert:true,
//::::::::::::::::::: Shipments props :::::::::::::::::::::::::::::

        //progress
        clickedLabelProgress:[],
        isShowAddProgress:false,
        progressSubject:"",
        progressDescription:"",
        progressLocation:"",

}

const ShipmentManagement = (state=initialState, action) => {
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
            if (action.payload.category === "Sender"){
                return{
                    ...state,
                    senderDetails: {
                        ...state.senderDetails,
                        name:action.payload.account.name,
                        email:action.payload.account.email,
                        country:action.payload.account.country,
                        city:action.payload.account.city,
                        address:action.payload.account.address,
                        phone:action.payload.account.phone,
                    }
                }
            }
            return{
                ...state,
                receiverDetails: {
                    ...state.senderDetails,
                    name:action.payload.account.name,
                    email:action.payload.account.email,
                    country:action.payload.account.country,
                    city:action.payload.account.city,
                    address:action.payload.account.address,
                    phone:action.payload.account.phone,
                }
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
                gsNumb : "",
                destCountry : "",
                destCity : "",
                destAddress : "",
                delivDate : "",
                delivNote : "",
                packageDesc : "",
                packageWeight : "",
                shipActivity : "Label Created",
                currentLocation : "Georgia",
                trackingNum : "",
                progressRange : 10,
            }
        case ActionTypes.SHIPMENTS_FETCHED:
            return{
                ...state,
                shipmentLabels: action.payload.shipments
            }

        case ActionTypes.LABEL_CLICKED: // MODAL TOGGLE FOR SHIPMENT VIEW

            return{
                ...state,
                clickedLabel: action.payload.shipmentLabel,
                progressRange: parseInt(action.payload.shipmentLabel.progress),
                isShowModal: !state.isShowModal
            }

        case ActionTypes.SHOW_LABEL_OPTIONS:
            return{
                ...state,
                isShowLabelOptions: action.payload.toggle,
                hoveredLabel: action.payload.labelId,
                hoveredLabelOwner: action.payload.labelOwner,
            }

        case ActionTypes.SHOW_INVOICE_BUBBLE:
            return{
                ...state,
                isShowInvoiceBubble: !state.isShowInvoiceBubble,
                labelToInvoice: action.payload.labelId,
                showBubbleFor: action.payload.bubbleType,
            }
        case ActionTypes.INVOICE_CREATED:
            return{
                ...state,
                isShowInvoiceBubble: false,
                labelToInvoice: null,
                amount:"",
                invoiceNote:""
            }
        case ActionTypes.INVOICE_FETCHED:
            return{
                ...state,
                fetchedInvoice:action.payload.invoice,
            }
        case ActionTypes.SHIPMENTS_PROGRESS_FETCHED:
            return{
                ...state,
                clickedLabelProgress: action.payload.progress
            }
        case ActionTypes.ADD_PROGRESS_CLICKED:
            return{
                ...state,
                isShowAddProgress: !state.isShowAddProgress
            }
        default : return state;
    }
}

export default ShipmentManagement;
