import React, {useContext} from 'react'
import {
    useParams,
    Link
} from 'react-router-dom'
import {UserContext} from '../context/UserContext'

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
      <p>Hello {userInfo.username}</p>
        {userInfo.username ? <a onClick={logout}>Logout</a> : <Link to={'/login'}>Login</Link>}
        <Link to={'/'}><h1>Chess masterclass</h1></Link>
        <Link to={'register'}><h1>register</h1></Link>

        {/* <a onClick={sendTokens} href='http://127.0.0.1:8000/member/edit/'>Edit</a> */}

        
        
    </div>
  )
}

export default Header