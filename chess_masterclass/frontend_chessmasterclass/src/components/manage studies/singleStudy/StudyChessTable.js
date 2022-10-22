import React from 'react'
import StudyChessBoard from './StudyChessBoard'
import StudyChessTableBody from './StudyChessTableBody'
import {url} from '../../../constants/urlAPI'


const StudyChessTable = (props) => {

    let deleteTable = async () => {
        let response = await fetch(`${url}/api/study/detail/${props.author}/${props.id}/table/${props.tableId}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    'msg': 'delete'
                }
            )
        })
        window.location.reload(false)
    }

    let setRepresentative = async () => {
        let response = await fetch(`${url}/api/study/detail/${props.author}/${props.id}/table/${props.tableId}/set-repr`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    'coord': props.coord
                }
            )
        })
        window.location.reload(false)
    }

  return (
    <div className='container'>

        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-4">
                    <StudyChessBoard coord={props.coord} size={400} isLogged={props.isLogged} tableId={props.tableId} author={props.author} id={props.id}/>                    
                </div>
                <div className="col-md-8">
                    <StudyChessTableBody text={props.text} isLogged={props.isLogged} tableId={props.tableId} author={props.author} id={props.id}/>                
                </div>
                {props.isLogged
                ?   
                    <>
                        <button type='button' className="btn btn-outline-info" onClick={setRepresentative}>Set as representative table</button>
                        <button type='button' className="btn btn-outline-danger" onClick={deleteTable}>Delete table</button>
                    </>                    
                :
                    <></>
                }
                
            </div>
        </div>


    </div>
  )
}

export default StudyChessTable