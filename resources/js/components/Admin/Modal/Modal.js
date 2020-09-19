import React from 'react';
import './Modal.css'
import PropTypes from 'prop-types'

const Modal = (props) =>{
    const styles = {
        modalSize:{
            width:props.modalWidth || "30%"
        }
    }
    return (
        <div className="myModal" >
            <div className="modal-content" id='modal-content' style={styles.modalSize}>
                <div className="modal-header">
                    <span>{props.title || ''}</span>
                    <span className="close" onClick={props.closeModal}>&times;</span>
                </div>

                <div className="modal-body">
                    {props.children}
                </div>

            </div>
        </div>
    )
}

Modal.propTypes ={
    title: PropTypes.string,
    closeModal: PropTypes.func,
    modalWidth: PropTypes.string,
}

export default Modal;
