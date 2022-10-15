import React from 'react'

const AllPrivateStudies = (props) => {

    function changePrivacy(e){props.handleOnChange(e)}

  return (
    <div className='study-btn-div'>
        <button id ="all-private-studies" type="button" className={props.className} onClick={changePrivacy}>All studies</button>    
    </div>
  )
}

export default AllPrivateStudies