import React, { useState, useEffect, useContext } from 'react'
import {UserContext} from '../context/UserContext'
import {checkCurrentPremiumPlan} from '../utils/utlis'
import { BsFillHeartFill } from 'react-icons/bs'

import {
    useParams,
    Link,
    useNavigate
} from 'react-router-dom'
import ChessBoard from '../components/ChessBoard'

const CoursePage = () => {
    let {userInfo} = useContext(UserContext)
    let navigate = useNavigate()
    
    // get dynamic ID (from App.js course/:id)
    let courseSlug = useParams().slug

    // list of course detail
    let [courseDetails, setcourseDetails] = useState([])
    let [chessTables, setChessTables] = useState([])

    // fetch course details
    let courseDetailGET = async () => {
        let response = await fetch(`http://127.0.0.1:8000/api/courses/${courseSlug}`)
        let data = await response.json()
        setcourseDetails(data)
    }
        
    // function which call for api port with chess tables
    let tablesGET = async () => {
        let response = await fetch(`http://127.0.0.1:8000/api/courses/${courseSlug}/table`)
        let data = await response.json()
        setChessTables(data)
    }

    let checkIfLiked = () => {        
        if(userInfo.liked_courses.indexOf(courseSlug) === -1){            
            return false
        }else{
            return true
        }
    }

    let checkPermission = () => {
        if(!checkCurrentPremiumPlan(courseDetails, userInfo)){
            navigate()
        }
    }

    // effect function to check if there is an API call possible
    useEffect(() => {
        console.log(checkIfLiked())
        courseDetailGET()
        tablesGET()
        checkPermission()
    }, [])

    
    

    let navigateToHomePage = () => {
        navigate('/')
    }  

  return (
    <div className='container'>
            <div>
                <p className="fs-1">{courseDetails.name} {checkIfLiked() ? <BsFillHeartFill color='red' /> : <BsFillHeartFill color='black' />}</p>
                <p className="fs-6">{courseDetails.body}</p>   
                {chessTables.map((table, index) => (
                    <ChessBoard key={index} text={table.text} coord={table.coord} />
                ))}

                
            </div>
          

    </div>
  )
}

export default CoursePage