import React, {useState, useEffect} from 'react'
import { CoursesList } from '../components/CoursesList'
import Filtering from '../components/HomePageComponents/Filtering'
import Paginator from '../components/HomePageComponents/Paginator'
import {Link} from 'react-router-dom'
import SortItems from '../components/HomePageComponents/SortItems'
import SearchItems from '../components/HomePageComponents/SearchItems'

const HomePage = () => {

// PAGINATOR
  let [page, setPage] = useState(1)
  let [totalPageNumber, setTotalPageNumber] = useState([])
  let [pagesList, setPagesList] = useState([])
  let [representChessTable, setRepresentChessTable] = useState({})

  let getTotalPageNumber = async () => {      
      let filterPath = 'filter'
        for (let key in filter){
            if(filter[key]){
                filterPath = filterPath + `;${key}`
            }            
          }        
          setFilterURL(filterPath)

      let response = await fetch(`http://127.0.0.1:8000/api/courses/${sortBy}/${filterPath}/${searchString}/${page}`)
      let data = await response.json()
      console.log(data.number_of_pages)
      setTotalPageNumber(parseFloat(data.number_of_pages))
      setRepresentChessTable(data.course_main_chesstable_coors)
      localStorage.setItem('last_page_index', data.number_of_pages)
      
      let pageBtns = document.querySelectorAll('button[data-paginator]')
      if(data.number_of_pages < 3){        
        for(let i = 0; i < pageBtns.length; i++){
          setPagesList([1, 2, 3])
          pageBtns[i].className = 'page-link disabled'
        }
      }else{      
        for(let i = 0; i < pageBtns.length; i++){
          pageBtns[i].className = 'page-link'
        }
        if(page === 1){
          setPagesList([1, 2, 3])
        }else if(page === totalPageNumber){
          setPagesList([totalPageNumber - 2, totalPageNumber - 1, totalPageNumber])
        }else{
          setPagesList([page - 1, page, page + 1])
        }
    }        
  }

  let isLast = () => {
    if(page === totalPageNumber){
        return true
    }else{
        return false
    }
  }

  let isFirst = () => {
    if(page === 1){
        return true
    }else{
        return false
    }
  }
  let selectPage = (e) => {
    setPage(parseFloat(e.target.value))
  }
    
  let nextPage = () => {
    setPage(page => page + 1)
  }
  let previousPage = () => {
    setPage(page => page - 1)
  }

// END
// FILTER
let premiumPlansNames = {
  free: 'Free',
  master: 'Master',
  im: 'International Master',
  gm: 'Grandmaster'
}

let [filter, setFilter] = useState({
  'free': false,
  'master': false,
  'international master': false,
  'grandmaster': false,
})

let [filterUrl, setFilterURL] = useState('filter')
  let FilterHandler = (e) => {    
    setFilter(filter => ({...filter, [e.target.value]: !filter[e.target.value]}))    
      
}
// END

// SORT
let [sortBy, setSortBy] = useState('price')

let sortHandler =  (e) => {
  setSortBy(e.target.value)
}

// END

// SEARCH
let [searchString, setSearchString] = useState('search')
let searchHandler = (e) => {
  let searchText = e.target.value
  if(searchText === ''){
    setSearchString('search')
  }else{
    setSearchString(e.target.value)
  }    
}

// END


// USEEFFECT
useEffect(() => {
  // console.log(filter)
  // console.log('is not a number?: ' + page)
  // console.log('total page number: ' + totalPageNumber)
  // console.log(representChessTable)
  // console.log(sortBy)
  getTotalPageNumber()
},[filter, page, totalPageNumber, sortBy, searchString])

  return (
    <div className='container' style={{paddingTop:'0rem'}}>
      <div className="accordion accordion-flush" id="accordionFlushExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingOne">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
              View Managment
            </button>
          </h2>
          <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
            <div className='nav navbar-expand bg-light' style={{paddingTop:'1rem'}}>      
              <SortItems handleOnClick={sortHandler} sort_by={sortBy} />
              
              <Filtering value={premiumPlansNames.free} handleOnChange={FilterHandler}/>
              <Filtering value={premiumPlansNames.master} handleOnChange={FilterHandler}/>
              <Filtering value={premiumPlansNames.im} handleOnChange={FilterHandler}/>
              <Filtering value={premiumPlansNames.gm} handleOnChange={FilterHandler}/>
                           
              <SearchItems handleOnKeyUp={searchHandler} />   
            </div>
          </div>
        </div>                
      </div>
         
        

      <CoursesList filter={filterUrl} page={page} sort_by={sortBy} search={searchString} representChessTable={representChessTable}/>

      <Paginator previousPageHandler={previousPage} nextPageHandler={nextPage} selectPageHandler={selectPage} page_list={pagesList} isFirst={isFirst()} isLast={isLast()} page={page}/>
      
    </div>
  )
}

export default HomePage