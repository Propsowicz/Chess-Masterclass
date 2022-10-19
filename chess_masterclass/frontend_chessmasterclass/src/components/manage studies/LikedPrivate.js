import React from 'react'
import {Link} from 'react-router-dom'


const LikedPrivate = (props) => {
    function changeLiked(e){props.handleOnChange(e)}
  return (
    <div  className='study-btn-div'>
      {props.isLogged
      ?
        <button id ="liked-private-studies" type="button" className={props.className} onClick={changeLiked}>Liked studies</button>
      : 
        <Link to='/login' id ="liked-private-studies" type="button" className={props.className} onClick={changeLiked}>Liked studies</Link>
      }            
    </div>
  )
}

export default LikedPrivate