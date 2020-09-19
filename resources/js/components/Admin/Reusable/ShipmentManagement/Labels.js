import React from 'react';
import PropTypes from 'prop-types'

const Labels = props => {
    return (
        <div>

            <div className="row mt-2">
                <div className="col-sm-4">
                    <div className="card bg-dark text-white" style={{cursor:"pointer"}} onClick={()=>props.onLabelClick(props.label)}>
                        <div className="card-body text-center">

                            <div className="row">
                                <div className="col-sm-12">
                                    <h6>{props.label.tracking_number}</h6>
                                </div>
                                <div className="col-sm-12">
                                    <small>{props.label.package_description}</small>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

Labels.propTypes = {
    onLabelClick: PropTypes.func,
    trackingNumber: PropTypes.string,
    packageDesc: PropTypes.string,
    label: PropTypes.object,
}

export default Labels;
