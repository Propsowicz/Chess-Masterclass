import React from 'react'
import {Link} from 'react-router-dom'

const GoToStudy = (props) => {
  return (
    <div>
        <Link to={`/study/author-${props.author}/${props.id}`}>Go to study</Link>

    </div>
  )
}

export default GoToStudy