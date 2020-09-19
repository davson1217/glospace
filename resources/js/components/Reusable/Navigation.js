import React,{useState, useEffect} from 'react';
import './Css/Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import {faFacebook,faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import {NavLink,withRouter,Link} from 'react-router-dom'
import { Collapse, Navbar, NavbarToggler,NavbarBrand, Nav,  NavbarText} from 'reactstrap';
import PropTypes from 'prop-types';

const NavigationMenu = props => {
    useEffect(()=>{
       // console.log(document.body.scrollTop)
    },[document.body.scrollTop])

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
        const styles ={
            topNav:{
                backgroundColor:"#e6e6e6",
                opacity: props.topValue > 100 ? "1" : "0.2"
            },
            mainNav:{
                backgroundColor:"white",
                opacity: props.topValue > 100 ? "1" : "0.2",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
            },
            icons:{
                color: props.topValue > 100 ? "blue" : "black",
                opacity: "1",
            },
            login:{
              textDecoration:"none",
              color:"white",
            },
            navMenuItem:{
                fontWeight: "bold",
                color: props.topValue > 100 ? "black" : "blue",
            }
        }
        return (
            <div className="nav-container">
                <nav className="user-nav" style={styles.topNav}>
                    <ul>
                        <li className="list-icon-item right-item" style={{float:"right"}}>
                            <span style={{cursor:"pointer",color:"black", fontWeight:"bolder"}}>
                               <NavLink to="/login" styles={styles.login}>Login | Register</NavLink>
                            </span>
                        </li>
                        <li className="list-icon-item">
                            <span>
                                 <NavLink to="/https://www.facebook.com" style={styles.icons}><FontAwesomeIcon icon={faFacebook}/></NavLink>
                            </span>
                        </li>
                        <li className="list-icon-item">
                            <span>
                                 <NavLink to="www.twitter.com" style={styles.icons}><FontAwesomeIcon icon={faTwitter}/></NavLink>
                            </span>
                        </li>
                        <li className="list-icon-item">
                            <span>
                                 <NavLink to="www.instagram.com" style={styles.icons}><FontAwesomeIcon icon={faInstagram}/></NavLink>
                            </span>
                        </li>
                    </ul>
                </nav>

                <Navbar color={"light"} light expand="md" style={styles.mainNav}>

                    <NavbarText className="mr-3">
                        <NavLink to="/">
                            <img src={"/img/GS.png"} alt="" width={50}/>
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
    topValue: PropTypes.number
}

export default withRouter(NavigationMenu);
