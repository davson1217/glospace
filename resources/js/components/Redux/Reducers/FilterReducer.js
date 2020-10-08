const initialState ={
    Payment:{
        confirmed:false,
        unconfirmed:true,
        rejected:false,
    }
}

const FilterReducer = (state = initialState, action)=>{
    switch (action.type) {
        case "PAYMENT_FILTER":
            let name = action.payload.name;
            return{
                ...state,
                Payment: {
                    ...state.Payment,
                    [action.payload.name]: name === 'confirmed' ? !state.Payment.confirmed :
                        name === 'unconfirmed' ? !state.Payment.unconfirmed : !state.Payment.rejected
                }
            }
        default:return state;
    }
}

export default  FilterReducer;
