import React from 'react'
import {Link} from 'react-router-dom'


const LikedPublic = (props) => {
    function changeLiked(e){props.handleOnChange(e)}
  return (
    <div  className='study-btn-div'>
      {props.isLogged
      ?
        <button id ="liked-public-studies" type="button" className={props.className} onClick={changeLiked}>Liked studies</button>
      :
        <Link to='/login' id ="liked-public-studies" type="button" className={props.className} onClick={changeLiked}>Liked studies</Link> 
      }
            
    </div>
  )
}

export default LikedPublic