import React, {useEffect, useState} from 'react'
import { BsFillHeartFill } from 'react-icons/bs'

const LikeHeart = (props) => {
    function likeOnClick(e){props.handleOnClick(e)}
    const [color, setColor] = useState('black')
   
    useEffect(() => {
    }, [props.color])    

    let colors = {
        true: 'red',
        false: 'black',
    }

  return (
    <>
        <BsFillHeartFill color={colors[props.isLiked]} onClick={likeOnClick} style={{'cursor':'pointer'}}/>     
    </>
  )
}

export default LikeHeart