import React from 'react';
import './SideBar.css'
import {connect} from "react-redux";
import * as Actions from "../../Redux/Actions/AdminActions";
import * as ShipmentActions from "../../Redux/Actions/ShipmentActions";
const SideBar = props =>{

        let styles ={
            activeStyle:{
                backgroundColor:"black",
                color:"white"
            },

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
            <div className="shipment-tabs-wrap">
                <span onClick={()=>props.navigateShipmentTab("Create")}
                    style={{backgroundColor:props.activeShipmentTab === "Create" ? "black" : null,
                            color:props.activeShipmentTab === "Create" ? "#DD500A" : "white"}
                    }>
                    Create
                </span>
                <span onClick={()=>props.navigateShipmentTab("Manage")}
                      style={{backgroundColor:props.activeShipmentTab === "Manage" ? "black" : null,
                          color:props.activeShipmentTab === "Manage" ? "#DD500A" : "white"}
                      }
                >
                    Manage
                </span>
            </div>
            ): null;

        return (
            <div className="sidebar">
                {/*<span onClick={()=>props.navigateMenu("Home")}>Home</span>*/}
                <div><img src={"/img/GS.png"} alt="" width={80} /></div>
                <span onClick={()=>props.navigateMenu("About")} className="admin-nav-menu"
                      style={props.admin.activeTab === "About" ? styles.activeStyle : null}>
                    About
                </span>
                <span onClick={()=>props.navigateMenu("Services")} className="admin-nav-menu"
                      style={props.admin.activeTab === "Services" ? styles.activeStyle : null}>
                    Services
                </span>
                <span onClick={()=>props.navigateMenu("Slides")} className="admin-nav-menu"
                      style={props.admin.activeTab === "Slides" ? styles.activeStyle : null}>
                    Slides
                </span>
                <hr/>
                <div onClick={()=>props.navigateMenu("Accounts")} className="admin-nav-menu"
                     style={props.admin.activeTab === "Accounts" ? styles.activeStyle : null}>
                    Clients {/*{accountTabs}*/}
                </div>
                <div onClick={()=>props.navigateMenu("Invoice")} className="admin-nav-menu"
                     style={props.admin.activeTab === "Invoice" ? styles.activeStyle : null}>
                    Payments
                </div>
                <div onClick={()=>props.navigateMenu("Shipment")} className="admin-nav-menu"
                     style={props.admin.activeTab === "Shipment" ? styles.activeStyle : null}>
                    Shipment
                    {shipmentTabs}
                </div>
                <div className="text-danger">
                    <button className="btn btn-dark"  onClick={()=>{
                        localStorage.removeItem("adminToken");
                        location="/gezwiz"
                    }} >Logout</button>
                </div>
            </div>
        )
}

const MapState = state =>{
    return {
        admin : state.Admin,
        accountStore: state.AccountManagement,
        activeShipmentTab: state.ShipmentManagement.activeTab
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
