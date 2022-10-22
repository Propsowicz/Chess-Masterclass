import React from 'react'
import {url} from '../../constants/urlAPI'
import {alertMsg} from '../../utils/utlis'

const ForgotPass = () => {

    // FORGOT PASSWORD OPERATION -- start
    let sendNewUserKey = async (e)  => {
        e.preventDefault()

        if(!e.target.username.value && !e.target.email.value){
            alertMsg('edit-pass', 'At least one field must be filled!', 'btn-submit')            
        }else{
            let response = await fetch(`${url}/member/api/forgot-pass/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'operation': 'send-new-key',
                'username': e.target.username.value,
                'email': e.target.email.value,
            })
            })
            let data = await response.json()

            if(response.status === 200){
                alertMsg('edit-pass', data['Response msg'], 'btn-submit')
                        
            }else{
                alertMsg('edit-pass', data['Response msg'], 'btn-submit')
            }
        }          
    }
    // FORGOT PASSWORD OPERATION -- end

  return (  

    <div className='container' style={{width: '20rem',paddingTop:'3rem',}}>
        <h3>Fill username or email address</h3>
        <form onSubmit={sendNewUserKey} id='edit-pass'>
            <div className="form-outline" id='username'>
                <input id='username' type="text" className="form-control" name="username" placeholder="Enter Username"/>
                <label id='username-ID' className="form-label" htmlFor="username">Enter Username</label>
            </div>
            <div className="form-outline" id='email'>
                <input id='email' type="email" className="form-control" name="email" placeholder="Enter email address"/>
                <label id='email-ID' className="form-label" htmlFor="email">Enter email address</label>
            </div>            
            <button id='btn-submit' type="submit" className="btn btn-primary btn-block" >Send email with key</button>            
        </form>
    </div>
  )
}

export default ForgotPass