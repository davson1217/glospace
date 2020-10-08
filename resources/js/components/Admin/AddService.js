import React, {useEffect} from 'react'
import {AddServiceHandler, InputHandler} from "../Redux/Actions/AdminActions";
import {connect} from 'react-redux'
import './Styles/AddService.css'

const AddService = props => {

    useEffect(()=>{
        console.log(props.service.servicePhoto)
    },[props.service.servicePhoto])

    const fd = new FormData();
    fd.append("title", props.service.title);
    fd.append("description", props.service.description);
    fd.append("file", props.service.servicePhoto);

    return (
        <div>
            <form onSubmit={(e)=>props.addService(e,fd)}>
                <div className="row">
                    <div className="col-sm-12 input-wrapper mt-2">
                        <input type="file" placeholder={"Service Picture"} onChange={(e)=>props.inputHandler("servicePhoto",e,"Services")}/>
                    </div>
                    <div className="col-sm-12 input-wrapper mt-2">
                        <input type="text" placeholder={"Service Title"} value={props.service.title} onChange={(e)=>props.inputHandler("title",e,"Services")}/>
                    </div>
                    <div className="col-sm-12 input-wrapper mt-2">
                        <textarea placeholder={"Service Description"} value={props.service.description} onChange={(e)=>props.inputHandler("description",e,"Services")}/>
                    </div>
                    <div className="col-sm-12">
                        <button className="btn btn-dark"
                            disabled={!props.service.title || !props.service.description || !props.service.servicePhoto}
                        >Add Service</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

const MapState = state =>{
    return {
        service: state.Admin
    }
}

const MapDispatch = dispatch =>{
    return {
        inputHandler: (name,event,component) => dispatch(InputHandler(name,event,component)),
        addService : (e,data) => {
            e.preventDefault();
            dispatch(AddServiceHandler(data))
        }
    }
}
export default connect(MapState,MapDispatch)(AddService);
