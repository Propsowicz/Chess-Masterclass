import React, {useState, useEffect} from 'react'
import CourseListItem from './CourseListItem'
import { useLocation, useParams  } from 'react-router-dom'


export const CoursesList = () => {
    let location = useLocation()
    let page = useParams().page

    // create empty list of courses with can be overwrtten
    let [coursesList, setCoursesList] = useState([])

    // function which call for api port with list of all courses
    let coursesGET = async () => {
        if(location.pathname === '/'){
            let response = await fetch(`http://127.0.0.1:8000/api/courses/page/1`)
            let data = await response.json()
            setCoursesList(data)
        }else{
            let response = await fetch(`http://127.0.0.1:8000/api/courses/page/${page}`)
            let data = await response.json()
            setCoursesList(data)            
        }      
    }

    // effect function to check if there is an API call possible
    useEffect(() => {
        coursesGET()
    }, [])
    
  return (
    <div  className="row row-cols-1 row-cols-md-4 g-4">
        {coursesList.map((course, index) => (
            <CourseListItem key={index} name={course.name} body={course.body} price={course.price} id={course.id} slug={course.slug} premiumPlan={course.premiumPlan}/>
        ))}

    </div>
  )
}
