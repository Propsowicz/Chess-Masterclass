import React, { useState, useEffect, useContext } from 'react'
import {UserContext} from '../context/UserContext'
import {checkCurrentPremiumPlan} from '../utils/utlis'
import { BsFillHeartFill } from 'react-icons/bs'
import {url} from '../constants/urlAPI'

import {
    useParams,
    Link,
    useNavigate
} from 'react-router-dom'
import ChessDiv from '../components/ChessDiv'
import LikeHeart from '../components/LikeHeart'
import NotEditableCourseContent from '../components/manage courses/NotEditableCourseContent'
import EditableCourseContent from '../components/manage courses/EditableCourseContent'

const CoursePage = () => {
    let {userInfo} = useContext(UserContext)
    let navigate = useNavigate()
    const [isCourseLiked, setIsColorLiked] = useState(false)
    const [isUserCreator, setIsUserCreator] = useState(userInfo.user_creator)

    // get dynamic ID (from App.js course/:id)
    let courseSlug = useParams().slug

    // list of course detail
    let [courseDetails, setCourseDetails] = useState([])
    let [chessTables, setChessTables] = useState([])

    // fetch course details
    let courseDetailGET = async () => {
        let response = await fetch(`${url}/api/courses/${courseSlug}`)
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
        let response = await fetch(`${url}/api/courses/${courseSlug}/table`)
        let data = await response.json()
        setChessTables(data)
        console.log(data)

    }

   

    let checkPermission = () => {
        if(!checkCurrentPremiumPlan(courseDetails, userInfo)){  
            console.log('tu co jest? :' + courseDetails.premiumPlan)          
            console.log(checkCurrentPremiumPlan(courseDetails, userInfo))
            // navigateToHomePage()
        }
    }

    let likeCourse = async () => {
        let response = await fetch(`${url}/api/courses/${userInfo.username}/${courseDetails.id}`, {
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

    let checkIfUserIsCreator = () => {
        if(userInfo.user_creator === 'False'){
            return false
        }else{
            return true
        }
    }
    
    

    // effect function to check if there is an API call possible
    useEffect(() => {
        courseDetailGET()
        tablesGET()
        
        // console.log(checkIfLiked())
        // checkPermission()
    }, [courseDetails.premiumPlan, isUserCreator])

    
    
    let navigateToHomePage = () => {
        navigate('/')
    }  

  return (
    <div className='container'>
            {checkIfUserIsCreator()
            ?
                <EditableCourseContent name={courseDetails.name} handleOnClick={likeCourse} isLiked={isCourseLiked} body={courseDetails.body} chessTables={chessTables} id={courseDetails.id} user={userInfo.username}/>
            :
                <NotEditableCourseContent name={courseDetails.name} handleOnClick={likeCourse} isLiked={isCourseLiked} body={courseDetails.body} chessTables={chessTables} />
            }
            {/* <div>
                
                <p className="fs-1">{courseDetails.name} <LikeHeart handleOnClick={likeCourse} isLiked={isCourseLiked}/></p>
                <p className="fs-6">{courseDetails.body}</p>   
                {chessTables.map((table, index) => (
                    <ChessDiv key={index} text={table.text} coord={table.coord} />
                ))}


            </div> */}
          

    </div>
  )
}

export default CoursePage