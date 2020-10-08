import React, {useEffect} from 'react';
import PropTypes from 'prop-types'

const ServicesList = props =>{

    useEffect(()=>{
      //  console.log(props)
    },[])

    const styles={
        textHead:{
            fontSize: '22px',
            fontFamily:"sans serif"
        },
        text:{
            fontSize:"17px",
            fontFamily:"arial serif",
            color:"#5c5a5a"
        }
    }

    let services = <h2 className={"text-center"}> </h2>;
    let serviceDesc;
    if (Object.keys(props.services).length){

        services = props.services.map((service,index)=>{
            if (props.component === "Home") {
                 serviceDesc = service.description.length > 80 ?
                    <p style={styles.text}> {service.description.substring(0, 50)}...<br/>
                        <b onClick={()=>props.viewService(service)}
                           style={{color:'#804303',cursor:'pointer',fontSize:'14px'}}
                        >Read more</b>
                    </p>
                    :
                    <p>{service.description} </p>;
            } else serviceDesc = <p style={styles.text}>{service.description} </p>

            let serviceImage = service.photo?<img src={`/storage/services/${service.photo}`} alt="" style={{width:"100%"}}/> : ""

            return (
                <div className="col-sm-12 col-md-2 col-lg-3 service" key={index}>
                    <div className="row">
                        <div className="service-title col-sm-12 mb-5">
                            <h6 style={styles.textHead}>{service.title}</h6>
                            <div className="text-center">
                                <p className='text-center'/>
                            </div>
                        </div>
                        <div className="service-image col-sm-12">
                            {serviceImage}
                        </div>
                        <div className="service-desc col-sm-12">
                            {serviceDesc}
                        </div>
                    </div>
                </div>
            )
        })
    }

    return(

        <div className="container">
            {/*<h5></h5>*/}
        <div className="row">
            {services}
        </div>
        </div>
    )
}

ServicesList.propTypes={
    viewService : PropTypes.func,
    services : PropTypes.array,
    component : PropTypes.string,
}

export default ServicesList;
