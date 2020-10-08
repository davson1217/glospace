import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

const SenderReceiverDetails = props =>{

    useEffect(()=>{
        // console.log(props.hasGS)
        if(props.hasGS === "Y"){
            if(props.GSNtoCheck.length === 10){
                props.checkGSNumber(props.GSNtoCheck,props.category)
            }
        }
    },[props.GSNtoCheck])

    let fields;

    if (props.hasGS){
        if (props.hasGS === "Y"){
            fields = (
                    <div className="d-flex flex-column p-2">
                        <input type="text"
                               placeholder={'GS Number'}
                               value={props.GSNtoCheck}//GSNtoCheck
                               onChange={e => props.inputChange(props.category+'GSNtoCheck',e,'Tracking')}//GSNtoCheck
                               className='tracking-input'
                        />
                        <div className="d-flex flex-column p-2">
                            <label htmlFor="fullName">
                                <input disabled={true} onChange={()=>{}} placeholder={'full name'} style={{width:"100%"}} className='tracking-input'  type="text" value={props.user.name} />
                            </label>
                            <label htmlFor="address">
                                <input disabled={true} onChange={()=>{}} placeholder={'country'} style={{width:"100%"}} className='tracking-input'  type="text" value={props.user.country}/>
                            </label>
                            <label htmlFor="address">
                                <input disabled={true} onChange={()=>{}} placeholder={'city'} style={{width:"100%"}} className='tracking-input'  type="text" value={props.user.city}/>
                            </label>
                            <label htmlFor="address">
                                <input disabled={true} onChange={()=>{}} placeholder={'address'} style={{width:"100%"}} className='tracking-input'  type="text" value={props.user.address}/>
                            </label>
                            <label htmlFor="email">
                                <input disabled={true} onChange={()=>{}} placeholder={'email'} style={{width:"100%"}} className='tracking-input'  type="email" value={props.user.email}/>
                            </label>
                            <label htmlFor="phoneNumber">
                                <input disabled={true} onChange={()=>{}} placeholder={'phone'} style={{width:"100%"}} className='tracking-input'  type="number" value={props.user.phone} />
                            </label>
                        </div>
                    </div>
            )
        }else{
            fields = (
                <div className="d-flex flex-column p-2">
                    <label htmlFor="fullName">
                        <input type="text" className='tracking-input'
                               placeholder={props.category+"'s" + " full name"}
                               style={{width:"100%"}}
                               value={props.name}
                               onChange={e=>props.inputChange(props.category+'Name',e,'Tracking')}
                        />
                    </label>
                    <label htmlFor="country">
                        <input type="text"
                               className='tracking-input'
                               style={{width:"100%"}}
                               placeholder={props.category+"'s" + " country"}
                               value={props.country}
                               onChange={e=>props.inputChange(props.category+'Country',e,'Tracking')}
                        />
                    </label>
                    <label htmlFor="city">
                        <input type="text"
                               className='tracking-input'
                               style={{width:"100%"}}
                               placeholder={props.category+"'s" + " city"}
                               value={props.city}
                               onChange={e=>props.inputChange(props.category+'City',e,'Tracking')}
                        />
                    </label>
                    <label htmlFor="address">
                        <input type="text"
                               className='tracking-input'
                               style={{width:"100%"}}
                               placeholder={props.category+"'s" + " Address"}
                               value={props.address}
                               onChange={e=>props.inputChange(props.category+'Address',e,'Tracking')}
                        />
                    </label>
                    <label htmlFor="email">
                        <input type="email"
                               className='tracking-input'
                               style={{width:"100%"}}
                               placeholder={props.category+"'s" + " email"}
                               value={props.email}
                               onChange={e=>props.inputChange(props.category+'Email',e,'Tracking')}
                        />
                    </label>
                    <label htmlFor="phoneNumber">
                        <input type="number"
                               className='tracking-input'
                               style={{width:"100%"}}
                               placeholder={props.category+"'s" + " phone number"}
                               value={props.phone}
                               onChange={e=>props.inputChange(props.category+'Phone',e,'Tracking')}
                        />
                    </label>
                </div>
            )
        }
    }
    return fields;
}

SenderReceiverDetails.propTypes = {
    hasGS : PropTypes.string,
    category : PropTypes.string,
    GSNtoCheck : PropTypes.string,
    checkGSNumber : PropTypes.func,
    inputChange : PropTypes.func,
    user : PropTypes.object,
    name : PropTypes.string,
    email : PropTypes.string,
    country : PropTypes.string,
    address : PropTypes.string,
    city : PropTypes.string,
    phone : PropTypes.string,

}


export default SenderReceiverDetails;
