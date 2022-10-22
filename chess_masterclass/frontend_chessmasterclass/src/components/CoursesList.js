import React, {useState, useEffect} from 'react'
import CourseListItem from './CourseListItem'
import {url} from '../constants/urlAPI'

export const CoursesList = (props) => {  
    // GET DATA -- start
    let [coursesList, setCoursesList] = useState([])
    let coursesGET = async () => {
        let response = await fetch(`${url}/api/courses/${props.sort_by}/${props.filter}/${props.search}/${props.page}`)
        let data = await response.json()
        setCoursesList(data.data)            
    }
    // GET DATA -- end    

    useEffect(() => {
        coursesGET()
    }, [props.filter, props.page, props.sort_by, props.search])
    
  return (
    <div  className="row row-cols-1 row-cols-md-4 g-4">
        {coursesList.map((course, index) => (
            <CourseListItem key={index} name={course.name} body={course.body} price={course.price} id={course.id} slug={course.slug} premiumPlan={course.premiumPlan} representChessTable={course.representationChessBoard}/>
        ))}

    </div>
  )
}

