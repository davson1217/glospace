import React,{useEffect} from 'react';
import PropTypes from 'prop-types';

const UserDetails = props =>{

    useEffect(()=>{
        // console.log("POOP",props.user)
    },[])

    let user = "Loading";

    if (Object.keys(props.user)){
        user = (
            <div className="col-sm-12">
                <div className="row">
                    {/* Client Information*/}
                    <div className="col-sm-6 p-2 client-info container">
                        <span id="user-wrap">
                            <img src={"/img/user.svg"} alt="GS" width={20} className="mr-2"/> {props.user.name}
                            <ul style={{listStyle:"none"}} className="mt-2">
                                <li><span><img src={"/img/cpu.svg"} alt="GS" width={20} className="mr-2"/> {props.user.gs_number}</span></li>
                                <li><span><img src={"/img/map.svg"} alt="map" width={20} className="mr-2"/> {props.user.country}</span></li>
                                <li><span><img src={"/img/home.svg"} alt="home" width={20} className="mr-2"/> {props.user.address}</span></li>
                                <li>
                                    <span><img src={"/img/smartphone.svg"} alt="phone" width={20}/> {!props.user.country ? "" : props.user.country=== "Georgia"?'+995':'+234'}{props.user.phone}</span>
                                </li>
                            </ul>
                        </span>
                    </div>
                    {/*Client's Glospace Information */}
                    <div className="col-sm-5 gs-info">
                       <span id="user-gs-wrap">
                            <img src={"/img/buildings.svg"} alt="GS" width={20} className="mr-2"/> Your Glospace
                           <ul style={{listStyle:"none"}} className="mt-2">
                                <li>
                                    <span><img src={"/img/gs-loc.svg"} alt="home" width={20} className="mr-2"/>
                                        MERAB KOSTAVA 26 FLOOR 5, FLAT 14
                                    </span>
                                </li>
                                <li><span><img src={"/img/worldwide.svg"} alt="country" width={20} className="mr-2"/> Tbilisi, Georgia</span></li>
                                <li><span><img src={"/img/telephone.svg"} alt="phone" width={20} className="mr-2"/> +995 591 880 567</span></li>
                            </ul>
                        </span>
                    </div>
                </div>

            </div>
        )
    }
    return user;

}

UserDetails.propTypes ={
    user:PropTypes.object
}

export default UserDetails;
