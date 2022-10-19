import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const StudyManagment = (props) => {
    let navigate = useNavigate()

    let checkIfPrivate = (props) => {
        if(props.privacy === true){
            return 'Public'
        }else{
            return 'Private'
        }
    }

    let changePrivacy = async () => {
        let response = await fetch(`http://127.0.0.1:8000/api/study/detail/${props.author}/${props.id}/table/change-privacy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    'method': 'PRIVACY',
                    'current_privacy': props.privacy,
                }
            )
        })
        navigate('/study')
    }

    let deleteStudy = async () => {
        let response = await fetch(`http://127.0.0.1:8000/api/study/detail/${props.author}/${props.id}/table/delete-study`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    'method': 'DELETE-STUDY',
                }
            )
        })
        navigate('/study')
    }


  return (
    <>
        {props.isLogged
        ?
            <div class="btn-group dropstart" style={{float:'right'}}>
                <button type="button" class="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Edit
                </button>
                <ul class="dropdown-menu">
                    <li><button type="button" class="btn btn-light" onClick={changePrivacy}>Set as {checkIfPrivate(props)}</button></li>
                    <li><button type="button" class="btn btn-light" onClick={deleteStudy}>Delete Study</button></li>
                </ul>
            </div>
        :
            <></>
        }
        
    </>
    
  )
}

export default StudyManagment