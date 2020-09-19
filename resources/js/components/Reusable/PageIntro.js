import React from 'react';
import {Container,Row, Col} from 'reactstrap'
import PropTypes from 'prop-types';
import './Css/PageIntro.css'
const PageIntro = props =>{
    const styles = {
        introWrap : {
            width:'100%',
            backgroundImage: `url(${props.background})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            display: 'flex',
            flexDirection:'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight:'50%'
        },
        pageTitle:{
            color:'white',
            fontWeight:'bold',
            fontSize:'34px',
        },
        pageDesc:{
            color:'white',
            fontStyle:'italic',
            fontSize:'30px'
        },
        introUnderline:{
            color:'white',
            border:'2px solid lightgreen',
            width:'120px'
        },

    }
    return(
        <div className="pageIntro" style={styles.introWrap}>
            <p style={styles.pageTitle}>{props.title}</p>
            <p style={styles.pageDesc}>{props.description}</p>
            <div style={styles.introUnderline}/>
        </div>
    )
}

PageIntro.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    background: PropTypes.string,
}

export default PageIntro;
