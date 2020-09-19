
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from "redux-thunk";
import LayoutReducer from "./Reducers/LayoutReducer";
import AdminReducer from "./Reducers/AdminReducer";
import AccountManagement from "./Reducers/AccountManagement";
import ShipmentManagement from "./Reducers/ShipmentManagement";
const reducers = combineReducers({
    Layout : LayoutReducer,
    Admin : AdminReducer,
    AccountManagement : AccountManagement,
    ShipmentManagement : ShipmentManagement,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
