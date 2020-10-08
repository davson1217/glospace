import React from 'react'
import {NavLink} from "react-router-dom";

const ContactBanner =()=>{
    return (
        <div className="row">
            <div className="col-sm-10">
                <p className='text-light'>CONTACT US NOW TO GET QUOTE FOR ALL YOUR GLOBAL SHIPPING NEEDS</p>
            </div>
            <div className="col-sm-2">
                <button className="text-light p-1" style={{backgroundColor:"#DD500A", width:"100px"}}>
                    <NavLink to={'/contact'} className={'text-light'} style={{textDecoration:'none'}}> Contact </NavLink>
                </button>
            </div>
        </div>
    )
}

export default ContactBanner;
