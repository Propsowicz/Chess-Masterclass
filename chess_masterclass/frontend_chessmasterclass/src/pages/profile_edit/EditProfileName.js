import React from 'react'
import {
    useParams, 
    useNavigate,       
    } 
from 'react-router-dom'
import {alertMsg} from '../../utils/utlis'
import {url} from '../../constants/urlAPI'

const EditProfileName = () => {

    // EDIT USER NAME -- start
    const navigate = useNavigate()
    let username = useParams().username 
        let changeName = async (e)  => {
        let btnToBlock = document.querySelector('#btn-submit-name')  
        btnToBlock.disabled = true
        e.preventDefault()

        let response = await fetch(`${url}/member/api/edit/${username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'operation': 'name-edit',
                'first_name': e.target.fname.value,
                'last_name': e.target.lname.value,
            })
        })
        let status = await response.json()

        if(response.status === 200){                                                                        // if 200 go to user's page
            navigate(`/profile/${username}`)
            localStorage.setItem('success msg', 'Profile name has been successfully changed.')              // save success msg in local storage to display it after navigation to user's profile page
        }else{                                                                                              // if not 200 display error msg
            alertMsg('edit-name', status['Response msg'], 'btn-submit-name')
        }
        btnToBlock.disabled = false        
    }
    // EDIT USER NAME -- end


  return (
    <div className='container' style={{width: '20rem',paddingTop:'3rem',}}>
        <h3>Change your name</h3>
        <form onSubmit={changeName} id='edit-name'>
            <div className="form-outline" id='fname'>
                <input id='form2Example2' type="text" className="form-control" name="fname" placeholder="Enter first name"/>
                <label id='fname-ID' className="form-label" htmlFor="form2Example2">Enter first name</label>
            </div>
            <div className="form-outline" id='lname'>
                <input id='form2Example2' type="text" className="form-control" name="lname" placeholder="Enter last name"/>
                <label id='lname-ID' className="form-label" htmlFor="form2Example2">Enter last name</label>
            </div>
            <button id='btn-submit-name' type="submit" className="btn btn-primary btn-block" >Edit name</button>
            
        </form>
    </div>
  )
}

export default EditProfileName