import  React from 'react';
import PropTypes from 'prop-types'
export const Register = props => {
        const styles = {
            RegisterContainer : {
                border:"1px solid lightgrey",
                width : "500px",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                backgroundColor:"white"
            },
            switchBtn:{
                cursor:"pointer",
                color:"blue"
            }
        }
        return (
            <div style={styles.RegisterContainer}>
                <form className="mt-1 p-3">
                    <div className="text-center" style={null}>
                        <h5>Create a GlobalSpace account</h5>
                    </div>
                    <div className="row mt-2">
                        <div className="col-sm-12 text-center">
                            <div className="row">
                                <div className="col-sm-6">
                                    <input type="text" placeholder={"First Name"} style={{width:"100%",height:"30px"}}/>
                                </div>
                                <div className="col-sm-6">
                                    <input type="text" placeholder={"Last Name"} style={{width:"100%",height:"30px"}}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 text-center mt-2">
                            <input type="email" placeholder={"Email Address"} style={{width:"100%",height:"30px"}}/>
                        </div>
                        <div className="col-sm-12 text-center mt-2">
                            <input type="password" placeholder={"Password"} style={{width:"100%",height:"30px"}}/>
                        </div>
                        <div className="col-sm-12 text-center mt-2">
                            <input type="password" placeholder={"confirm password"} style={{width:"100%",height:"30px"}}/>
                        </div>
                        <div className="col-sm-12 mt-3 text-center">
                            <button className="btn btn-success" disabled={true} style={{width:"120px",height:"40px"}}>Register</button>
                        </div>
                    </div>
                </form>
                <div className="register text-right p-2">
                    <span style={styles.switchBtn} onClick={()=>props.switchPage("LOGIN")}>Login</span>
                </div>
            </div>
        )
}

Register.propTypes = {
    switchPage: PropTypes.func
}

export default Register;
