import React, {useContext, useState, useEffect} from 'react'
import SideBar from '../../components/Studies/SideBar'
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

  // BUTTONS CLASSNAME -- start

  // let [selectedBtn, setSelectedBtn] = useState('all-public-studies')
  // let [list_of_btns, setList_of_btns] = useState(['all-public-studies', 'all-private-studies', 'my-public-studies', 'liked-public-studies', 'liked-private-studies'])

  let [selectedBtn, setSelectedBtn] = useState({
    'all-public-studies': 'btn btn-primary',
    'all-private-studies': 'btn btn-secondary',
    'my-public-studies': 'btn btn-secondary',
    'liked-public-studies': 'btn btn-secondary',
    'liked-private-studies': 'btn btn-secondary',
  })

  // let showSelectedBtn = () => {
  //   // list_of_btns = ['all-public-studies', 'all-private-studies', 'my-public-studies', 'liked-public-studies', 'liked-private-studies']
  //   document.getElementById(list_of_btns[0]).className = 'btn btn-primary'

  //   for(let i = 0; i < list_of_btns.length; i++){
  //     if(i === selectedBtn){
  //       console.log('im in ok')
  //       document.getElementById(i).className = 'btn btn-primary'
  //     }else{
  //       console.log('im in not ok')
  //       document.getElementById(i).className = 'btn btn-secondary'
  //     }
  //   }
  // }


// BUTTONS CLASSNAME -- end

  // user > access > private > liked > search > sort > page

  // PAGINATOR -- start
  const [page, setPage] = useState(1)
  const [totalPageNumber, setTotalPageNumber] = useState([])
  const [pagesList, setPagesList] = useState([])

  let getStudies = async () => {
    let response = await fetch(`http://127.0.0.1:8000/api/study/${userInfo.username}/${access}/${isPrivate}/${liked}/${search}/${sort}/${page}`)
    let data = await response.json()
    console.log(data)


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


  useEffect(() => {
    getStudies()
    // showSelectedBtn()
    console.log(selectedBtn)
    console.log('is liked ?  ' + liked)
    console.log(sort)
    console.log(totalPageNumber)
  }, [page, totalPageNumber, access, isPrivate, liked, search, sort, selectedBtn])

  return (
    <div> 
      <div className="accordion" id="accordionPanelsStayOpenExample" style={{width: '18rem', zIndex: '99', position: 'fixed', paddingTop: '3rem'}}>
        <div className="accordion-item drop-down-div">
          <h2 className="accordion-header" id="panelsStayOpen-headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
              Public
            </button>
          </h2>
          <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
            <div className="accordion-body">
              <AllPublicStudies handleOnChange={changePrivacyToPublic} className={selectedBtn['all-public-studies']}/>
              <MyPublicStudies handleOnChange={changetoMyPublicStudies} className={selectedBtn['my-public-studies']}/>
              <LikedPublic handleOnChange={changetoMyPublicLikedStudies} className={selectedBtn['liked-public-studies']}/>
            </div>
          </div>
        </div>
        <div className="accordion-item drop-down-div">
          <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
              Private
            </button>
          </h2>
          <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingTwo">
            <div className="accordion-body">
                <AllPrivateStudies handleOnChange={changePrivacyToPrivate} className={selectedBtn['all-private-studies']}/>
                <CreateStudy />
                <LikedPrivate handleOnChange={changetoMyPrivateLikedStudies} className={selectedBtn['liked-private-studies']}/>
            </div>
          </div>
        </div>
        <div className="accordion-item drop-down-div">
          <h2 className="accordion-header" id="panelsStayOpen-headingThree">
            <button className="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
              View Managment
            </button>
          </h2>
          <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingThree">
            <div className="accordion-body">
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