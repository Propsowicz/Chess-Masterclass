import React, {useState, useContext} from 'react'
import {url} from '../../constants/urlAPI'
import { useParams, Link } from 'react-router-dom'
import {UserContext} from '../../context/UserContext'

const PaymentInfo = (props) => {
    let {userInfo} = useContext(UserContext)
    let {logoutWithoutRedirect} = useContext(UserContext)
    let [msg, setMsg] = useState('')

    let createPaymentOrder = async (e) => {
      let response = await fetch(`${url}/payment/create-order/${userInfo.user_id}/${props.price}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {'msg': 'create order'}
      })
      logoutWithoutRedirect()
    }

  return (
    <div style={{paddingTop: '3em'}}>
        <div className="card" style={{paddingBottom: '1em'}}>
            <h3>Payment info</h3>
            <table className="table">                
                <tbody>
                    <tr>
                    <th scope="row">Username:</th>
                    <td>{props.user}</td>                    
                    </tr>

                    <tr>
                    <th scope="row">Premium Plan:</th>
                    <td>{props.plan_name}</td>                    
                    </tr>

                    <tr>
                    <th scope="row">Price:</th>
                    <td>{props.price}$</td>                    
                    </tr>

                    <tr>
                    <th scope="row">Expiration day:</th>
                    <td>{props.exp_date}</td>                    
                    </tr>
                </tbody>
                </table>
     
                <form action="https://ssl.dotpay.pl/test_payment/" method="post" target="_parent">
                    <input type="hidden" name="amount" value={props.data.amount} />
                    <input type="hidden" name="type" value={props.data.type} />
                    <input type="hidden" name="currency" value={props.data.currency} />   
                    <input type="hidden" name="id" value={props.data.id} />
                    <input type="hidden" name="description" value={props.data.description} />
                    <input type="hidden" name="url" value={props.data.url} />
                    <input type="hidden" name="chk" value={props.data.chk} /> 
                    <input type="hidden" name="urlc" value={props.data.urlc} /> 
                    <input type="hidden" name="ignore_last_payment_channel" value={props.data.ignore_last_payment_channel} />                      
                    <p><button className="btn btn-primary" onClick={createPaymentOrder}>Go to payment</button></p>
                </form>
     
     
     
      </div>
    </div>
  )
}

export default PaymentInfo