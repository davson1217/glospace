import React,{useEffect} from 'react'
import moment from "moment";
import PropTypes from 'prop-types';

const TrackingView = props =>{

    useEffect(()=>{
     //   console.log(props.shipment)
    },[props.shipment])

    let progressList= <div className="text-center"><b>Loading Progress</b></div>;
    let progress = <b>Fetching....</b>;

    if(Object.keys(props.shipment).length){
       progressList = props.shipment.map((item,index) => {

          progress = item.progress.map((progress,index)=>{
                    return (
                            <div className="col-sm-12 mt-4" key={index}>
                                <div className="row">
                                    <div className="col-sm-2"><img src={"/img/checked.svg"} alt="" width={15}/></div>
                                    <div className="col-sm-3">
                                        <b>{progress.subject}</b>
                                        {props.view === "Overview" ? null : <p>{progress.description}</p>}
                                    </div>
                                    <div className="col-sm-3">{moment(progress.created_at).format('MMMM Do YYYY, h:mm:ss a')}</div>
                                    <div className="col-sm-4">{progress.location}</div>
                                </div>
                            </div>
                    )
            })

           return (
               <div key={index}>
                   <h2 className="mb-0">Shipment Progress</h2>
                   <span><img src={"/img/live.svg"} alt="live" width={25}/><small>Find live updates of your shipment below</small></span>
                   <div className="progress mt-1" style={{height:"50px"}}>
                       <div className="progress-bar" style={{width:`${item.bar}%`,backgroundColor:"#DD500A"}}>
                           {props.shipment[0].progress[0].subject}
                       </div>
                   </div>
                   <div className="shipment-xtra">
                       <span className="xtra">
                           Estimated delivery date: <span>{moment(props.shipment[0].estimated_delivery).format("MMM Do YYYY")}</span>
                       </span>
                       {props.shipment[0].delivery_note?
                           <span className="xtra">
                               Additional shipment note: <span>{props.shipment[0].delivery_note}</span>
                           </span> : null
                       }
                   </div>
                   <div className="mb-2 mt-2 p-2 progress-toggler" onClick={props.toggleProgress}>
                       Shipment Progress
                       <span className={"ml-5"}>
                           {props.showProgress?<img src={"/img/up-arrow.svg"} alt="up" width={20}/>:
                               <img src={"/img/down-arrow.svg"} alt="up" width={20}/>}
                       </span>
                   </div>
                       {props.showProgress?
                           <div className="p-1">
                               <button onClick={()=>props.switchView("Overview")} disabled={props.view==="Overview"}>Overview</button>
                               <button onClick={()=>props.switchView("Detailed")} disabled={props.view==="Detailed"}>Detailed View</button>
                           </div>: null
                       }
                       {props.showProgress? progress : null}
               </div>
           )
        })
        // progressList = props.shipment[0].progress.map((item,index)=>{
        //     return (
        //         <div className="col-sm-12 mt-1" key={index}>
        //             <div className="row">
        //                 <div className="col-sm-2"><img src={"/img/checked.svg"} alt="" width={15}/></div>
        //                 <div className="col-sm-3"><b>{item.subject}</b><p>{item.description}</p></div>
        //                 <div className="col-sm-3">{moment(item.created_at).format('MMMM Do YYYY, h:mm:ss a')}</div>
        //                 <div className="col-sm-4">{item.location}</div>
        //             </div>
        //         </div>
        //     )
        // })

    }

    return (
        <div>
            {progressList}
        </div>
    )
}

TrackingView.propTypes={
    shipment : PropTypes.array,
    toggleProgress : PropTypes.func,
    progressView : PropTypes.func,
    showProgress : PropTypes.bool,
    view : PropTypes.string,
}

export default TrackingView;
