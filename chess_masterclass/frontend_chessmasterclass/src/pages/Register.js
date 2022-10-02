import React, {useContext} from 'react'
import {UserContext} from '../context/UserContext'


const Register = () => {
    let {register} = useContext(UserContext)


  return (
    <div className='container' style={{width: '20rem',paddingTop:'3rem',}}>
        <form onSubmit={register} className="row g-3" id='submit-field'>
          <div className="form-outline" id='username'>
            <input id='form2Example1' type="text" className="form-control" name="username" placeholder="Enter username"/>
            <label className="form-label" htmlFor="form2Example1">Enter username</label>
          </div>

          <div className="form-outline" id='password1'>
            <input id='form2Example2' type="password" className="form-control" name="password" placeholder="Enter password"/>
            <label id='password-ID' className="form-label" htmlFor="form2Example2">Enter password</label>
          </div>

          <div className="form-outline" id='password2'>
            <input id='form2Example3' type="password" className="form-control" name="password2" placeholder="Repeat password"/>
            <label className="form-label" htmlFor="form2Example3">Repeat password</label>
          </div>

          <div className="form-outline" id='email'>
            <input id='form2Example4' type="email" className="form-control" name="email" placeholder="Enter email address"/>
            <label className="form-label" htmlFor="form2Example4">Enter email address</label>
          </div>

          <button id='btn-submit-register' type="submit" className="btn btn-primary btn-block" onSubmit={register}>Register</button>           
        </form>
    </div>
  )
}

export default Register