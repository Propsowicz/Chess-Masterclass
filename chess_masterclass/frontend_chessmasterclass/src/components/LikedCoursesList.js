import React, {useState, useEffect, useContext} from 'react'
import CourseListItem from './CourseListItem'
import { useLocation, useParams  } from 'react-router-dom'
import {UserContext} from '../context/UserContext'

export const LikedCoursesList = (props) => {
    let location = useLocation()
    let page = useParams().page
    let {userInfo} = useContext(UserContext)
    let username = userInfo.username
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

        let response = await fetch(`http://127.0.0.1:8000/api/courses/${username}/${props.sort_by}/${props.filter}/${props.search}/${props.page}`)
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
    }, [props.filter, props.page, props.sort_by, props.search])
    
  return (
    <div  className="row row-cols-1 row-cols-md-4 g-4">
        {coursesList.map((course, index) => (
            <CourseListItem key={index} name={course.name} body={course.body} price={course.price} id={course.id} slug={course.slug} premiumPlan={course.premiumPlan} representChessTable={course.representationChessBoard}/>
        ))}

    </div>
  )
}
export default LikedCoursesList