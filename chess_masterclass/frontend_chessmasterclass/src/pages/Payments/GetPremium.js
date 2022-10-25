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

    let getPremiumPlanInfo = async () => {
        let response = await fetch(`${url}/payment/premium-plans/getpremium/${slug}`)
        let data = await response.json()
        setGetPlan(data.data)
        set_exp_date(data.exp_date)
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

    useEffect(() => {
        getPremiumPlanInfo()
    }, [])

  return (
    <div className='container'>
      <div className="card">
        <h5 className="card-header">{getPlan.name} Plan</h5>
        <div className="card-body">
          <h5 className="card-title">Price: {getPlan.price}$</h5>
          <p className="card-text">{getPlan.body}</p>
        </div>
      </div>


      
      <PaymentInfo user={userInfo.username} price={getPlan.price} exp_date={get_exp_date} onClickHandle={handlePayment}/>

    </div>   
  )
}

export default GetPremium