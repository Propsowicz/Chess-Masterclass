import React, {useState, useEffect} from 'react'
import { CoursesList } from '../components/CoursesList'
import Filtering from '../components/Filtering'
import Paginator from '../components/Paginator'
import {Link} from 'react-router-dom'

const HomePage = () => {

// PAGINATOR
  let [page, setPage] = useState(1)
  let [totalPageNumber, setTotalPageNumber] = useState([])
  let [pagesList, setPagesList] = useState([])

  let getTotalPageNumber = async () => {
      // let reponse = await fetch('http://127.0.0.1:8000/api/courses/page/total-page-number')
      // let data = await reponse.json()
      // setTotalPageNumber(data.total_page_number)
      let filterPath = 'filter'
        for (let key in filter){
            if(filter[key]){
                filterPath = filterPath + `;${key}`
            }            
          }
          setFilterURL(filterPath)

      let response = await fetch(`http://127.0.0.1:8000/api/courses/${filterPath}/${page}`)
      let data = await response.json()
      console.log(data.number_of_pages)
      setTotalPageNumber(parseFloat(data.number_of_pages))
      localStorage.setItem('last_page_index', data.number_of_pages)



      
      let pageBtns = document.querySelectorAll('button[data-paginator]')
      if(data.number_of_pages < 3){        
        for(let i = 0; i < pageBtns.length; i++){
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
let [filter, setFilter] = useState({
  'free': false,
  'master': false,
  'international master': false,
  'grandmaster': false,
})

let [filterUrl, setFilterURL] = useState('filter')


  let freeFilterHandler = (e) => {    
    setFilter(filter => ({...filter, [e.target.value]: !filter[e.target.value]}))    
    // setFilter(!filter)  
    // sessionStorage.setItem('freeFilter', freeFilter)    
}
// setTheObject(prevState => ({ ...prevState, currentOrNewKey: newValue}));
  

// USEEFFECT
useEffect(() => {
  console.log(filter)
  console.log(page)
  console.log('total page number: ' + totalPageNumber)
  getTotalPageNumber()
},[filter, page, totalPageNumber])

  return (
    <div className='container' style={{paddingTop:'3rem'}}>
        <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" id="free" value="free" onChange={freeFilterHandler} defaultChecked={false}  />
              <label className="form-check-label" htmlFor="inlineCheckbox1">Free</label>
        </div>
        <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" id="free" value="master" onChange={freeFilterHandler} defaultChecked={false}  />
              <label className="form-check-label" htmlFor="inlineCheckbox1">Master</label>
        </div>
        <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" id="free" value="international master" onChange={freeFilterHandler} defaultChecked={false}  />
              <label className="form-check-label" htmlFor="inlineCheckbox1">International Master</label>
        </div>
        <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" id="free" value="grandmaster" onChange={freeFilterHandler} defaultChecked={false}  />
              <label className="form-check-label" htmlFor="inlineCheckbox1">Grandmaster</label>
        </div>

        <CoursesList filter={filterUrl} page={page}/>






      <div style={{paddingTop: '3rem'}}>
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    {isFirst() ? <button className="page-link disabled" to="#">Previous</button> : <button className="page-link" onClick={previousPage}>Previous</button> }
                </li>
                <li className="page-item"><button className="page-link" data-paginator onClick={selectPage} value={pagesList[0]}>{pagesList[0]}</button></li>
                <li className="page-item"><button className="page-link" data-paginator onClick={selectPage} value={pagesList[1]}>{pagesList[1]}</button></li>
                <li className="page-item"><button className="page-link" data-paginator onClick={selectPage} value={pagesList[2]}>{pagesList[2]}</button></li>
                <li className="page-item">
                    {isLast() ? <button className="page-link disabled" to="#">Next</button> : <button className="page-link" onClick={nextPage}>Next</button> }                
                </li>
            </ul>
        </nav>
    </div>
    </div>
  )
}

export default HomePage