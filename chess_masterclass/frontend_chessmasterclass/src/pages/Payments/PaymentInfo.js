import React from 'react'
import {url} from '../../constants/urlAPI'
import { useParams, Link } from 'react-router-dom'


const PaymentInfo = (props) => {

    function handleClick(e){props.onClickHandle(e)}

  return (
    <div style={{paddingTop: '3em'}}>
        <div className="card" style={{paddingBottom: '1em'}}>
            <h3>Payment info</h3>
                <div className="input-group mb-3"> 
                    <span className="input-group-text" id="basic-addon1">First Name</span>
                    <input type="text" className="form-control" placeholder="First Name" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>

                <div className="input-group mb-3" > 
                    <span className="input-group-text" id="basic-addon1">Last Name</span>
                    <input type="text" className="form-control" placeholder="Last Name" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>

                <div className="input-group mb-3" > 
                    <span className="input-group-text" id="basic-addon1">Email address</span>
                    <input type="text" className="form-control" placeholder="Email address" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Payment: </span>
                    <span className="input-group-text">{props.price}</span>
                    <span className="input-group-text">$</span>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Premium plan expiration day: </span>
                    <span className="input-group-text">{props.exp_date}</span>
                </div>
     
                <form action="https://ssl.dotpay.pl/test_payment/" method="post" target="_parent">

                    <input type="hidden" name="amount" value="50.00" />
                    <input type="hidden" name="type" value="0" />
                    <input type="hidden" name="currency" value="PLN" />   
                    <input type="hidden" name="id" value="746269" />
                    <input type="hidden" name="description" value="Test" />
                    {/* <input type="hidden" name="url" value="http://127.0.0.1:8000/payment/premium-plans/pay" /> */}
                    <input type="hidden" name="url" value="https://chess-masterclass.onrender.com/payment/premium-plans/pay" />
                    {/* <input type="hidden" name="chk" value="d5dbcfa11ab153508f63ef2605a329be2f70d6fdfd64489dd8fcd4d41eb37e82" />  */}
                    <input type="hidden" name="chk" value="7e43e3a598f3216d291295c3fbe17a61afe5bfa5fa8f9f86122b65bd473c4b69" /> 
                    {/* <input type="hidden" name="urlc" value="http://127.0.0.1:8000/payment/premium-plans/pay-ok" />  */}
                    <input type="hidden" name="urlc" value="https://chess-masterclass.onrender.com/payment/premium-plans/pay-ok" /> 
                    <input type="hidden" name="ignore_last_payment_channel" value="1" /> 
                   
                       
                    <p><button className="btn btn-primary">Make Payment</button></p>
                    </form>
     
     
     
      </div>
    </div>
  )
}

export default PaymentInfo