import React,{useState, useEffect} from 'react';
import './Css/Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import {faFacebook,faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import {NavLink,withRouter,Link} from 'react-router-dom'
import { Collapse, Navbar, NavbarToggler,NavbarBrand, Nav,  NavbarText} from 'reactstrap';
import PropTypes from 'prop-types';

const NavigationMenu = props => {
    useEffect(()=>{
       // console.log(props.topValue)
    },)

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

        const styles ={
            topNav:{
                backgroundColor: props.topValue > 100 || props.component !== "Home" ? "#DD500A" : "rgba(230, 230, 230,0.3)",
                // opacity: props.topValue > 100 ? "1" : "0.2",
                transition: "0.5s",
            },
            mainNav:{
                backgroundColor:"white",
                opacity: props.topValue > 100 || props.component !== "Home" ? "1" : "0.2",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                transition: "0.5s",

            },
            icons:{
                color: props.topValue > 100 || props.component !== "Home" ? "black" : "#DD500A",
                opacity: "1",
            },
            login:{
              textDecoration:"none",
                color: props.topValue > 100 || props.component !== "Home" ? "black" : null
            },
            navMenuItem:{
                fontWeight: "bold",
                color: props.topValue > 100 || props.component !== "Home" ? "black" : "blue",
            }
        }

        return (
            <div className="nav-container">

                <nav className="user-nav" style={styles.topNav}>
                    <ul>
                        <li className="list-icon-item right-item" style={{float:"right"}}>
                            <span style={{cursor:"pointer",color:"black", fontWeight:"bolder"}}>
                               <NavLink to="/login" className={"login-link"} style={styles.login}>Login | Register</NavLink>
                            </span>
                        </li>
                        <li className="list-icon-item">
                            <span>
                                 <a href="https://www.facebook.com/georgia2nigeria/" target="_blank" style={styles.icons} className="nav-icons">
                                     <FontAwesomeIcon icon={faFacebook}/>
                                 </a>
                            </span>
                        </li>
                        <li className="list-icon-item">
                            <span>
                                 <a href="https://www.linkedin.com/company/glopace-logistics-llc" target="_blank" style={styles.icons} className="nav-icons">
                                     <FontAwesomeIcon icon={faLinkedin}/>
                                 </a>
                            </span>
                        </li>
                        <li className="list-icon-item">
                            <span>
                                 <a href="https://www.instagram.com/p/CFxh9pmnftA/?igshid=1xh3wsu3f8njb" target="_blank" style={styles.icons} className="nav-icons"><FontAwesomeIcon icon={faInstagram}/></a>
                            </span>
                        </li>
                    </ul>
                </nav>

                <Navbar color={"light"} light expand="md" style={styles.mainNav}>

                    <NavbarText className="mr-3">
                        <NavLink to="/">
                            <img src={"/img/GS.png"} alt="" width={60}/>
                        </NavLink>
                    </NavbarText>

                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {/*<NavItem>*/}
                        {/*    <NavLink to="/services">Services</NavLink>*/}
                        {/*</NavItem>*/}
                    </Nav>

                    <NavbarText className="mr-3">
                        <NavLink style={styles.navMenuItem} to="/services">Services</NavLink>
                    </NavbarText>

                    <NavbarText className="mr-3">
                        <NavLink style={styles.navMenuItem} to="/about">About</NavLink>
                    </NavbarText>

                    <NavbarText className="mr-3">
                        <NavLink style={styles.navMenuItem} to="/track-shipment">Track Shipment</NavLink>
                    </NavbarText>

                    <NavbarText className="mr-3">
                        <NavLink style={styles.navMenuItem} to="/contact">Contact Us</NavLink>
                    </NavbarText>

                </Collapse>
            </Navbar>
            </div>
        )
}

NavigationMenu.propTypes = {
    topValue: PropTypes.number,
    component: PropTypes.string,
}

export default withRouter(NavigationMenu);
