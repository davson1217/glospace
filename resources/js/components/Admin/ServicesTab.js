import React, {useEffect} from 'react';
import Modal from "./Modal/Modal";
import AddService from "./AddService";
import Service from "./Reusable/ServiceManagement/Service";
import PropTypes from 'prop-types'

const ServicesTab = (props) =>{

    useEffect(()=>{
        props.fetchServices()
    },[])
    let services = (
        <div className="no-service text-center d-flex justify-content-center align-items-center" style={{height:"70vh", width:"100%"}}>
            <h4>No services added to Global Space</h4>
        </div>
    )
    if (Object.keys(props.serviceList).length){
        services = props.serviceList.map((item,index)=>{
            return <Service
                title={item.title}
                description={item.description}
                key={index}
                serviceId={item.id}
                deleteService={props.deleteService}
                servicePhoto={item.photo}
            />
        })
    }

    return(
        <div>
            <div className="row">

                <div className="col-sm-12 mt-2">
                    <button className="btn btn-dark" onClick={()=>props.toggleModal()}>
                        Add Service
                    </button>
                </div>

                <div className="col-sm-12 mt-5">
                    <div className="row"> {services}  </div>
                </div>
            </div>
            {props.isShowModal?
                <Modal title={"Add Service"} closeModal={props.toggleModal}>
                    <AddService/>
                </Modal>
            :
            null}
        </div>
    )
}

ServicesTab.propTypes ={
    isShowModal: PropTypes.bool,
    toggleModal: PropTypes.func,
    fetchServices: PropTypes.func,
    serviceList : PropTypes.array,
    editService: PropTypes.func,
    deleteService: PropTypes.func,

}

export default ServicesTab;
