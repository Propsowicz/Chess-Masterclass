import React from 'react'
import {url} from '../../../constants/urlAPI'

const CreateStudyTable = (props) => {

    let createNewTable = async () => {
        let response = await fetch(`${url}/api/study/detail/${props.author}/${props.id}/table/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    'method': 'CREATE'
                }
            )
        })
        window.location.reload(false)
    }
    
  return (
    <div className="container">
        {props.isLogged
        ?
            <div className="row g-0">
                <button className="btn btn-outline-success" type='button' onClick={createNewTable}>Create new table</button>
            </div>
        :
            <></>
        }        
    </div>
  )
}

export default CreateStudyTable