import React, {useContext} from 'react'
import {
    useParams,
    Link
} from 'react-router-dom'
import {UserContext} from '../context/UserContext'
import LogedUserDropDown from './LogedUserDropDown'
import NotLoggedUser from './NotLoggedUser'

const Header = () => {
  let {userInfo} = useContext(UserContext)
  let {logout} = useContext(UserContext)
  console.log({userInfo})

  // 
  var user = '{{request.user}}'
    function getToken(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const csrftoken = getToken('csrftoken');

    let sendTokens = () =>{
          // const url =  "{% url 'edit-profile-api' %}"
          const url =  "http://127.0.0.1:8000/member/edit/api"
          fetch(url, {
              method:'POST',
              headers:{
                  'Content-Type':'application/json',
                  'X-CSRFToken': csrftoken,
              },
            //   body:JSON.stringify(userInfo.username)
              body:JSON.stringify(userInfo.username)
          })       
      }
      
  return (
    <div>             
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <Link to={'/'} className='nav-link'>Chess masterclass</Link>
              </li>

              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
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