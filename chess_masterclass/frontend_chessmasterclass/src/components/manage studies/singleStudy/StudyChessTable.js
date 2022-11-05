import React from 'react'
import StudyChessBoard from './StudyChessBoard'
import StudyChessTableBody from './StudyChessTableBody'
import {url} from '../../../constants/urlAPI'
import {alertMsg} from '../../../utils/utlis'

const StudyChessTable = (props) => {

    let deleteTable = async () => {
        let response = await fetch(`${url}/api/study/detail/${props.author}/${props.id}/table/${props.tableId}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('authTokens') ? `Bearer ${JSON.parse(localStorage.getItem('authTokens')).access}` : null,
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
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('authTokens') ? `Bearer ${JSON.parse(localStorage.getItem('authTokens')).access}` : null,
            },
            body: JSON.stringify(
                {
                    'coord': props.coord
                }
            )
        })
        alertMsg(`chess-content-div${props.tableId}`, 'The representative table has been changed.', `chess-content-btn${props.tableId}`)

        // window.location.reload(false)
    }

  return (
    <div className='container'>

        <div className="card mb-3">
            <div className="row g-0" id={'chess-content-div' + props.tableId}>
                <div className="col-md-4">
                    <StudyChessBoard coord={props.coord} size={400} isLogged={props.isLogged} tableId={props.tableId} author={props.author} id={props.id}/>                    
                </div>
                <div className="col-md-8">
                    <StudyChessTableBody text={props.text} isLogged={props.isLogged} tableId={props.tableId} author={props.author} id={props.id}/>                
                </div>
                {props.isLogged
                ?   
                    <>
                        <button type='button' id={'chess-content-btn' + props.tableId} className="btn btn-outline-info" onClick={setRepresentative}>Set as representative table</button>
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