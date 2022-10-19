import React from 'react'
import LikeHeart from '../LikeHeart'
import ChessDiv from '../ChessDiv'

const NotEditableCourseContent = (props) => {

    function likeCourse(e){props.handleOnClick(e)}

  return (
    <div>               
        <p className="fs-1">{props.name} <LikeHeart handleOnClick={likeCourse} isLiked={props.isLiked}/></p>
        <p className="fs-6">{props.body}</p>   
        {props.chessTables.map((table, index) => (
            <ChessDiv key={index} text={table.text} coord={table.coord} />
        ))}     
    </div>
  )
}

export default NotEditableCourseContent