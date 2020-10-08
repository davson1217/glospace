
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from "redux-thunk";
import LayoutReducer from "./Reducers/LayoutReducer";
import AdminReducer from "./Reducers/AdminReducer";
import AccountManagement from "./Reducers/AccountManagement";
import ShipmentManagement from "./Reducers/ShipmentManagement";
import RegisterReducer from "./Reducers/RegisterReducer";
import DashboardReducer from "./Reducers/DashboardReducer";
import FeedbackReducer from "./Reducers/FeedbackReducer";
import FilterReducer from "./Reducers/FilterReducer";
const reducers = combineReducers({
    Layout : LayoutReducer,
    Admin : AdminReducer,
    AccountManagement : AccountManagement,
    ShipmentManagement : ShipmentManagement,
    Registration : RegisterReducer,
    Dashboard : DashboardReducer,
    Feedback : FeedbackReducer,
    Filter : FilterReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
