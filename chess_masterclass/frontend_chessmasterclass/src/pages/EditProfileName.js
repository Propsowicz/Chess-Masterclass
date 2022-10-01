import React from 'react'
import {
    useParams, 
    useNavigate,
       
} from 'react-router-dom'


const EditProfileName = () => {

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
                'operation': 'name-edit',
                'first_name': e.target.fname.value,
                'last_name': e.target.lname.value,
            })
        })
        let data = await response.json()
        if(response.status === 200){
            alert(data['Response msg'], 'edit-name')
            setTimeout(() => {
                navigate('/')
              }, 2000)            
        }else{
            alert(data['Response msg'], 'edit-name')
        }
        
        
    }

  return (
    <div className='container' style={{width: '20rem',paddingTop:'3rem',}}>
        <h3>Change your name</h3>
        <form onSubmit={changeEmail} id='edit-name'>
            <div className="form-outline" id='fname'>
                <input id='form2Example2' type="text" className="form-control" name="fname" placeholder="Enter first name"/>
                <label id='fname-ID' className="form-label" htmlFor="form2Example2">Enter first name</label>
            </div>
            <div className="form-outline" id='lname'>
                <input id='form2Example2' type="text" className="form-control" name="lname" placeholder="Enter last name"/>
                <label id='lname-ID' className="form-label" htmlFor="form2Example2">Enter last name</label>
            </div>
            <button id='btn-submit' type="submit" className="btn btn-primary btn-block" >Edit name</button>
            
        </form>
    </div>
  )
}

export default EditProfileName