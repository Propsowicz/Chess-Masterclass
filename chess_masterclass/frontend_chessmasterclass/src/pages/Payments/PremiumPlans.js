import React, { useEffect, useState } from 'react'
import {url} from '../../constants/urlAPI'
import SinglePremiumPlanComp from './SinglePremiumPlanComp'

const PremiumPlans = () => {

  let [allPlans, setAllPlans] = useState([])
  let getPremiumPlans = async () => {
    let response = await fetch(`${url}/payment/premium-plans/`)
    let data = await response.json()
    setAllPlans(data)
  }

  useEffect(() => {
    getPremiumPlans()
  }, [])

  return (
    <div className='container' style={{paddingTop:'3em'}}>
      <div className='card-group'>
        {allPlans.map((plan) => (
        <SinglePremiumPlanComp key={plan.id} name={plan.name} body={plan.body} price={plan.price} slug={plan.slug}/>
        ))}
      </div>      
    </div>
  )
}

export default PremiumPlans