import React from 'react'

const SearchItems = (props) => {
    
    function searchOnKeyUp(e){props.handleOnKeyUp(e)}

  return (
    <div className="container-fluid">
        <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onKeyUp={searchOnKeyUp}/>
        </form>
    </div>
  )
}

export default SearchItems