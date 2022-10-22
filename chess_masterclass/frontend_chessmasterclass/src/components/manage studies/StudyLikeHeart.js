import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'


const StudyLikeHeart = (props) => {
  return (
    <>
        <AiOutlineHeart title={'likes'} size={'0.9em'} color={'gray'}/> <span style={{fontSize:'0.8em', color:'grey', marginLeft:'-0.3em'}}>{props.text}</span>
        
    </>
  )
}

export default StudyLikeHeart