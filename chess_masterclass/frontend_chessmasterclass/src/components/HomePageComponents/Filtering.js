import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const Filtering = (props) => {
    function premiumPlanOnChange(e) {props.handleOnChange(e)}     
  return (
    <div className="form-check form-check-inline resp-list-item" style={{paddingLeft:'5rem'}}>
        <input className="form-check-input" type="checkbox" id={props.value.toLowerCase()} value={props.value.toLowerCase()} onChange={premiumPlanOnChange} defaultChecked={false}  />
        <label className="form-check-label" htmlFor={props.value.toLowerCase()}>{props.value}</label>
    </div>
  )
}

export default Filtering