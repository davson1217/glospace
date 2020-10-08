import React,{useEffect} from 'react';
import './Css/Modal.css'
import {connect} from 'react-redux'
const SideModal = props =>{
    useEffect(()=> {
        if (props.modal){
            document.getElementById('trigger-btn').click()
        }
    },[])
    return (
        <div className="container demo">
            <div className="text-center" style={{display:"none"}}>
                <button type="button" id="trigger-btn" className="btn btn-demo" data-toggle="modal" data-target="#exampleModal">
                    Sidebar Modal
                </button>
            </div>
            <div className="modal left fade" id="exampleModal" tabIndex="" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="nav flex-sm-column flex-row">
                                <a className="nav-item nav-link active" href="#">Home</a>
                                <a href="#" className="nav-item nav-link">Link</a>
                                <a href="#" className="nav-item nav-link">Link</a>
                                <a href="#" className="nav-item nav-link">Link</a>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={props.closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
const MapState = state =>{
    return {
        // modal: state.Modal
    }
}

const MapDispatch = dispatch =>{
    return{

    }
}

export default connect(MapState,MapDispatch)(SideModal);
