import React, {useEffect, useState} from 'react'
import { BsFillHeartFill } from 'react-icons/bs'


const LikeHeart = (props) => {
    function likeOnClick(e){props.handleOnClick(e)}
    const [color, setColor] = useState('black')

    // let checkIfLiked = (props) => {        
    //     // if(courseDetails.liked_courses.indexOf(1) === -1){            
    //     if(props.liked_by.indexOf(props.user) === -1){        
    //         console.log('black')
    //         setColor('black')
    //     }else{
    //         console.log('red')
    //         setColor('red')
    //     }
    // }

    useEffect(() => {
    }, [props.color])
    

    let colors = {
        true: 'red',
        false: 'black',
    }

  return (
    <>
        <BsFillHeartFill color={colors[props.isLiked]} onClick={likeOnClick} />     
    </>
  )
}

export default LikeHeart