import React from 'react';
import {Container,Row, Col} from 'reactstrap'
import PropTypes from 'prop-types';
const Footer = props =>{
    const styles = {
        width:'100%',
        backgroundColor: 'black',
        textAlign:'center',
        marginTop:"30px",
        minHeight:'80px',
        // position:"absolute",
        // bottom:"0"
    }
    return(
        <div style={styles}>
            <span className='text-light'> Copyright 2020&copy;</span>
        </div>
    )
}

Footer.propTypes = {

}

export default Footer;
