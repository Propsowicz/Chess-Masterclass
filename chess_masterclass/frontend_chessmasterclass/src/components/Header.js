import React, {useContext} from 'react'
import {    
    Link
} from 'react-router-dom'
import {UserContext} from '../context/UserContext'
import LogedUserDropDown from './LogedUserDropDown'
import NotLoggedUser from './NotLoggedUser'

const Header = () => {
  let {userInfo} = useContext(UserContext)
      
  return (
    <div>             
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">  
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>        
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <Link to={'/'} className='nav-link'>Chess masterclass</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/liked">Liked Courses</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/study">Studies</Link>
              </li>           
                               
            </ul>
            {userInfo.username ? <LogedUserDropDown /> : <NotLoggedUser />}           
          </div>
        </div>
      </nav>       
    </div>
  )
}

export default Header