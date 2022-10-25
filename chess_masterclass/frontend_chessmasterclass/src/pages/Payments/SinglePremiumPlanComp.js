import React from 'react'
import {Link} from 'react-router-dom'

const SinglePremiumPlanComp = (props) => {
  return (
        <div className="card border-success mb-3" style={{maxWidth:'18rem'}}>
            <div className="card-header bg-transparent border-success fw-bold" >{props.name} Plan</div>
            <div className="card-body text-success">
                <h5 className="card-title">{props.price}$</h5>
                <p className="card-text">{props.body}</p>
            </div>
        <div className="card-footer bg-transparent border-success">
            <Link className='btn btn-success' to={`getpremium/${props.slug}`}>Check it out!</Link>
        </div>
    </div>
  )
}

export default SinglePremiumPlanComp