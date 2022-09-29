import React, {useState, useEffect} from 'react'
import CourseListItem from './CourseListItem'


export const CoursesList = () => {

    // create empty list of courses with can be overwrtten
    let [coursesList, setCoursesList] = useState([])

    // function which call for api port with list of all courses
    let coursesGET = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/courses/')
        let data = await response.json()
        setCoursesList(data)
    }

    // effect function to check if there is an API call possible
    useEffect(() => {
        coursesGET()
    }, [])
    
  return (
    <div>
        {coursesList.map((course, index) => (
            <CourseListItem key={index} name={course.name} body={course.body} price={course.price} id={course.id}/>
        ))}

    </div>
  )
}
