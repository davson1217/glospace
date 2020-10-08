import React from "react"
import {connect} from "react-redux";

const CreateSuperAdmin = props =>{
    return (
        <div className="container">
        <div className="card">
            <div className="card-body">
            <form onSubmit={e=>{e.preventDefault();
                props.createSuperSubmit(props.create.adminFirstName,props.create.adminLastName,props.create.emailAddress,props.create.password)
            }}>

                <div className="row mt-2">

                    {/* Given Names*/}
                    <div className="col-sm-12 text-center">

                        <div className="row">

                            <div className="col-sm-6 register-input-wrapper">
                                <input type="text"
                                       placeholder={`First Name`}
                                       onChange={(e)=>props.inputHandler(e, "adminFirstName")}
                                       autoFocus={'yes'}
                                       value={props.create.adminFirstName}
                                />
                            </div>

                            <div className="col-sm-6 register-input-wrapper">
                                <input type="text" placeholder={"Last Name"}
                                       onChange={(e)=>props.inputHandler(e,"adminLastName")}
                                       value={props.create.adminLastName}
                                />
                            </div>

                            <div className="col-sm-12 register-input-wrapper">
                                <input type="email" placeholder={"glospace email address"}
                                       onChange={(e)=>props.inputHandler(e,"emailAddress")}
                                       value={props.create.emailAddress}
                                />
                            </div>
                            <div className="col-sm-12 register-input-wrapper">
                                <input type="password" placeholder={"password"}
                                       onChange={(e)=>props.inputHandler(e,"password")}
                                       value={props.create.password}
                                />
                            </div>

                            <button type="submit">create</button>

                        </div>
                    </div>
                </div>

            </form>
            </div>
        </div>
        </div>
    )
}

const MapState = state =>{
    return {
        create : state.Admin.createSuper
    }
}

const MapDispatch = dispatch =>{
    return {
        inputHandler : (e,name) => dispatch({type:"CREATE_SUPER_INPUT",payload:{name,value:e.target.value}}),
        createSuperSubmit: (fName,lName,email,pass) =>{
            const fd = new FormData();
            let name = fName + " " + lName;fd.append('name',name);fd.append('email',email);fd.append('password',pass);
            axios.post('/api/createSuperAdmin',fd).
            then(res=>{
                if (res.data.success) dispatch({type:"SUPER_CREATED"})
            }).
            catch(err=>{})
        }
    }
}

export default connect(MapState,MapDispatch)(CreateSuperAdmin)
