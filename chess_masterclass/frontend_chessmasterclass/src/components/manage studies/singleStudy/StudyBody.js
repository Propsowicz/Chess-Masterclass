import React from 'react'
import '../../../css/Study.css'
import {url} from '../../../constants/urlAPI'

const StudyBody = (props) => {

    let editBody = async (e) => {
        let response = await fetch(`${url}/api/study/detail/${props.author}/${props.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('authTokens') ? `Bearer ${JSON.parse(localStorage.getItem('authTokens')).access}` : null,
        },
        body: JSON.stringify(
            {
            'body': e.target.value
            }           
        )
        })
        let data = await response.json()    
    }

  return (
    <div>
        {props.isLogged
        ?
            <textarea className='study-body-textarea' onKeyUp={editBody} defaultValue={props.body}></textarea>
        :
            <span className="fs-6">{props.body}</span> 
        }
        

    </div>
  )
}

export default StudyBody