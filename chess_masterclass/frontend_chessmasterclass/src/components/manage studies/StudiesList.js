import React, {useState, useEffect} from 'react'
import StudiesListItem from './StudiesListItem'
import {url} from '../../constants/urlAPI'

const StudiesList = (props) => {
    let [studyList, setStudyList] = useState([])
    let getStudies = async () => {
        let response = await fetch(`${url}/api/study/${props.user}/${props.access}/${props.privacy}/${props.liked}/${props.search}/${props.sort}/${props.page}`)
        let data = await response.json()
        setStudyList(data.data)
    }

    useEffect(() => {
        getStudies()
    }, [props.page, props.access, props.privacy, props.liked, props.search, props.sort])

  return (
    <div  className="row row-cols-1 row-cols-md-4 g-4" >
        {studyList.map((study, index) => (
            <StudiesListItem key={index} name={study.name} body={study.body} author={study.username} representationChessBoard={study.representationChessBoard} id={study.id} likes={study.number_of_likes}/>
        ))}
        

    </div>
  )
}

export default StudiesList