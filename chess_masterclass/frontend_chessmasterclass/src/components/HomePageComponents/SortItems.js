import React, {useEffect} from 'react'

const SortItems = (props) => {

    function sortingOnClick(e){props.handleOnClick(e)}

    let dropDownItems = document.querySelectorAll('.dropdown-item')

    let checkSelectedSorting = () => {
        for(let i = 0; i < dropDownItems.length; i++){
            if(dropDownItems[i].value === props.sort_by){
                console.log('selected: ' + dropDownItems[i].value)
                dropDownItems[i].style.background = '#ABABAB'
            }else{
                dropDownItems[i].style.background = null
            }
        }
    }

    useEffect(() => {
        checkSelectedSorting()
    }, [props.sort_by])

  return (
    <div className="dropdown-center" style={{paddingRight:'1rem'}}>
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Sort by:
        </button>
        <ul className="dropdown-menu">
        <li><button className="dropdown-item" value='name' onClick={sortingOnClick}>Name (a - z)</button></li>
        <li><button className="dropdown-item" value='-name' onClick={sortingOnClick}>Name (z - a)</button></li>
        <li><button className="dropdown-item" value='price' style={{background:'#ABABAB'}} onClick={sortingOnClick}>Premium Plan Price (low - high)</button></li>
        <li><button className="dropdown-item" value='-price' onClick={sortingOnClick}>Premium Plan Price (high - low)</button></li>
        </ul>
    </div>
  )
}

export default SortItems