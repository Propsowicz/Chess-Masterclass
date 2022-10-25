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
            <span className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {userInfo.username}
            </span>
            <ul className="dropdown-menu dropdown-menu-end">
                <li><Link to={`profile/${userInfo.username}`} className='dropdown-item'>Profile</Link></li>                  
                <li><Link to={`payment/premium-plans/`} className='dropdown-item'>Premium Plans</Link></li>                  
                <li><span className="dropdown-item" onClick={logout} style={{cursor: 'pointer'}}>Logout</span></li>
            </ul>
            </li>
        </ul>
    </div>
    

  )
}

export default LogedUserDropDown