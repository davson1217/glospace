import React, {useEffect} from 'react';
import SideBar from "./Nav/Sidebar";
import {connect} from "react-redux";
import {useHistory} from 'react-router-dom';
import ControlTabs from "./ControlTabs";
import * as Actions  from "../Redux/Actions/AdminActions";
import {DeleteShipment, FetchShipments} from "../Redux/Actions/ShipmentActions";

const Admin = props =>{

    useEffect(()=>{
        document.title = "Glospace | Admin"
        if (!localStorage.getItem('adminToken')){
            const history = useHistory();
            history.push('/admin')
        }
    },[])

        return (
            <div className="row">
                <div className="col-lg-2">
                    <SideBar/>
                </div>
                <div className="col-lg-10">
                    <ControlTabs
                        activeTab={props.store.activeTab}
                        //Modal Props
                        modalToggle={props.toggleModal}
                        isShowModal={props.store.isShowModal}
                        //Service props
                        fetchServices={props.fetchServices}
                        editService={props.editService}
                        deleteService={props.deleteService}
                        services={props.store.services}
                        //Slides Props
                        fetchSlides={props.fetchSlides}
                        slides={props.store.slides}
                        deleteSlide={props.deleteSlide}
                        //Accounts Props
                        fetchAccounts={props.fetchAccounts}
                        accounts={props.accountStore.accounts}
                        accountTab={props.accountStore.accountTab}
                        //Shipment
                        shipmentTab={props.shipmentStore.activeTab}
                        fetchShipments={props.fetchLabels}
                        deleteShipment={props.deleteLabel}
                        shipmentLabels={props.shipmentStore.shipmentLabels}
                    />
                </div>

            </div>
        )
}

const MapState = (state) => {
    return {
        store : state.Admin,
        accountStore: state.AccountManagement,
        shipmentStore: state.ShipmentManagement,
    }
}

const MapDispatch = dispatch => {
    return {
        toggleModal : (value) => dispatch(Actions.ToggleModal(value)),
        // Service Actions
        fetchServices : () => dispatch(Actions.FetchServiceHandler()),
        editService : (data) => dispatch(Actions.EditServiceHandler(data)),
        deleteService : (id,photo) => {
            if (confirm("Are you sure?"))
            dispatch(Actions.DeleteServiceHandler(id, photo))
        },
        //Slide Actions
        fetchSlides : () => dispatch(Actions.FetchSlidesHandler()),
        editSlide : (data) => dispatch(Actions.EditSlidesHandler(data)),
        deleteSlide : (id,bg,side) => {
            if (confirm("Are you sure ?"))
            dispatch(Actions.DeleteSlideHandler(id, bg, side))
        },
        //Accounts Actions
        fetchAccounts : () => dispatch(Actions.FetchAccountsHandler()),

        //Shipments Actions
        fetchLabels : (limit) => dispatch(FetchShipments(limit)),
        deleteLabel : (shipmentId) => {
            if (confirm("Are you sure ?"))
            dispatch(DeleteShipment(shipmentId))
        },
    }
}

export default connect(MapState,MapDispatch)(Admin);
