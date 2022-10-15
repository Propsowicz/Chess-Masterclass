import React, {useState, useEffect, useContext} from 'react'
import {UserContext} from '../../context/UserContext'
import {useNavigate} from 'react-router-dom'
import {alertMsg} from '../../utils/utlis'


const CreateStudy = (e) => {
    let {userInfo} = useContext(UserContext)

     function successAlertMsg(){
        let alert = document.createElement('div')
        alert.className = 'alert alert-success'
        alert.innerText = "New Study has been created. For now it's for your usage only. Wait 5 minutes till creating new one."
        document.getElementById('create-new-study').appendChild(alert)
        setTimeout(() => {
            document.getElementById('create-new-study').removeChild(alert)
        }, 3000)
     }


    let createNewStudy = async (e) => {
        e.preventDefault()
        let response = await fetch(`http://127.0.0.1:8000/api/study/${userInfo.username}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
            console.log('Study has been created..')
        }
    }


  return (

    <div id='create-new-study' className='study-btn-div'>
        <button id='create-new-study-btn' type="button" class="btn btn-secondary" onClick={createNewStudy}>Create new study</button>    
        
    </div>
    
  )
}

export default CreateStudy