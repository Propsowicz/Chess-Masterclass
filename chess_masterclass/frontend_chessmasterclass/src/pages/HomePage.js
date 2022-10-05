import React from 'react'
import { CoursesList } from '../components/CoursesList'
import Paginator from '../components/Paginator'

const HomePage = () => {
  
    
  return (
    <div className='container' style={{paddingTop:'3rem'}}>
        <CoursesList />
        <Paginator />
    </div>
  )
}

export default HomePage