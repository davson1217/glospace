import React from  'react'
import PropTypes from 'prop-types';

const Helper = props =>{
    const styles ={
        message: {
            color:props.color,
            // fontWeight:"bold"
        }
    }
    return <div className="col-sm-12 registrationHelper"><small style={styles.message}>{props.message}</small></div>
}


Helper.propTypes={
    message : PropTypes.string,
    color : PropTypes.string,
}

export default Helper;
