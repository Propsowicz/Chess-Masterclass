import React, {useState, useEffect} from 'react'
import CourseListItem from './CourseListItem'
import { useLocation, useParams  } from 'react-router-dom'


export const CoursesList = (props) => {
    let location = useLocation()
    let page = useParams().page

    // create empty list of courses with can be overwrtten
    let [coursesList, setCoursesList] = useState([])

    // function which call for api port with list of all courses
    let coursesGET = async () => {
        // if(props.filter){
        //     let response = await fetch(`http://127.0.0.1:8000/api/courses/filter/free`)
        //     let data = await response.json()
        //     setCoursesList(data)
        // }else{
        // let filterPath = 'filter'
        // for (let key in props.filter){
        //     if(props.filter[key]){
        //         filterPath = filterPath + `;${key}`
        //     }            
        //   }
        // console.log(filterPath)

        let response = await fetch(`http://127.0.0.1:8000/api/courses/${props.filter}/${props.page}`)
        let data = await response.json()
        console.log(data.data)
        setCoursesList(data.data)
        

        // if(location.pathname === '/'){
        //     let response = await fetch(`http://127.0.0.1:8000/api/courses/page/${props.page}`)
        //     let data = await response.json()
        //     setCoursesList(data)
        // }else{
        //     let response = await fetch(`http://127.0.0.1:8000/api/courses/page/${props.page}`)
        //     let data = await response.json()
        //     setCoursesList(data)            
        // } 
        // }     
    }

    // effect function to check if there is an API call possible
    useEffect(() => {
        coursesGET()
    }, [props.filter, props.page])
    
  return (
    <div  className="row row-cols-1 row-cols-md-4 g-4">
        {coursesList.map((course, index) => (
            <CourseListItem key={index} name={course.name} body={course.body} price={course.price} id={course.id} slug={course.slug} premiumPlan={course.premiumPlan}/>
        ))}

    </div>
  )
}
