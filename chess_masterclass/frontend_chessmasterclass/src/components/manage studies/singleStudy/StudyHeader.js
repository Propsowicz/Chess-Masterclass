import React, {useEffect, useState} from 'react'
import LikeHeart from '../../LikeHeart'
import '../../../css/Study.css'
import {url} from '../../../constants/urlAPI'


const StudyHeader = (props) => {
  
  function textAreaWidth(props){
    let length = props.name.length
    return length / 1.5
  }

  // UPDATE DATA -- start
  let editTitle = async (e) => {
    let response = await fetch(`${url}/api/study/detail/${props.author}/${props.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          'name': e.target.value
        }
        
      )
    })
    let data = await response.json()    
  }
  // UPDATE DATA -- end

  // LIKE STUDY -- start
  function likeOnClick(e){props.handleOnClick(e)}
  // LIKE STUDY -- end


  useEffect(() => {
  },[props.author,])

  return (
    <div>
      {props.isLogged
        ?
          <div className="fs-1 grid-study-header">
              <div>
                <textarea type='text' className='study-header-textarea' style={{width:`${textAreaWidth(props)}em`}} onKeyUp={editTitle} defaultValue={props.name}></textarea>
              </div>
              <div>
                <span className='study-header-label'>by {props.author}</span> <LikeHeart handleOnClick={likeOnClick} isLiked={props.isLiked}/><span style={{fontSize:'0.6em', color:'grey'}}>{props.likes}</span>
              </div>              
            </div>
        :
          <p className="fs-1">{props.name} by {props.author} <LikeHeart handleOnClick={likeOnClick} isLiked={props.isLiked}/><span style={{fontSize:'0.6em', color:'grey'}}>{props.likes}</span></p>
      }
      
    </div>
  )
}

export default StudyHeader