import React, {useContext} from 'react'
import { Link } from 'react-router-dom'


const NotLoggedUser = () => {
  return (
    <div>
        <ul className="navbar-nav mb-2 mb-lg-0 d-flex">
            <li className="nav-item dropdown">
                    <Link to='login' className='nav-link'>Login</Link>
            </li>
        </ul>  
    </div>
    
  )
}

export default NotLoggedUser