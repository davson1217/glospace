import React from 'react'

const FileDisplay = props =>{
    return  <img src={`/storage/payments/${props.match.params.filename}`} alt="upload"/>
}

export  default  FileDisplay
