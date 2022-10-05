import React, { useState, useEffect } from 'react'
import { useLocation, useParams, Link  } from 'react-router-dom'


const Paginator = (props) => {
   
    let location = useLocation()
    let currentPage = useParams()
    let [totalPageNumber, setTotalPageNumber] = useState([])
    let [pagesList, setPagesList] = useState([])

    let getTotalPageNumber = async () => {
        let reponse = await fetch('http://127.0.0.1:8000/api/courses/page/total-page-number')
        let data = await reponse.json()
        setTotalPageNumber(data.total_page_number)
        localStorage.setItem('last_page_index', data.total_page_number)

        if(location.pathname === '/'){
            setPagesList([1, 2, 3])   
        }else if(location.pathname === '/page/1'){
            setPagesList([1, 2, 3])     
        }else if(location.pathname === `/page/${data.total_page_number}`){
            let page = data.total_page_number
            setPagesList([page - 2, page - 1, page])     
        }else{
            let page = parseFloat(currentPage.page)
            setPagesList([page - 1, page, page + 1, ])
        }
        
    }

    let isLast = () => {
        if(currentPage.page === localStorage.getItem('last_page_index')){
            return true
        }else{
            return false
        }
    }
    
    let isFirst = () => {
        if(currentPage.page === '1' || location.pathname === '/'){
            return true
        }else{
            return false
        }
    }

    let nextPageFromHomePage = () => {
        if(location.pathname === '/'){
            return '/page/2'
        }else{
            return `/page/${parseFloat(currentPage.page) + 1}`
        }
    }

    useEffect(() => {
        getTotalPageNumber()
        
    }, [])

  return (
    <div style={{paddingTop: '3rem'}}>
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    {isFirst() ? <Link className="page-link disabled" to="#">Previous</Link> : <Link className="page-link" to={`/page/${parseFloat(currentPage.page) - 1}`} onClick={useEffect}>Previous</Link> }
                </li>
                <li className="page-item"><Link className="page-link" to={`/page/${pagesList[0]}`} onClick={useEffect}>{pagesList[0]}</Link></li>
                <li className="page-item"><Link className="page-link" to={`/page/${pagesList[1]}`} onClick={useEffect}>{pagesList[1]}</Link></li>
                <li className="page-item"><Link className="page-link" to={`/page/${pagesList[2]}`} onClick={useEffect}>{pagesList[2]}</Link></li>
                <li className="page-item">
                    {isLast() ? <Link className="page-link disabled" to="#">Next</Link> : <Link className="page-link" to={nextPageFromHomePage()} onClick={useEffect}>Next</Link> }                
                </li>
            </ul>
        </nav>




    </div>
  )
}

export default Paginator