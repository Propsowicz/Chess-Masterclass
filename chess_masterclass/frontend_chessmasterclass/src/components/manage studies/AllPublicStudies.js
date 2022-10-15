import React from 'react'

const AllPublicStudies = (props) => {

    function changePrivacy(e){props.handleOnChange(e)}

  return (
    <div  className='study-btn-div'>
        <button id ="all-public-studies" type="button" className={props.className} onClick={changePrivacy}>All studies</button>    
    </div>
  )
}

export default AllPublicStudies