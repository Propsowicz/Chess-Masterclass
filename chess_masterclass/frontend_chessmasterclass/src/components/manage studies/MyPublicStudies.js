import React from 'react'

const MyPublicStudies = (props) => {
    function changePrivacy(e){props.handleOnChange(e)}
  return (
    <div  className='study-btn-div'>
        <button id ="my-public-studies" type="button" className={props.className} onClick={changePrivacy}>My public studies</button>    
    </div>
  )
}

export default MyPublicStudies