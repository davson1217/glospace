import React from 'react';
import PropTypes from 'prop-types';

const Password = props =>{
    const data ={
        newPass:props.newPass,
        currentPass:props.currentPass,
    }
    let error = props.passError ? <span className='text-danger'>The 'current password' you provided is incorrect</span> :null;
    let success =    props.passChanged ?
        <span className='text-success'>Password changed</span> : null
    ;
    return (
        <div>
           <h6 className={'text-center mb-2'}>Change Password</h6>
            {error || success}
            <form onSubmit={e=> {
                e.preventDefault();
                props.changeSubmit(data,'password')
            }} className="setting-change-form">

                <label htmlFor="currentPass" className={'mr-2'}>
                    <input type="password" placeholder={'Current password'} value={props.currentPass}
                           onChange={e=>props.settingChange('currentPass', e.target.value)}/>
                </label>

                <label htmlFor="newPass">
                    <input type="password" placeholder={'New Password'} value={props.newPass}
                           onChange={e=>props.settingChange('newPass', e.target.value)}
                           disabled={!props.currentPass}
                    />
                </label>
                <div className='text-center'>
                    <button type={'submit'} disabled={!props.currentPass || !props.newPass}>change password</button>
                </div>
            </form>
        </div>
    )
}

Password.propTypes = {
    currentPass : PropTypes.string,
    passError : PropTypes.bool,
    passChanged : PropTypes.bool,
    newPass : PropTypes.string,
    settingChange : PropTypes.func,
    changeSubmit : PropTypes.func,
}

export default Password;
