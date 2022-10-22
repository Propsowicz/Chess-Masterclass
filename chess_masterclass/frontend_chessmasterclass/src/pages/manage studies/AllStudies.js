import React, {useContext, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Filtering from '../../components/HomePageComponents/Filtering'
import SortItems from '../../components/HomePageComponents/SortItems'
import SearchItems from '../../components/HomePageComponents/SearchItems'
import Paginator from '../../components/HomePageComponents/Paginator'
import CreateStudy from '../../components/manage studies/CreateStudy'
import {UserContext} from '../../context/UserContext'
import StudiesList from '../../components/manage studies/StudiesList'
import SortStudies from '../../components/manage studies/SortStudies'
import '../../css/Studies.css'
import AllPublicStudies from '../../components/manage studies/AllPublicStudies'
import AllPrivateStudies from '../../components/manage studies/AllPrivateStudies'
import MyPublicStudies from '../../components/manage studies/MyPublicStudies'
import LikedPublic from '../../components/manage studies/LikedPublic'
import LikedPrivate from '../../components/manage studies/LikedPrivate'

const AllStudies = () => {
  let {userInfo} = useContext(UserContext)
  // BUTTONS NAME -- start
  let [selectedBtn, setSelectedBtn] = useState({
    'all-public-studies': 'btn btn-primary',
    'all-private-studies': 'btn btn-secondary',
    'my-public-studies': 'btn btn-secondary',
    'liked-public-studies': 'btn btn-secondary',
    'liked-private-studies': 'btn btn-secondary',
  })
  // BUTTONS NAME -- end

  // PAGINATOR -- start
  const [page, setPage] = useState(1)
  const [totalPageNumber, setTotalPageNumber] = useState([])
  const [pagesList, setPagesList] = useState([])

  let getStudies = async () => {
    let response = await fetch(`http://127.0.0.1:8000/api/study/${userInfo.username}/${access}/${isPrivate}/${liked}/${search}/${sort}/${page}`)
    let data = await response.json()
      setTotalPageNumber(parseFloat(data.number_of_pages))
     
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
// PAGINATOR -- end

// ACCESS -- start
let [access, setAccess] = useState('public')

let changePrivacyToPublic = (e) => {
  setLiked(false)
  setAccess('public')
  setIsPrivate(false)
  setSelectedBtn({
    'all-public-studies': 'btn btn-primary',
    'all-private-studies': 'btn btn-secondary',
    'my-public-studies': 'btn btn-secondary',
    'liked-public-studies': 'btn btn-secondary',
    'liked-private-studies': 'btn btn-secondary',
  })
}
let changePrivacyToPrivate = (e) => {
  setLiked(false)
  setAccess('private')
  setIsPrivate(false)
  setSelectedBtn({
    'all-public-studies': 'btn btn-secondary',
    'all-private-studies': 'btn btn-primary',
    'my-public-studies': 'btn btn-secondary',
    'liked-public-studies': 'btn btn-secondary',
    'liked-private-studies': 'btn btn-secondary',
  })
}
// ACCESS -- end

// PRIVATE -- start
let [isPrivate, setIsPrivate] = useState(false)

let changetoMyPublicStudies = (e) => {
  setLiked(false)
  setAccess('public')
  setIsPrivate(true)
  setSelectedBtn({
    'all-public-studies': 'btn btn-secondary',
    'all-private-studies': 'btn btn-secondary',
    'my-public-studies': 'btn btn-primary',
    'liked-public-studies': 'btn btn-secondary',
    'liked-private-studies': 'btn btn-secondary',
  })
}
// PRIVATE -- end

// LIKED -- start
let [liked, setLiked] = useState(false)

let changetoMyPublicLikedStudies = (e) => {
  setLiked(true)
  setAccess('public')
  setIsPrivate(false)
  setSelectedBtn({
    'all-public-studies': 'btn btn-secondary',
    'all-private-studies': 'btn btn-secondary',
    'my-public-studies': 'btn btn-secondary',
    'liked-public-studies': 'btn btn-primary',
    'liked-private-studies': 'btn btn-secondary',
  })
}

let changetoMyPrivateLikedStudies = (e) => {
  setLiked(true)
  setAccess('private')
  setIsPrivate(false)
  setSelectedBtn({
    'all-public-studies': 'btn btn-secondary',
    'all-private-studies': 'btn btn-secondary',
    'my-public-studies': 'btn btn-secondary',
    'liked-public-studies': 'btn btn-secondary',
    'liked-private-studies': 'btn btn-primary',
  })
}
// LIKED -- end

// SEARCH -- start
let [search, setSearch] = useState('search')

let handleSearch = (e) => {
  let searchText = e.target.value
  if(searchText === ''){
    setSearch('search')
  }else{
    setSearch(e.target.value)
  }  
}
// SEARCH -- end

// SORT -- start
let [sort, setSort] = useState('-likes')

let handleSort = (e) => {
  setSort(e.target.value)
}
// SORT -- end

// CHECK IF USER IS LOGGED -- start
let [loggedStatus, setLoggedStatus] = useState(false)

let isUserLogged = () => {
  if(typeof(userInfo.username) === 'undefined'){
    setLoggedStatus(false)
  }else{
    setLoggedStatus(true)
  }
}
// CHECK IF USER IS LOGGED -- end

  useEffect(() => {
    getStudies()
    isUserLogged()    
  }, [page, totalPageNumber, access, isPrivate, liked, search, sort, selectedBtn])

  return (
    <div> 
      <div className="accordion resp-accordion" id="accordionPanelsStayOpenExample" style={{width: '18rem', zIndex: '99', position: 'fixed', paddingTop: '3rem'}}>
        <div className="accordion-item drop-down-div">
          <h2 className="accordion-header" id="panelsStayOpen-headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
              Studies Managment
            </button>
          </h2>
          <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
            <div className="accordion-body">
              <p className='fw-bolder study-header'>Public Studies</p>
              <hr className='break-line'></hr>
              <AllPublicStudies handleOnChange={changePrivacyToPublic} className={selectedBtn['all-public-studies']} />
              <MyPublicStudies handleOnChange={changetoMyPublicStudies} className={selectedBtn['my-public-studies']} isLogged={loggedStatus}/>
              <LikedPublic handleOnChange={changetoMyPublicLikedStudies} className={selectedBtn['liked-public-studies']} isLogged={loggedStatus}/>
              <p className='fw-bolder study-header'>Private Studies</p>
              <hr className='break-line'></hr>
              <AllPrivateStudies handleOnChange={changePrivacyToPrivate} className={selectedBtn['all-private-studies']} isLogged={loggedStatus}/>              
              <LikedPrivate handleOnChange={changetoMyPrivateLikedStudies} className={selectedBtn['liked-private-studies']} isLogged={loggedStatus}/>
              <hr className='break-line'></hr>
              <CreateStudy isLogged={loggedStatus} />
              <hr className='break-line'></hr>
              <SortStudies handleOnClick={handleSort} sort_by={sort} />
              <SearchItems handleOnKeyUp={handleSearch}/>
            </div>
          </div>
        </div>        
      </div>
      <div className='container'>
        <StudiesList user={userInfo.username} privacy={isPrivate} liked={liked} search={search} sort={sort} page={page} access={access}/>
        <Paginator previousPageHandler={previousPage} nextPageHandler={nextPage} selectPageHandler={selectPage} page_list={pagesList} isFirst={isFirst()} isLast={isLast()} page={page}/>
      </div>
    </div>
  )
}

export default AllStudies