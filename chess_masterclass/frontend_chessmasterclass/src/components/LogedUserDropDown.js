import React, {useContext} from 'react'
import {UserContext} from '../context/UserContext'
import {Link} from 'react-router-dom'


const LogedUserDropDown = () => {
    let {userInfo} = useContext(UserContext)
    let {logout} = useContext(UserContext)

  return (
    <div>
        <ul className="navbar-nav mb-2 mb-lg-0 d-flex">
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {userInfo.username}
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="#">Liked courses</a></li>
                <li><Link to={`profile/${userInfo.username}`} className='dropdown-item'>Profile</Link></li>                  
                <li><a className="dropdown-item" onClick={logout} style={{cursor: 'pointer'}}>Logout</a></li>
            </ul>
            </li>
        </ul>
    </div>
    

  )
}

export default LogedUserDropDown