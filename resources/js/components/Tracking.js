import React, {useEffect} from 'react';
import PageIntro from "./Reusable/PageIntro";
import Footer from "./Reusable/Footer";
import NavigationMenu from "./Reusable/Navigation";
import {NavLink} from "react-router-dom";

const TrackShipment = props =>{
    useEffect(()=>{
        document.title = "Glospace | Tracking"
    })
    return (
        <div style={{height:'100vh'}}>
            <NavigationMenu/>
            <PageIntro background={'/img/bg-subheader-tracking.jpg'} title={"Track Shipment"} description={"Track Shipment"}/>

            <main className="container">
                <div className="text-center mt-5">
                    <span>Please <b><NavLink to={'/login'}>Login or Register</NavLink></b> to continue with tracking a shipment from your Glospace dashboard.</span>
                </div>
                {/*  <div className="row">
                    <div className="col-sm-12">
                        <form className="mt-5">
                            <div className="row">
                                <div className="col-sm-12 d-flex justify-content-center align-items-center">
                                    <input type="text" placeholder={"Consignment Number"} style={{width:"50%",height:"40px"}}/>
                                </div>
                                <div className="col-sm-12 mt-3 text-center">
                                    <button className="btn btn-success" disabled={true} style={{width:"120px",height:"40px"}}>Track</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>*/}
            </main>

            {/*<Footer/>*/}
        </div>
    )
}

export default TrackShipment;
