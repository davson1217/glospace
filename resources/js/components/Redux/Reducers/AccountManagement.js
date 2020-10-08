import * as ActionTypes from '../Actions/ActionTypes';

const initialState = {
    isShowAccountDetails : false,
    accountToView:[],
    accounts:[],
    accountTab: "All",
    GSearch:"",
    // radioValue:'All',
}

const AccountManagement = (state = initialState, action) =>{
    switch (action.type) {
        case ActionTypes.TOGGLE_ACCOUNT:
            return {
                ...state,
                isShowAccountDetails: !state.isShowAccountDetails,
                accountToView: action.payload.account,
            }
        case ActionTypes.FETCHED_ACCOUNTS:
            return{
                ...state,
                accounts: action.payload.accounts,
            }
        case ActionTypes.ACCOUNT_NAVIGATE:
            return{
                ...state,
                accountTab: action.payload.tab,
            }
        case ActionTypes.INPUT_HANDLER:
            // console.log("here")
            return{
                ...state,
                [action.payload.name]: action.payload.value,
            }

        default: return state;
    }
}

export default AccountManagement;
