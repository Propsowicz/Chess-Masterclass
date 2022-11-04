import React, {useEffect} from 'react'
import '../../../css/Study.css'
import {url} from '../../../constants/urlAPI'


const StudyChessTableBody = (props) => {

    let editChessTableBody = async (e) => {
        let response = await fetch(`${url}/api/study/detail/${props.author}/${props.id}/table/${props.tableId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('authTokens') ? `Bearer ${JSON.parse(localStorage.getItem('authTokens')).access}` : null,
            },
            body: JSON.stringify(
                {
                    'text': e.target.value
                }
            )
        })        
    }
    
    useEffect(() => {
    },[props.author])

  return (
    <div className="card-body">
        {props.isLogged
        ?
            <textarea className='study-chess-table-body' onKeyUp={editChessTableBody} defaultValue={props.text}></textarea>
        :   
            <p className="card-text" style={{marginLeft: '0%', textAlign: 'left'}}>{props.text}</p>
        }
        
    </div>
  )
}

export default StudyChessTableBody