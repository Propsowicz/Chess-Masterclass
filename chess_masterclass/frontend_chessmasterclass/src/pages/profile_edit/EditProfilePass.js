import React from 'react'
import {
    useParams, 
    useNavigate,           
    } 
from 'react-router-dom'
import {alertMsg} from '../../utils/utlis'
import {url} from '../../constants/urlAPI'

const EditProfilePass = () => {

    // EDIT PROFILE PASSWORD -- start
    const navigate = useNavigate()
    let username = useParams().username    

    let changePassword = async (e)  => {
        let btnToBlock = document.querySelector('#btn-submit-editpass')  
        btnToBlock.disabled = true
        e.preventDefault()
        if(e.target.old_password.value && e.target.new_password.value && e.target.new_password2.value){                     // check if all fields are filled
            if(e.target.new_password.value === e.target.new_password2.value){                                               // check if new password is repeated corectly
                            let response = await fetch(`${url}/member/api/edit/${username}`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    'operation': 'password-edit',
                                    'old_password': e.target.old_password.value,
                                    'new_password': e.target.new_password.value,
                                })
                                })
                                let status = await response.json()
                                    
                                if(response.status === 200){                                                                // if status code 200 -> password has been changed
                                    navigate(`/profile/${username}`)
                                    localStorage.setItem('success msg', 'Profile password has been successfully changed.')  // save success msg in local storage to display it after navigation to user's profile page         
                                }else if(status.password){                                                                  // if not 200 passowrd is not valid (ie too short)
                                    status.password[0].forEach(msg => {
                                        alertMsg('new_password2', msg, 'btn-submit-editpass')                               // display every password validation error
                                    });                                    
                                }                       
            }else{
                alertMsg('new_password2', 'Passwords are not the same!', 'btn-submit-editpass')
            }
        }else{
            alertMsg('edit-pass', 'Please fill all fields.', 'btn-submit-editpass')
        }
        btnToBlock.disabled = false
        }
    // EDIT PROFILE PASSWORD -- end



  return (
    <div className='container' style={{width: '20rem',paddingTop:'3rem',}}>
        <h3>Change Password</h3>
        <form onSubmit={changePassword} id='edit-pass'>
            <div className="form-outline" id='old_password'>
                <input id='old_password' type="password" className="form-control" name="old_password" placeholder="Enter old password"/>
                <label id='old_password-ID' className="form-label" htmlFor="old_password">Enter old password</label>
            </div>
            <div className="form-outline" id='new_password'>
                <input id='new_password' type="password" className="form-control" name="new_password" placeholder="Enter new password"/>
                <label id='new_password-ID' className="form-label" htmlFor="new_password">Enter new password</label>
            </div>
            <div className="form-outline" id='new_password2'>
                <input id='new_password2' type="password" className="form-control" name="new_password2" placeholder="Repeat new password"/>
                <label id='new_password2-ID' className="form-label" htmlFor="new_password2">Repeat new password</label>
            </div>            
            <button id='btn-submit-editpass' type="submit" className="btn btn-primary btn-block" >Change password</button>            
        </form>
    </div>
  )
}

export default EditProfilePass