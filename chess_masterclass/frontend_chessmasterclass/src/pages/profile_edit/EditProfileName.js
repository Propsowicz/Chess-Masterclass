import React from 'react'
import {
    useParams, 
    useNavigate,
       
} from 'react-router-dom'
import {alertMsg} from '../../utils/utlis'


const EditProfileName = () => {

    const navigate = useNavigate()
    let username = useParams().username 


    let changeName = async (e)  => {
        let btnToBlock = document.querySelector('#btn-submit-name')  
        btnToBlock.disabled = true
        e.preventDefault()

        let response = await fetch(`http://127.0.0.1:8000/member/api/edit/${username}`, {
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

        if(response.status === 200){
            navigate(`/profile/${username}`)
            localStorage.setItem('success msg', 'Profile name has been successfully changed.')
        }else{
            alertMsg('edit-name', status['Response msg'], 'btn-submit-name')
        }
        btnToBlock.disabled = false

        
    }

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