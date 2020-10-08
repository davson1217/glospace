import  React from 'react';
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import * as ActionTypes from "../Redux/Actions/ActionTypes";
import Helper from "./Helper";
export const Register = props => {

        const emailPattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        let emailError
        if (props.email.length > 0)
        emailError = !emailPattern.test(props.email);

        let error = "";

        if (emailError){
            error = <div className="col-sm-12 text-center error-message">Please enter a valid email address</div>;
        }

        //disable btn conditions
        let disabled = !props.firstName || !props.lastName || !props.password || !props.confirmPass || !props.country || !props.state || !props.ID
            || !props.city || !props.address || !props.email || props.password !== props.confirmPass || !props.termsAgreed || emailError;

        //passwords match style indicator
        let passConfirmStyle = "1px solid grey";
        if (!props.confirmPass || props.password !== props.confirmPass){
            passConfirmStyle = "1px solid red"
        }

        let data = {
            name: props.firstName + " " + props.lastName,
            email:props.email,
            address: props.address,
            phone: props.phone,
            ID: props.ID,
            country: props.country,
            state: props.state,
            city: props.city,
            password: props.password,
            GS:`GS${ Math.floor(Math.random() * (100000000 - 1 + 1) ) + 1}`
        }

        let inputHelper = null;
        if (props.showHelper){
            switch (props.focusedInput) {
                case "givenNames": inputHelper= <Helper message={"Your Name(s) as they appear on your ID / Passport"}
                                                        color={props.firstName && props.lastName ? "green" : "red"}
                />;
                break;

                case "uniqueID": inputHelper= <Helper message={"Your Passport Number"} color={props.ID ? "green" : "red"}/>;
                break;

                case "country": inputHelper= <Helper message={"Your country of residence"} color={props.country ? "green" : "red"}/>;
                break;

                case "state": inputHelper= <Helper message={`The state you live in ${props.country}`} color={props.state ? "green" : "red"}/>;
                break;

                case "city": inputHelper= props.country === "Nigeria" ?
                            <Helper message={`Your town/city of residence in ${props.state}`} color={props.city ? "green" : "red"}/>:
                            <Helper message={`Your district of residence in ${props.state}`} color={props.city ? "green" : "red"}/>
                break;

                case "address": inputHelper= <Helper message={`Where do you live in ${props.city}`} color={props.address ? "green" : "red"}/>;
                break;

                case "phone": inputHelper= <Helper message={`Your active phone number`} color={props.phone ? "green" : "red"}/>;
                break;

                case "password": inputHelper= <Helper message={`Create a password for your account`} color={props.password ? "green" : "red"}/>;
                break;

                case "confirmPassword": inputHelper= <Helper message={`Verify password`} color={props.confirmPassword ? "green" : "red"}/>;
                break;

                default : inputHelper = null;
            }
        }

        let registerBtn = props.feedback.isSentAPI && props.feedback.requestingComp === "REGISTER_USER"?
            <button disabled>Please wait...<span className="spinner-border spinner-border-sm"/></button>:
            <button disabled={disabled} style={{width:"120px",height:"30px"}}>Register</button>

        return (
            <div className="register-container">
                <form className="mt-1 p-3" onSubmit={e=>props.registerUserHandler(e,data)}>

                    <div className="text-center mb-3 register-text-wrapper" style={null}>
                        <h5>Create a Glospace account</h5>
                    </div>

                    <div className="row mt-2">

                        {/* Given Names*/}
                        <div className="col-sm-12 text-center">
                            {props.focusedInput === "givenNames" ? inputHelper : null}
                            <div className="row">

                                <div className="col-sm-6 register-input-wrapper">
                                    <input type="text"
                                           placeholder={`Given Names`}
                                           style={{width:"100%",height:"30px", borderBottom: props.firstName ?"1px solid grey":"1px solid red"}}
                                           onChange={(e)=>props.inputHandler("firstName", e, "Register")} autoFocus={'yes'} value={props.firstName}
                                           onFocus={e=>props.inputFocus(e,"givenNames")}
                                           onBlur={ e=>props.inputFocus(e,"") }
                                    />
                                </div>

                                <div className="col-sm-6 register-input-wrapper">
                                    <input type="text" placeholder={"Last Name"}
                                           disabled={!props.firstName}
                                           style={{width:"100%",height:"30px", borderBottom: props.lastName ?"1px solid grey":"1px solid red"}}
                                           onChange={(e)=>props.inputHandler("lastName", e, "Register")} value={props.lastName}
                                           onFocus={e=>props.inputFocus(e,"givenNames")}
                                          onBlur={e=>props.inputFocus(e,"") }
                                    />
                                </div>

                            </div>
                        </div>

                        {/* Location */}
                        <div className="col-sm-12 text-center mt-2">
                            {props.focusedInput === "state" || props.focusedInput === "city" ? inputHelper : null}
                            <div className="row">
                                <div className="col-sm-4 register-input-wrapper">
                                    <select name="country" id="country-select" style={{width:"100%",height:"30px"}}
                                            value={props.country}
                                            onChange={e=>props.inputHandler("country",e,"Register")}
                                            disabled={!props.lastName}
                                            onFocus={e=>props.inputFocus(e,"country")}
                                            onBlur={ e=>props.inputFocus(e,"") }
                                    >
                                        <option value="">country of residence</option>
                                        <option value="Georgia">Georgia</option>
                                        <option value="Nigeria">Nigeria</option>
                                    </select>
                                </div>

                                <div className="col-sm-4 register-input-wrapper">
                                    <input type="text" placeholder={"State"}
                                           style={{width:"100%",height:"30px", borderBottom: props.state ?"1px solid grey":"1px solid red"}}
                                           onChange={e=>props.inputHandler("state", e , "Register")}
                                           value={props.state} disabled={!props.country}
                                           onFocus={e=>props.inputFocus(e,"state")}
                                           onBlur={ e=>props.inputFocus(e,"") }
                                    />
                                </div>

                                <div className="col-sm-4 register-input-wrapper">
                                    <input type="text"
                                           placeholder={!props.country ? "" : props.country === "Nigeria" ? "City/Town" : "District"}
                                           style={{width:"100%",height:"30px", borderBottom: props.city ?"1px solid grey":"1px solid red"}}
                                           onChange={e=>props.inputHandler("city", e , "Register")}
                                           onFocus={e=>props.inputFocus(e,"city")}
                                           onBlur={ e=>props.inputFocus(e,"") }
                                           value={props.city} disabled={!props.state}/>
                                </div>
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div className="col-sm-12 text-center mt-2 register-input-wrapper">
                            {props.focusedInput === "phone" ? inputHelper : null}
                            <div className="row">
                                <div className="col-sm-1 mr-2 text-center">
                                    <input type="button" disabled={true} value={props.country === "" ? "+000": props.country==="Nigeria" ? "+234" : "+995"}/>
                                </div>
                                <div className="col-sm-10 register-input-wrapper">
                                    <input type="text"
                                           placeholder={"Phone Number"}
                                           style={{width:"100%",height:"30px", borderBottom: props.phone ?"1px solid grey":"1px solid red"}}
                                           onChange={e=>props.inputHandler("phone", e , "Register")}
                                           disabled={!props.city}
                                           value={props.phone}
                                           onFocus={e=>props.inputFocus(e,"phone")}
                                           onBlur={ e=>props.inputFocus(e,"") }
                                    />
                                </div>
                            </div>
                        </div>

                        {/*Unique ID*/}
                        <div className="col-sm-12 text-center mt-2 register-input-wrapper">
                            {props.focusedInput === "uniqueID" ? inputHelper : null}
                            <input type="text"
                                   placeholder={"Unique ID"}
                                   style={{width:"100%",height:"30px", borderBottom: props.ID ?"1px solid grey":"1px solid red"}}
                                   onChange={e=>props.inputHandler("ID", e , "Register")}
                                   value={props.ID}
                                   disabled={!props.phone}
                                   onFocus={e=>props.inputFocus(e,"uniqueID")}
                                   onBlur={e=>props.inputFocus(e,"")}
                            />
                        </div>

                        {/*Address*/}
                        <div className="col-sm-12 text-center mt-2 register-input-wrapper">
                            {props.focusedInput === "address" ? inputHelper : null}
                            <input type="text"
                                   placeholder={"Address One"}
                                   style={{width:"100%",height:"30px", borderBottom: props.address ?"1px solid grey":"1px solid red"}}
                                   onChange={e=>props.inputHandler("address", e , "Register")}
                                   disabled={!props.ID}
                                   value={props.address}
                                   onFocus={e=>props.inputFocus(e,"address")}
                                   onBlur={ e=>props.inputFocus(e,"") }
                            />
                        </div>

                        {/*Address Two*/}
                        <div className="col-sm-12 text-center mt-2 register-input-wrapper">
                            <input type="email" placeholder={"Address Two"} style={{width:"100%",height:"30px"}}
                                onChange={e=>props.inputHandler("addressTwo", e , "Register")} value={props.addressTwo}
                                   onFocus={e=>props.inputFocus(e,"addressTwo")}
                                   onBlur={ e=>props.inputFocus(e,"") }
                            />
                        </div>

                        {/* Email Address */}
                        <div className="col-sm-12 text-center mt-2 register-input-wrapper">
                            {error}
                            <input type="email"
                                   placeholder={"Email Address"}
                                   style={{width:"100%",height:"30px", borderBottom: props.email ?"1px solid grey":"1px solid red"}}
                                  onChange={e=>props.inputHandler("email", e , "Register")}
                                   disabled={!props.address}
                                   onFocus={e=>props.inputFocus(e,"email")}
                                   onBlur={ e=>props.inputFocus(e,"") }
                                   value={props.email}/>
                        </div>

                        {/* Password */}
                        <div className="col-sm-12 text-center mt-2 register-input-wrapper">
                            {props.focusedInput === "password" ? inputHelper : null}
                            <input type="password"
                                   placeholder={"Password"}
                                   disabled={!props.email || emailError}
                                   style={{width:"100%",height:"30px", borderBottom: props.password ?"1px solid grey":"1px solid red"}}
                                    onChange={e=>props.inputHandler("password", e , "Register")} value={props.password}
                                   onFocus={e=>props.inputFocus(e,"password")}
                                   onBlur={ e=>props.inputFocus(e,"") }
                            />
                        </div>

                        <div className="col-sm-12 text-center mt-2 register-input-wrapper">
                            {props.focusedInput === "confirmPassword" ? inputHelper : null}
                            <input type="password"
                                   placeholder={"confirm password"}
                                   disabled={!props.password}
                                   style={{width:"100%",height:"30px", borderBottom: passConfirmStyle}}
                                   onChange={e=>props.inputHandler("confirmPass", e , "Register")}
                                   onFocus={e=>props.inputFocus(e,"confirmPass")}
                                   onBlur={ e=>props.inputFocus(e,"") }
                                   value={props.confirmPass}/>
                        </div>

                        <div className="col-sm-12 mt-2 register-input-wrapper d-flex">
                            <span className="text-danger mr-1">* </span>
                            <label htmlFor="termsAgreed" id="termsAgreed" style={{color:props.termsAgreed?"green" : "red"}}>
                                <input type="checkbox" className="mr-2" name="termsAgreed" id="termsAgreed" onChange={e=>props.inputHandler("termsAgreed", e , "Register")}
                                       checked={props.termsAgreed}/>
                                  Please verify that you've read and agreed to our
                                <a href={'/legal/Terms&Conditions.pdf'} target={'_blank'} className="text-primary ml-1" style={{cursor:'pointer'}}> Terms & Conditions</a> as well as our <a href={'/legal/privacy.pdf'} target={'_blank'} className="text-primary" style={{cursor:'pointer'}}>Privacy Policy</a> by checking the box.
                            </label>
                        </div>

                        <div className="col-sm-12 mt-3 register-submit-wrapper text-center">
                            {registerBtn}
                        </div>

                    </div>
                </form>

                <div className="login-btn-wrapper text-right p-2">
                    <span onClick={()=>props.switchPage("LOGIN")}>Login to your account</span>
                </div>
            </div>
        )
}

Register.propTypes = {
    switchPage: PropTypes.func,
    inputHandler: PropTypes.func,
    registerUserHandler: PropTypes.func,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    address: PropTypes.string,
    addressTwo: PropTypes.string,
    country: PropTypes.string,
    phone: PropTypes.string,
    ID: PropTypes.string,
    state: PropTypes.string,
    city: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    confirmPass: PropTypes.string,
    termsAgreed: PropTypes.bool,
    focusedInput: PropTypes.string,
    showHelper: PropTypes.bool,
}

const MapState = state =>{
    return {
        feedback : state.Feedback
    }
}

const MapDispatch = dispatch =>{
    return {
        inputFocus : (event,name) => {
            dispatch({
                type : ActionTypes.INPUT_FOCUS,
                payload:{name}
            })
        }
    }
}

export default connect(MapState,MapDispatch)(Register);
