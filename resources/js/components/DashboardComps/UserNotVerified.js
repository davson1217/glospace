import React from 'react';
import Loader from "react-loader-spinner";
import PropTypes from 'prop-types';

const UserNotVerified = props =>{
    let display;
    if (props.sendingMail && !props.sentMail){
        display = <div className="text-center"><Loader type="ThreeDots" color="black" height={100} width={100}/></div>
    }else if (props.sentMail){
        display = <div className="text-center"><h6 className="text-success">We sent another email. Please verify your email address</h6></div>
    }else
        display =(
            <div className='text-center'>
                <h6 className="text-danger">Please verify your email to use this feature. <br/>
                    <span className='text-primary' style={{cursor:'pointer',fontFamily:'serif', fontSize:'15px'}}
                          onClick={props.resendVerification}>
                        Request new verification Email
                </span>
                </h6>
            </div>
        )
    return display
}

UserNotVerified.propTypes ={
    sendingMail: PropTypes.bool,
    sentMail: PropTypes.bool,
    resendVerification: PropTypes.func,
}

export default UserNotVerified;
