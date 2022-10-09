import React, { useState, useEffect, useContext } from 'react'
import {UserContext} from '../context/UserContext'
import {checkCurrentPremiumPlan} from '../utils/utlis'
import { BsFillHeartFill } from 'react-icons/bs'

import {
    useParams,
    Link,
    useNavigate
} from 'react-router-dom'
import ChessDiv from '../components/ChessDiv'
import LikeHeart from '../components/LikeHeart'

const CoursePage = () => {
    let {userInfo} = useContext(UserContext)
    let navigate = useNavigate()
    const [isCourseLiked, setIsColorLiked] = useState(false)

    // get dynamic ID (from App.js course/:id)
    let courseSlug = useParams().slug

    // list of course detail
    let [courseDetails, setCourseDetails] = useState([])
    let [chessTables, setChessTables] = useState([])

    // fetch course details
    let courseDetailGET = async () => {
        let response = await fetch(`http://127.0.0.1:8000/api/courses/${courseSlug}`)
        let data = await response.json()
        setCourseDetails(data)
        console.log(data)

        if(!checkCurrentPremiumPlan(data, userInfo)){              
            navigateToHomePage()
        }

        if(data.liked_by.indexOf(userInfo.user_id) === -1){        
            setIsColorLiked(false)
        }else{
            setIsColorLiked(true)
        }
    }
        
    // function which call for api port with chess tables
    let tablesGET = async () => {
        let response = await fetch(`http://127.0.0.1:8000/api/courses/${courseSlug}/table`)
        let data = await response.json()
        setChessTables(data)
        console.log(data)

    }

    // let checkIfLiked = () => {        
    //     // if(courseDetails.liked_courses.indexOf(1) === -1){            
    //     if(courseDetails.liked_by.indexOf(1) === -1){        
    //         console.log(courseDetails.liked_by)
    //         console.log(typeof(courseDetails.liked_by[0]))
    //         console.log(typeof(1))
    //         console.log(userInfo.user_id)
    //         return false
    //     }else{
    //         return true
    //     }
    // }

    let checkPermission = () => {
        if(!checkCurrentPremiumPlan(courseDetails, userInfo)){  
            console.log('tu co jest? :' + courseDetails.premiumPlan)          
            console.log(checkCurrentPremiumPlan(courseDetails, userInfo))
            // navigateToHomePage()
        }
    }

    let likeCourse = async () => {
        let response = await fetch(`http://127.0.0.1:8000/api/courses/${userInfo.username}/${courseDetails.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'course_id': courseDetails.id, 'username': userInfo.username
            })
        })
        let status = await response.json()
        console.log(status)
        setIsColorLiked(!isCourseLiked)
    }


    

    // effect function to check if there is an API call possible
    useEffect(() => {
        courseDetailGET()
        tablesGET()
        // console.log(checkIfLiked())
        // checkPermission()
    }, [courseDetails.premiumPlan, ])

    
    

    let navigateToHomePage = () => {
        navigate('/')
    }  

  return (
    <div className='container'>
            <div>
                <p className="fs-1">{courseDetails.name} <LikeHeart handleOnClick={likeCourse} isLiked={isCourseLiked}/></p>
                <p className="fs-6">{courseDetails.body}</p>   
                {chessTables.map((table, index) => (
                    <ChessDiv key={index} text={table.text} coord={table.coord} />
                ))}

                
            </div>
          

    </div>
  )
}

export default CoursePage