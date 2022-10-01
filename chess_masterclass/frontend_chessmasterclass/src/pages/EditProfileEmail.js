import { isDisabled } from '@testing-library/user-event/dist/utils'
import React from 'react'

import {
    useParams, 
    useNavigate,
    Link,
       
} from 'react-router-dom'

const EditProfileEmail = () => {
    const navigate = useNavigate()

    let username = useParams().username

    // alerts
    function alert(text, id){
        let passwordDiv = document.querySelector(`#${id}`)
        let msg = document.createElement('p')            
        let btn = document.querySelector('#btn-submit')

        msg.innerText = text
        msg.style.color = 'red'
        passwordDiv.appendChild(msg)        
        btn.disabled = true
        setTimeout(() => {
            passwordDiv.removeChild(msg);
            btn.disabled = false
          }, 2000)        
    }

    let changeEmail = async (e)  => {
        e.preventDefault()

        let response = await fetch(`http://127.0.0.1:8000/member/api/edit/${username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'operation': 'email-edit',
                'password': e.target.password.value,
                'email': e.target.email.value,
            })
        })
        let data = await response.json()
        if(response.status === 200){
            alert(data['Response msg'], 'edit-email')
            setTimeout(() => {
                navigate('/')
              }, 2000)            
        }else{
            alert(data['Response msg'], 'edit-email')
        }
        
        
    }

  return (
    <div className='container' style={{width: '20rem',paddingTop:'3rem',}}>
        <h3>Change email address</h3>
        <form onSubmit={changeEmail} id='edit-email'>
            <div className="form-outline" id='password'>
                <input id='form2Example2' type="password" className="form-control" name="password" placeholder="Enter password"/>
                <label id='password-ID' className="form-label" htmlFor="form2Example2">Enter password</label>
            </div>
            <div className="form-outline" id='email'>
                <input id='form2Example2' type="email" className="form-control" name="email" placeholder="Enter new email address"/>
                <label id='email-ID' className="form-label" htmlFor="form2Example2">Enter new email address</label>
            </div>
            <button id='btn-submit' type="submit" className="btn btn-primary btn-block" >Edit email</button>
            
        </form>
        
    </div>
  )
}

export default EditProfileEmail