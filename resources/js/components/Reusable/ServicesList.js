import React, {useEffect} from 'react';
import PropTypes from 'prop-types'

const ServicesList = props =>{

    useEffect(()=>{
      //  console.log(props)
    },[])

    const styles={
        textHead:{
            fontSize: '22px'
        },
        text:{
            fontSize:"14px",
            color:"#5c5a5a"
        }
    }

    return(
        <div className="container">
        <div className="row">

            <div className="col-sm-12 col-md-2 col-lg-3 service" onClick={null/*()=>props.viewService()*/}>
                <div className="row">
                    <div className="service-title col-sm-12 mb-5">
                        <h6 style={styles.textHead}>Air Freight</h6>
                        <div className="text-center">
                            <p className='text-center'/>
                        </div>
                    </div>
                    <div className="service-image col-sm-12">
                        <img src={"/img/flight.png"} alt="" style={{width:"100%"}}/>
                    </div>
                    <div className="service-desc col-sm-12">
                        <p style={styles.text}>
                            What we can do for you? We take care of all kind of air freights shipments using Door to Door whole solutions.
                        </p>
                    </div>
                </div>
            </div>

            <div className="col-sm-12 col-md-2 col-lg-3 service">
                <div className="row">
                    <div className="service-title col-sm-12 mb-5">
                        <h6 style={styles.textHead}>Ocean Fright</h6>
                        <div className="text-center">
                            <p className='text-center'/>
                        </div>
                    </div>
                    <div className="service-image col-sm-12">
                        <img src={"/img/ship.png"} alt="" style={{width:"100%"}}/>
                    </div>
                    <div className="service-desc col-sm-12">
                        <p style={styles.text}>
                            From International transportation of goods to Departures from the most important ports we have close collaborations with the leading maritime operators also counselling
                        </p>
                    </div>
                </div>
            </div>

            <div className="col-sm-12 col-md-2 col-lg-3 service">
                <div className="row">
                    <div className="service-title col-sm-12 mb-5">
                        <h6 style={styles.textHead}>Warehousing</h6>
                        <div className="text-center">
                            <p className='text-center'/>
                        </div>
                    </div>
                    <div className="service-image col-sm-12">
                        <img src={"/img/truck.png"} alt="" style={{width:"100%"}}/>
                    </div>
                    <div className="service-desc col-sm-12">
                        <p style={styles.text}>
                            To optimize every step of your business either personal or for your supply chain,
                            our storage facility is available to help store and protect your packages.
                        </p>
                    </div>
                </div>
            </div>

            <div className="col-sm-12 col-md-2 col-lg-3 service">
                <div className="row">
                    <div className="service-title col-sm-12 mb-5">
                        <h6 style={styles.textHead}>Corporate Transportation</h6>
                        <div className="text-center">
                            <p className='text-center'/>
                        </div>
                    </div>
                    <div className="service-image col-sm-12">
                        <img src={"/img/bus.png"} alt="" style={{width:"100%"}}/>
                    </div>
                    <div className="service-desc col-sm-12">
                        <p style={styles.text}>
                            Life is much easier when you spend your time taking care of other important activities while we take care of your transportation needs.
                        </p>
                    </div>

                    {/*<div className="service-view col-sm-12">*/}
                    {/*    <span>Read More</span>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
        </div>
    )
}

ServicesList.propTypes={
    viewService : PropTypes.func
}

export default ServicesList;
