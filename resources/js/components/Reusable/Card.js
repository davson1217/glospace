import React from 'react';

const Card = props =>{

    let cardStyle = {
        card:{
            width:"100%",
            // height:"500%",
            boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            borderLeft:'10px solid',
            borderColor:'darkred'
        },

        properties:{
            textAlign: props.alignment || 'center',
        },

        header:{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px",
            fontSize: "40px"
        },
        cardCover:{
            width:"100%"
        },
        title:{
            padding: "10px",
            fontWeight:props.weight || 'normal'
        }
    };

    return (
        <div style={cardStyle.card}>
            {props.children}
        </div>
    )
}

export default Card;
