import React, {useEffect} from 'react'

const SortStudies = (props) => {

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
    <div>
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Sort by:
        </button>
        <ul className="dropdown-menu">
            <li><button className="dropdown-item" value='name' onClick={sortingOnClick}>Name (a - z)</button></li>
            <li><button className="dropdown-item" value='-name' onClick={sortingOnClick}>Name (z - a)</button></li>
            <li><button className="dropdown-item" value='-likes' style={{background:'#ABABAB'}} onClick={sortingOnClick}>Popular</button></li>
        </ul>

    </div>
  )
}

export default SortStudies