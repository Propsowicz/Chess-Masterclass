import React from 'react'

const CreateStudyTable = (props) => {

    let createNewTable = async () => {
        let response = await fetch(`http://127.0.0.1:8000/api/study/detail/${props.author}/${props.id}/table/create`, {
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