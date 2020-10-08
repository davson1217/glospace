import React from 'react';
import './Modal.css'
import PropTypes from 'prop-types'

const Modal = (props) =>{
    const styles = {
        modalPosition:{paddingTop: props.modalPosition || "3%"},
        modalHeader:{backgroundColor: props.headerColor ||'black'},
        modalSize:{width:props.modalWidth || "30%", height:props.modalHeight || "90vh",}
    }
    return (
        <div className="myModal" style={styles.modalPosition}>
            <div className="modal-content" id='modal-content' style={styles.modalSize}>
                <div className="modal-header" style={styles.modalHeader}>
                    <span>{props.title || ''}</span>
                    <span className="close" onClick={()=>props.closeModal(props.shipmentLabel)}>&times;</span>
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
    headerColor: PropTypes.string,
    modalHeight: PropTypes.string,
    modalPosition: PropTypes.string,
    shipmentLabel: PropTypes.string,
}

export default Modal;
