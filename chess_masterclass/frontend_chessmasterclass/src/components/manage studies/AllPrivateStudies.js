import React from 'react'
import {Link} from 'react-router-dom'

const AllPrivateStudies = (props) => {

    function changePrivacy(e){props.handleOnChange(e)}

  return (
    <div className='study-btn-div'>

      {props.isLogged ?
        <button id ="all-private-studies" type="button" className={props.className} onClick={changePrivacy}>All studies</button>
      : 
        <Link to='/login' id ="all-private-studies" type="button" className={props.className} onClick={changePrivacy}>All studies</Link>
      }      
    </div>
  )
}

export default AllPrivateStudies