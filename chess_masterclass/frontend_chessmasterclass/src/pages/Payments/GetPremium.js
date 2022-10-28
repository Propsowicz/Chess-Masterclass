import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import {url} from '../../constants/urlAPI'
import {UserContext} from '../../context/UserContext'
import PaymentInfo from './PaymentInfo'

const GetPremium = () => {
    let {userInfo} = useContext(UserContext)
    let slug = useParams().slug
    let [getPlan, setGetPlan] = useState([])
    let [get_exp_date, set_exp_date] = useState([])
    let [dotpay_call, setDotpay_call] = useState([])

    let getPremiumPlanInfo = async () => {
        let response = await fetch(`${url}/payment/premium-plans/getpremium/${userInfo.user_id}/${slug}`)
        let data = await response.json()
        setGetPlan(data.data)
        set_exp_date(data.exp_date)
        setDotpay_call(data.dotpay_call)
    }

    let handlePayment = async () => {
      let response = await fetch(`${url}/payment/premium-plans/getpremium/${slug}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify('some content')
      })
  }

  let checkIfFree = () => {
    if(getPlan.name === 'Free' || !(userInfo.premium_plan === 'free')){
      return true
    }else{
      return false
    }
  }

    useEffect(() => {
        getPremiumPlanInfo()
        console.log(userInfo)
    }, [getPlan.name])

  return (
    <div className='container'>
      <div className="card">
        <h5 className="card-header">{getPlan.name} Plan</h5>
        <div className="card-body">
          <h5 className="card-title">Price: {getPlan.price}$</h5>
          <p className="card-text">{getPlan.body}</p>
        </div>
      </div>

      {checkIfFree()
      ?
        <></>
      :
        <PaymentInfo data={dotpay_call} exp_date={get_exp_date} user={userInfo.username} plan_name={getPlan.name} price={getPlan.price} />
      }
      
      

    </div>   
  )
}

export default GetPremium