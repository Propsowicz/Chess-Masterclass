import React, {useContext} from 'react'
import {UserContext} from '../../context/UserContext'
import {Link} from 'react-router-dom'
import {alertMsg} from '../../utils/utlis'
import {url} from '../../constants/urlAPI'


const CreateStudy = (props) => {
    let {userInfo} = useContext(UserContext)

     function successAlertMsg(){
        let alert = document.createElement('div')
        alert.className = 'alert alert-success'
        alert.innerText = "New Study has been created. For now it's for your usage only. Wait 5 minutes till creating new one."
        document.getElementById('create-new-study').appendChild(alert)
        setTimeout(() => {
            document.getElementById('create-new-study').removeChild(alert)
        }, 5000)
     }


    let createNewStudy = async (e) => {
        e.preventDefault()
        let response = await fetch(`${url}/api/study/${userInfo.username}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('authTokens') ? `Bearer ${JSON.parse(localStorage.getItem('authTokens')).access}` : null,
            },
            body: JSON.stringify(
                {
                    'msg': 'create deafult study',
                }
                ),
        })
        let data = await response.json()

        if(response.status === 401){
            alertMsg('create-new-study', data.msg, 'create-new-study-btn',)
        }else{
            successAlertMsg()
        }
    }

  return (

    <div id='create-new-study' className='study-btn-div'>
        {props.isLogged
        ?
            <button id='create-new-study-btn' type="button" className="btn btn-secondary" onClick={createNewStudy}>Create new study</button>
        :
            <Link to='/login' id='create-new-study-btn' type="button" className="btn btn-secondary" >Create new study</Link>
        }            
    </div>
    
  )
}

export default CreateStudy