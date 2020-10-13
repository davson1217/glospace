import React from 'react';
import PropTypes from 'prop-types';

const DashboardMenu = (props) => {
    return(
        <ul className="row dashboard-menu">
            <li className="col-sm-3 text-center" onClick={()=>props.navigateDashboard("Shipment")}
                style={{borderBottom:props.activeMenu === "Shipment" ? "2px solid black" : null}}>
                <img src={"/img/ship-icon.svg"} alt="shipments"/>
            </li>
            <li className="col-sm-3 text-center" onClick={()=>props.navigateDashboard("Invoice")}
                style={{borderBottom:props.activeMenu === "Invoice" ? "2px solid black" : null}}
            >
            <img src={"/img/invoice.svg"} alt="shipments"/></li>

            {/*<li className="col-sm-3 text-center" onClick={()=>props.navigateDashboard("Message")}
                style={{borderBottom:props.activeMenu === "Message" ? "2px solid black" : null}}
            >
                <img src={"/img/email.svg"} alt="shipments"/>
            </li>*/}

            <li className="col-sm-3 text-center" onClick={()=>props.navigateDashboard("Settings")}
                style={{borderBottom:props.activeMenu === "Settings" ? "2px solid black" : null}}>
                <img src={"/img/settings.svg"} alt="shipments"/>
            </li>

            <li className="col-sm-3 text-center" onClick={props.logout}>
                <img src={"/img/logout.svg"} alt="shipments"/>
            </li>
        </ul>
    )
}

DashboardMenu.propTypes = {
    navigateDashboard: PropTypes.func,
    logout: PropTypes.func,
    activeMenu : PropTypes.string
}

export default DashboardMenu
