import React from 'react';
import PropTypes from 'prop-types';

const Filter = props =>{
    let radios = [];
    //let radioNames = ["confirmed", "unconfirmed", "All"]
    for (let i = 0; i < props.radioNames.length; i++) {
        radios[i] = (
            <div className="form-check-inline" key={i}>
                <label htmlFor={props.radioNames[i]} className="form-check-label mr-3">
                    <input type="radio"
                           id={props.radioNames[i]}
                           name={"filter"}
                           // value={props.radioValue === props.radioNames[i]}
                           onChange={(e)=> {
                               sessionStorage.setItem("filter",props.radioNames[i])
                               props.filterHandler(props.radioNames[i])
                           }}
                           className="form-check-input"
                           // checked={true}
                    />
                    {props.radioNames[i]}
                </label>
            </div>
        )
    }
    return radios;
}

Filter. propTypes={
    filterHandler: PropTypes.func,
    radioNames: PropTypes.array,
    radioValue:PropTypes.string
}
export default  Filter;
