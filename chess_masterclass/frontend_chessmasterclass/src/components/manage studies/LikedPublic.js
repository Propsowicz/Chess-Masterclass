import React from 'react'

const LikedPublic = (props) => {
    function changeLiked(e){props.handleOnChange(e)}
  return (
    <div  className='study-btn-div'>
        <button id ="liked-public-studies" type="button" className={props.className} onClick={changeLiked}>Liked studies</button>    
    </div>
  )
}

export default LikedPublic