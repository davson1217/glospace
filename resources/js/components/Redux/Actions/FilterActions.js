
export const PaymentFilterHandler = (name)=>{
    return dispatch=>{
        dispatch({
            type:"PAYMENT_FILTER",
            payload:{name}
        })
    }
}
