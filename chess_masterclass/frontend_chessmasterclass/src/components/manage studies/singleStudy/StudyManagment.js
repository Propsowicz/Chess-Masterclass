import React from 'react'
import {useNavigate} from 'react-router-dom'
import {url} from '../../../constants/urlAPI'

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
        let response = await fetch(`${url}/api/study/detail/${props.author}/${props.id}/table/change-privacy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('authTokens') ? `Bearer ${JSON.parse(localStorage.getItem('authTokens')).access}` : null,
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
        let response = await fetch(`${url}/api/study/detail/${props.author}/${props.id}/table/delete-study`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('authTokens') ? `Bearer ${JSON.parse(localStorage.getItem('authTokens')).access}` : null,
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
            <div className="btn-group dropstart" style={{float:'right'}}>
                <button type="button" className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Edit
                </button>
                <ul className="dropdown-menu">
                    <li><button type="button" className="btn btn-light" onClick={changePrivacy}>Set as {checkIfPrivate(props)}</button></li>
                    <li><button type="button" className="btn btn-light" onClick={deleteStudy}>Delete Study</button></li>
                </ul>
            </div>
        :
            <></>
        }
        
    </>
    
  )
}

export default StudyManagment