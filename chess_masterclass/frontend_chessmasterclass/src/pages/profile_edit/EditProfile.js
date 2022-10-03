import React, {useState, useContext, useEffect} from 'react'
import {UserContext} from '../../context/UserContext'
import {
    useParams, 
    useNavigate,
    Link   
} from 'react-router-dom'
import {premiumPlanName} from '../../utils/utlis'

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

    function isAuthenticated(username, userInfo){
      if(username === userInfo.username){
        return true
      }else{
        return false
      }
    } 

    let checkForMsgs = () => {
      if(localStorage.getItem('success msg')){
        let msgDiv = document.querySelector('#success-div')
        let msgBar = document.createElement('p')
        let msg = localStorage.getItem('success msg')

        msgBar.innerText = msg
        msgBar.style.color = 'green'
        msgDiv.appendChild(msgBar)
        setTimeout(() => {
          msgDiv.removeChild(msgBar)
          localStorage.clear()
        }, 3000)
      }
    }

    let navigateToLogin = () => {
      navigateLogin('/login')
    }  

    useEffect(() => {
      getUserData()
      checkForMsgs()
    }, [])

  return (
    
    <div className='container' style={{paddingTop:'3rem'}} id='success-div'>
      {isAuthenticated(username, userInfo) ? 
        <div style={{textAlign:'left',}} >
          <h2>Profile info:</h2>
          <table className="table table-striped-columns">            
            <tbody>
              <tr>
                <td style={{width:'15rem'}}>Username:</td>
                <th>{userData.username} <Link to={`/profile/${username}/edit/pass`} className='fst-italic' style={{fontSize:'0.8rem'}}>EDIT PASSWORD</Link></th>              
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
                <td style={{width:'15rem'}}>Current Premium Plan:</td>
                <th>{premiumPlanName(userInfo)}</th>              
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