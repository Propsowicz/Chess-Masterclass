import React, {useState, useEffect} from 'react'
import StudiesListItem from './StudiesListItem'

const StudiesList = (props) => {
    let [studyList, setStudyList] = useState([])


    let getStudies = async () => {
        let response = await fetch(`http://127.0.0.1:8000/api/study/${props.user}/${props.access}/${props.privacy}/${props.liked}/${props.search}/${props.sort}/${props.page}`)
        let data = await response.json()
        setStudyList(data.data)
    }


    useEffect(() => {
        getStudies()
    }, [props.page, props.access, props.privacy, props.liked, props.search, props.sort])

  return (
    <div  className="row row-cols-1 row-cols-md-4 g-4" >
        {studyList.map((study, index) => (
            <StudiesListItem name={study.name} body={study.body} author={study.username} representationChessBoard={study.representationChessBoard} slug={study.slug}/>
        ))}
        

    </div>
  )
}

export default StudiesList