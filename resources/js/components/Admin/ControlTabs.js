import React from 'react';
import AboutTab from "./AboutTab";
import PropTypes from 'prop-types'
import ServicesTab from "./ServicesTab";
import SlidesTab from "./SlidesTab";
import AccountsTab from "./AccountsTab";
import VerifiedAccount from "./Reusable/AccountManagement/VerifiedAccounts";
import UnVerifiedAccounts from "./Reusable/AccountManagement/UnVerifiedAccounts";
import CreateShipmentTab from "./CreateShipmentTab";

const ControlTabs = props =>{

    let ActiveTab = <AboutTab/>

    switch (props.activeTab) {
        case "Services":
            ActiveTab = <ServicesTab
                toggleModal={props.modalToggle}
                isShowModal={props.isShowModal}
                fetchServices={props.fetchServices}
                serviceList={props.services}
                editService={props.editService}
                deleteService={props.deleteService}
            />;
            break;
        case "Slides":
            ActiveTab = <SlidesTab
                toggleModal={props.modalToggle}
                isShowModal={props.isShowModal}
                fetchSlides={props.fetchSlides}
                slides = {props.slides}
                deleteSlide={props.deleteSlide}
            />;
            break;
        case "About":
            ActiveTab = <AboutTab/>;
            break;
        case "Accounts":
            if (props.accountTab === "All"){
                ActiveTab = <AccountsTab
                    fetchAccounts={props.fetchAccounts}
                    accounts={props.accounts}
                />;
            }else if (props.accountTab === "Verified"){
                ActiveTab = <VerifiedAccount/>
            }else if (props.accountTab === "UnVerified"){
                ActiveTab = <VerifiedAccount/>
            }else ActiveTab = <UnVerifiedAccounts/>
            break;

        case "Shipment":
            if (props.shipmentTab === "Create"){
                ActiveTab = <CreateShipmentTab
                    labelClick={props.modalToggle}
                    isShowModal={props.isShowModal}
                    fetchShipments={props.fetchShipments}
                    shipments = {props.shipmentLabels}
                />
            }else ActiveTab = <h4>Create Tab </h4>

                break;
        default: alert("UNKNOWN ERROR");
    }

    return ActiveTab;
}

ControlTabs.propTypes = {
    activeTab: PropTypes.string,
    modalToggle: PropTypes.func,
    isShowModal: PropTypes.bool,
    //services
    services: PropTypes.array,
    deleteService: PropTypes.func,
    //slides
    slides: PropTypes.array,
    //accounts
    accounts: PropTypes.array,
    accountTab: PropTypes.string,
    //shipment
    shipmentTab: PropTypes.string,
    fetchShipments: PropTypes.func,
}

export default ControlTabs;
