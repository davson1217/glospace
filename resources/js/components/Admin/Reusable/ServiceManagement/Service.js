import React from 'react';
import PropTypes from 'prop-types';

const Service = props =>{

    return (
        <div className="col-sm-12 col-lg-3 service text-center">
            <div className="row">

                <div className="col-sm-12 service-pic" style={{height: "120px"}}>
                    <img src={`/storage/services/${props.servicePhoto}`} alt={"service image"} style={{width:"100%"}}/>
                </div>

                <div className="col-sm-12">
                    <h5>{props.title}</h5>
                </div>

                <div className="col-sm-12">
                    <p>{props.description}</p>
                </div>
                <div className="col-sm-12 text-center d-flex justify-content-between">
                    {/*<button className="btn btn-warning" onClick={null} disabled={true}>EDIT</button>*/}
                    <button className="btn btn-danger" onClick={()=>props.deleteService(props.serviceId,props.servicePhoto)}>DELETE</button>
                </div>
            </div>
        </div>
    )
}

Service.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    servicePhoto: PropTypes.string,
    serviceId: PropTypes.number,
    deleteService: PropTypes.func,
    editService: PropTypes.func,
}

export default Service
