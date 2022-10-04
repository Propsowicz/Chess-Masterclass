import React from 'react'

const ForgotPass = () => {

    // alerts
    function alert(text, id){
        let alertDiv = document.querySelector(`#${id}`)
        let msg = document.createElement('p')            
        let btn = document.querySelector('#btn-submit')

        msg.innerText = text
        msg.style.color = 'red'
        alertDiv.appendChild(msg)        
        btn.disabled = true
        setTimeout(() => {
            alertDiv.removeChild(msg);
            btn.disabled = false
          }, 2000)        
    }

    let sendNewUserKey = async (e)  => {
        e.preventDefault()

        if(!e.target.username.value && !e.target.email.value){
            alert('At least one field must be filled!', 'edit-pass')
            
        }else{
            let response = await fetch(`http://127.0.0.1:8000/member/api/forgot-pass/send`, {
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
            console.log(data)

            if(response.status === 200){
                alert(data['Response msg'], 'edit-pass')
                        
            }else{
                alert(data['Response msg'], 'edit-pass')
            }
        }  
        
    }

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