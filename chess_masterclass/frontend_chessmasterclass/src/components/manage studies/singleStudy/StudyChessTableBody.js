import React, {useEffect} from 'react'
import '../../../css/Study.css'

const StudyChessTableBody = (props) => {

    let editChessTableBody = async (e) => {
        let response = await fetch(`http://127.0.0.1:8000/api/study/detail/${props.author}/${props.id}/table/${props.tableId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
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
            <textarea className='study-chess-table-body' onKeyUp={editChessTableBody}>{props.text}</textarea>
        :   
            <p className="card-text" style={{marginLeft: '0%', textAlign: 'left'}}>{props.text}</p>
        }
        
    </div>
  )
}

export default StudyChessTableBody