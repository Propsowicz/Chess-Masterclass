import React from 'react'
import {Link} from 'react-router-dom'


const MyPublicStudies = (props) => {
    function changePrivacy(e){props.handleOnChange(e)}
  return (
    <div  className='study-btn-div'>
      {props.isLogged
      ?
        <button id ="my-public-studies" type="button" className={props.className} onClick={changePrivacy}>My public studies</button>
      :
        <Link to='/login' id ="my-public-studies" type="button" className={props.className} onClick={changePrivacy}>My public studies</Link>       
      }
            
    </div>
  )
}

export default MyPublicStudies