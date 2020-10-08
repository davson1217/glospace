import React from 'react';
import PropTypes from 'prop-types';

const Address = props =>{
    return (
        <div>
            <form onSubmit={e=> {
                e.preventDefault();
                props.changeSubmit(props.userAddress,'address')
            }} className="setting-change-form">
                <input type="text" placeholder={'address'} value={props.userAddress} onChange={e=>props.settingChange('address', e.target.value)}/>
                <button type={'submit'} disabled={props.userAddress === props.initialAddress}>change address</button>
            </form>
        </div>
    )
}

Address.propTypes = {
    userAddress : PropTypes.string,
    initialAddress : PropTypes.string,
    settingChange : PropTypes.func,
    changeSubmit : PropTypes.func,
}

export default Address;
