import React from 'react'
import {
    useParams, 
    useNavigate,       
    } 
from 'react-router-dom'
import {alertMsg} from '../../utils/utlis'
import {url} from '../../constants/urlAPI'

const EditProfileEmail = () => {

    const navigate = useNavigate()
    let username = useParams().username

    let changeEmail = async (e)  => {
        let btnToBlock = document.querySelector('#btn-submit-email')  
        btnToBlock.disabled = true 
        e.preventDefault()
        let response = await fetch(`${url}/member/api/edit/${username}`, {
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
        if(response.status === 200){                                                                // if 200 got user user's profile page 
            navigate(`/profile/${username}`)    
        localStorage.setItem('success msg', 'Profile email has been successfully changed.')         // save success msg in local storage to display it after navigation to user's profile page         
        }else{                                                                                      // if not 200 display msg
            alertMsg('edit-email', data['Response msg'], 'btn-submit-email')
        }        
        btnToBlock.disabled = false 
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
            <button id='btn-submit-email' type="submit" className="btn btn-primary btn-block" >Edit email</button>            
        </form>        
    </div>
  )
}

export default EditProfileEmail