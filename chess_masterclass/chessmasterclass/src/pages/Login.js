import React, {useContext} from 'react'
import { UserContext } from '../context/UserContext'

const Login = () => {

  // get hook func(login()) from UserContext.js
  let {login} = useContext(UserContext)

  return (
    <div>
        <form onSubmit={login}>
            <input type="text" name="username" placeholder="Enter username"/>
            <input type="password" name="password" placeholder="Enter password"/>
            <input type="submit"/>
        </form>
    </div>
  )
}

export default Login

