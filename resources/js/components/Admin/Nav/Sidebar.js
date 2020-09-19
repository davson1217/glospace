import React from 'react';
import './SideBar.css'
import {connect} from "react-redux";
import * as Actions from "../../Redux/Actions/AdminActions";
import * as ShipmentActions from "../../Redux/Actions/ShipmentActions";
const SideBar = props =>{

        let style ={

        }
        let actTabColor = props.accountStore.accountTab === "All" && props.admin.activeTab ==="Accounts"? "yellow" : null
        let accountTabs = props.admin.activeTab === "Accounts"?
                    (<div>
                        <span onClick={()=>props.navigateAccountTabs("All")}>All</span>
                        <span onClick={()=>props.navigateAccountTabs("Verified")}>Verified</span>
                        <span onClick={()=>props.navigateAccountTabs("Unverified")}>Unverified</span>
                    </div> )
            : null
        let shipmentTabs = props.admin.activeTab === "Shipment"? (
            <div>
                <span onClick={()=>props.navigateShipmentTab("Create")}>Create</span>
                <span onClick={()=>props.navigateShipmentTab("Manage")}>Manage</span>
            </div>
            ): null;

        let classes = [];
                if (props.admin.activeTab === "About"){
                    classes.push("activeTab")
                }else classes.pop();
                if (props.admin.activeTab=== "Services"){
                    classes.push("active")
                }else classes.pop();
                if (props.admin.activeTab === "Slides"){
                    classes.push("active")
                }else classes.pop();
                if (props.admin.activeTab === "Accounts"){
                    classes.push("active")
                }else classes.pop();
        return (
            <div className="sidebar">
                {/*<span onClick={()=>props.navigateMenu("Home")}>Home</span>*/}
                <div><img src={"/img/GS.png"} alt="" width={50} /></div>
                <span onClick={()=>props.navigateMenu("About")} className={classes.join(" ")}>About</span>
                <span onClick={()=>props.navigateMenu("Services")} className={classes.join(" ")}>Services</span>
                <span onClick={()=>props.navigateMenu("Slides")} className={classes.join(" ")}>Slides</span>
                <hr/>
                <div onClick={()=>props.navigateMenu("Accounts")} className="accounts-tab">
                    Accounts {/*{accountTabs}*/}
                </div>
                <div onClick={()=>props.navigateMenu("Shipment")}>
                    Shipment
                    {shipmentTabs}
                </div>
            </div>
        )
}

const MapState = state =>{
    return {
        admin : state.Admin,
        accountStore: state.AccountManagement
    }
}

const MapDispatch = dispatch => {
    return {
        navigateMenu : (tab) => dispatch(Actions.NavigateMenu(tab)),
        navigateAccountTabs : (tab) => dispatch(Actions.NavigateAccountTabs(tab)),
        navigateShipmentTab : (tab) => dispatch(ShipmentActions.NavigateShipmentTab(tab)),
    }
}

export default connect(MapState,MapDispatch)(SideBar);
