import React from 'react';
import {Container,Row, Col} from 'reactstrap'
import PropTypes from 'prop-types';
const Footer = props =>{
    const styles = {
        width:'100%',
        backgroundColor: 'black',
        textAlign:'center',
        marginTop:"30px",
        padding:"5px",
        fontSize:"14px",
        fontFamily:"serif",
        // minHeight:'50px',
        // position:"absolute",
        // bottom:"0"
    }
    return(
        <div style={styles}>
            <span className='text-muted'> Copyright 2020&copy;</span>
            <a className='text-muted ml-3' target={'_blank'} href={'/legal/Terms&Conditions.pdf'}>Terms & Conditions</a>
            <a href={'/legal/Privacy.pdf'} target={'_blank'} className="text-muted ml-3" style={{cursor:'pointer'}}>Privacy Policy</a>
        </div>
    )
}

Footer.propTypes = {

}

export default Footer;
