import React from 'react';
import {connect} from "react-redux";
import {SwitchLoginPage} from "../Redux/Actions/LayoutActions";
import {NavLink} from 'react-router-dom'
const ResetPassword = (props) => {

    let GSN = props.match.params.gsNumber;
    return (
        <div style={{height:"100%", backgroundColor:"#f7f7f7"}}>

            <nav className="navbar navbar-expand-sm auth-nav">
                <span className="navbar-brand">
                    <img src={"/img/GS.png"} alt="logo" width={60}/>
                </span>
            </nav>

            <div className="mt-5">
                {props.reset.changed ?
                    <div className="text-center mb-2">
                        <span className="text-success">Your password was reset successfully</span><br/>
                        <span>You may now <NavLink to={'/login'} className="text-primary" style={{cursor:'pointer'}}>
                            <b>Login</b></NavLink> with your new password
                        </span>
                    </div> : null
                }
                <form className="text-center" onSubmit={e=>{e.preventDefault();props.resetPassword(props.reset.password,GSN)}}>
                    <div>
                        <span className="text-danger">*
                            <label htmlFor="email">Enter new password</label>
                        </span><br/>
                        <input type="password" placeholder={""} style={{width:"250px"}}
                                onChange={e=>props.passInputHandler("password",e.target.value)}
                                value={props.reset.password}/>
                    </div>
                    <div>
                        <span className="text-danger">*
                            <label htmlFor="email">Confirm password</label>
                        </span><br/>
                        <input type="password" placeholder={""} style={{width:"250px"}}
                               onChange={e=>props.passInputHandler('confirm',e.target.value)}
                               value={props.reset.confirmPassword}/>
                    </div>

                    <div className="mt-2">
                        <button disabled={!props.reset.password || !props.reset.confirmPassword ||
                         props.reset.password !== props.reset.confirmPassword } className='btn btn-dark'>Reset Password</button>
                    </div>

                </form>
            </div>

        </div>
    )
}

const MapState = state =>{
    return {
        reset: state.Registration.passChange
    }
}

const MapDispatch = dispatch =>{
    return {
        passInputHandler : (name,value)=>{
            dispatch({
                type : "NEW_PASSWORD",
                payload:{name,value}
            })
        },
        resetPassword : (password,GSN)=>{
            axios.post('/api/changePassword',{password,GSN}).
            then(res=>{
                if (res.data.success){
                    dispatch({type:"PASSWORD_CHANGED"})
                }
            }).catch(err=>{})
        }
    }
}

export default connect(MapState,MapDispatch)(ResetPassword)
