import React, {useEffect} from 'react'
import LikeHeart from '../LikeHeart'
import ChessDiv from '../ChessDiv'
import ChessDivEditable from '../manage courses/ChessDivEditable'

const EditableCourseContent = (props) => {
    function likeCourse(e){props.handleOnClick(e)}

    let upgradeTitle = async (e) => {
        let response = await fetch(`http://127.0.0.1:8000/api/course/creator-mode/edit/${props.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    'method': 'TITLE',
                    'title': e.target.value,
                }
            )
        })
    }

    let upgradeCourseBody = async (e) => {
        let response = await fetch(`http://127.0.0.1:8000/api/course/creator-mode/edit/${props.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    'method': 'COURSE-BODY',
                    'body': e.target.value,
                }
            )
        })
    }
    

  return (
    <div>
                     
        <p className="fs-1" style={{display:'flex', justifyContent:'center', alignItems:'center'}}><textarea type='text' className='study-header-textarea' defaultValue={props.name} style={{width:'25em'}} onKeyUp={upgradeTitle}></textarea><LikeHeart handleOnClick={likeCourse} isLiked={props.isLiked}/></p>
        <p className="fs-6"><textarea type='text' className='study-body-textarea' defaultValue={props.body} onKeyUp={upgradeCourseBody}></textarea></p>   
        {props.chessTables.map((table, index) => (
            <ChessDivEditable key={index} text={table.text} coord={table.coord} id={table.id} courseId={props.id} user={props.user}/>
        ))}     
    </div>
  )
}

export default EditableCourseContent