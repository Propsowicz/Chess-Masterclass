import React, {useContext} from 'react'
import {UserContext} from '../context/UserContext'


const Register = () => {
    let {register} = useContext(UserContext)


  return (
    <div>
        <form onSubmit={register}>
            <input type='text' name='username' placeholder='Please set username'/>
            <input type='password' name='password' placeholder='Please set pass'/>
            <input type='password' name='password2' placeholder='pass 2'/>
            <input type='email' name='email'placeholder='email' />

            <button type='submit'>Zarejestruj się!</button>
        </form>
    </div>
  )
}

export default Register