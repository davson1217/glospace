import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import moment from "moment";

const ShipmentProgress = props =>{
    useEffect(()=>{
       // props.fetchProgress()
        console.log(props.progress)
    },[props.progress])

    let progressList= <div className="text-center"><b>Loading Progress</b></div>;
    if(Object.keys(props.progress).length){
        progressList = props.progress.map((item,index)=>{
            return (
                    <div className="col-sm-12 mt-1" key={index}>
                        <div className="row">
                            <div className="col-sm-2"><img src={"/img/checked.svg"} alt="" width={15}/></div>
                            <div className="col-sm-3">{item.subject}<p>{item.description}</p></div>
                            <div className="col-sm-3">{moment(item.created_at).format('MMMM Do YYYY, h:mm:ss a')}</div>
                            <div className="col-sm-4">{item.location}</div>
                        </div>
                    </div>
            )
        })
    }
    return (
        <div>
            <div className="row">

                <div className="col-sm-12">
                    <button>Overview</button>
                    <button>Detailed View</button>
                </div>

                <div className="col-sm-12 mt-1">
                    <div className="row">
                        <div className="col-sm-2">-</div>
                        <div className="col-sm-3">-</div>
                        <div className="col-sm-3"><b>Date</b></div>
                        <div className="col-sm-4"><b>Location</b></div>
                    </div>
                </div>

                <div className="col-sm-12">
                    <div className="row">
                        {progressList}
                    </div>
                </div>

            </div>
        </div>
    )
}

ShipmentProgress.propTypes ={
    progress: PropTypes.array,
}

export default ShipmentProgress;
