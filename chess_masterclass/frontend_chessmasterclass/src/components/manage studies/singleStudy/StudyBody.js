import React from 'react'
import '../../../css/Study.css'


const StudyBody = (props) => {

    // UPDATE DATA -- start
    let editBody = async (e) => {
        let response = await fetch(`http://127.0.0.1:8000/api/study/detail/${props.author}/${props.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
            'body': e.target.value
            }
           
        )
        })
        let data = await response.json()    
    }
  // UPDATE DATA -- end

  return (
    <div>
        {props.isLogged
        ?
            <textarea className='study-body-textarea' onKeyUp={editBody}>{props.body}</textarea>
        :
            <p className="fs-6">{props.body}</p> 
        }
        

    </div>
  )
}

export default StudyBody