import React, {useContext} from 'react'
import { UserContext } from '../context/UserContext'
import { Link } from 'react-router-dom'
import LoginMsg from '../developer_componenets/LoginMsg'

const Login = () => {
  let {login} = useContext(UserContext)
  
  return (
    <div className='container-sm' style={{width: '20rem',paddingTop:'3rem',}}>
        <form onSubmit={login} className="row g-3" id='login-form'>    
              
          <div className="form-outline">
            <input id='form2Example1' type="text" className="form-control" name="username" placeholder="Enter username"/>
            <label className="form-label" htmlFor="form2Example1">Username</label>
          </div>

          <div className="form-outline">
            <input id='form2Example2' type="password" className="form-control" name="password" placeholder="Enter password"/>
            <label className="form-label" htmlFor="form2Example2">Password</label>
          </div>

          <div className="row">
            <div className="col">
              <Link to={'/forgot-pass'}>Forgot password?</Link>
            </div>
          </div>

          <button id='btn-login' type="submit" className="btn btn-primary btn-block ">Sign in</button>

          <div className="text-center">
            <p>Not a member? <Link to={'/register'}>Register!</Link></p>       
          </div>   
        </form>
        <LoginMsg />
    </div>
  )
}

export default Login

