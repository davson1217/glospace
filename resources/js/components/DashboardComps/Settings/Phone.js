import React from 'react';
import PropTypes from 'prop-types';

const Phone = props =>{
    return (
        <div>
            <form onSubmit={e=> {
                e.preventDefault();
                props.changeSubmit(props.userPhone,'phone')
            }} className="setting-change-form">
                <input type="tel" placeholder={'phone'} value={props.userPhone} onChange={e=>props.settingChange('phone', e.target.value)}/>
                <button type={'submit'} disabled={props.userPhone === props.initialPhone}>change number</button>
            </form>
        </div>
    )
}

Phone.propTypes = {
    userPhone : PropTypes.number || PropTypes.string,
    initialPhone : PropTypes.number,
    settingChange : PropTypes.func,
}

export default Phone;
