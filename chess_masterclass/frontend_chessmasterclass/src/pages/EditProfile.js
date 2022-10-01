import React, {useState, useContext, useEffect} from 'react'
import {UserContext} from '../context/UserContext'
import {
    useParams, 
    useNavigate,
    Link   
} from 'react-router-dom'

const EditProfile = () => {
    let [userData, setUserData] = useState([])
    let navigateLogin = useNavigate()

    let {userInfo} = useContext(UserContext)
    let username = useParams().username

    let getUserData = async ()  => {
        let response = await fetch(`http://127.0.0.1:8000/member/api/edit/${username}`)
        let data = await response.json()
        setUserData(data)
    }
    console.log(userData)

    function isAuthenticated(username, userInfo){
      if(username === userInfo.username){
        return true
      }else{
        return false
      }
    }


    let navigateToLogin = () => {
      navigateLogin('/login')
    }

    useEffect(() => {
      getUserData()
    }, [])

  return (
    
    <div className='container' style={{paddingTop:'3rem'}}>
      {isAuthenticated(username, userInfo) ? 
        <div style={{textAlign:'left',}}>
          <h2>Profile info:</h2>
          <table className="table table-striped-columns">            
            <tbody>
              <tr>
                <td style={{width:'15rem'}}>Username:</td>
                <th>{userData.username}</th>              
              </tr>
              <tr>
                <td style={{width:'15rem'}}>Email address:</td>
                <th>{userData.email} <Link to={`/profile/${username}/edit/email`} className='fst-italic' style={{fontSize:'0.8rem'}}>EDIT</Link></th>              
              </tr>
              <tr>
                <td style={{width:'15rem'}}>First Name:</td>
                <th>{userData.first_name} <Link to={`/profile/${username}/edit/name`} className='fst-italic' style={{fontSize:'0.8rem'}}>EDIT</Link></th>              
              </tr>
              <tr>
                <td style={{width:'15rem'}}>Last Name:</td>
                <th>{userData.last_name} <Link to={`/profile/${username}/edit/name`} className='fst-italic' style={{fontSize:'0.8rem'}}>EDIT</Link></th>              
              </tr>
              <tr>
                <td style={{width:'15rem'}}>Credit:</td>
                <th>{userData.credit}$</th>              
              </tr>
              <tr>
                <td style={{width:'15rem'}}>Expiration day:</td>
                <th>{userData.expiration_date}</th>              
              </tr>                        
            </tbody>
          </table>       
        </div>
          :
            navigateToLogin()
          }
           
    </div>
  )
}

export default EditProfile