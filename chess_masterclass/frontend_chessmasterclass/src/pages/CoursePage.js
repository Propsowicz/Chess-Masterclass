import React, { useState, useEffect, useContext } from 'react'
import {UserContext} from '../context/UserContext'
import {checkCurrentPremiumPlan} from '../utils/utlis'
import {url} from '../constants/urlAPI'
import {
    useParams,    
    useNavigate
} from 'react-router-dom'
import NotEditableCourseContent from '../components/manage courses/NotEditableCourseContent'
import EditableCourseContent from '../components/manage courses/EditableCourseContent'

const CoursePage = () => {
    let {userInfo} = useContext(UserContext)
    let navigate = useNavigate()
    const [isCourseLiked, setIsColorLiked] = useState(false)
    const [isUserCreator, setIsUserCreator] = useState(userInfo.user_creator)

    // get dynamic ID (from App.js course/:id)
    let courseSlug = useParams().slug

    // COURSE DETAIL -- start
    let [courseDetails, setCourseDetails] = useState([])
    let [chessTables, setChessTables] = useState([])

    let courseDetailGET = async () => {
        let response = await fetch(`${url}/api/courses/${courseSlug}`)
        let data = await response.json()
        setCourseDetails(data)
        console.log(data)

        if(!checkCurrentPremiumPlan(data, userInfo)){              
            navigate('/')
        }

        if(data.liked_by.indexOf(userInfo.user_id) === -1){        
            setIsColorLiked(false)
        }else{
            setIsColorLiked(true)
        }
    }
    // COURSE DETAIL -- end
        
    // CHESS TABLES GET -- start
    let tablesGET = async () => {
        let response = await fetch(`${url}/api/courses/${courseSlug}/table`)
        let data = await response.json()
        setChessTables(data)
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
        setIsColorLiked(!isCourseLiked)
    }

    let checkIfUserIsCreator = () => {
        if(userInfo.user_creator === 'False'){
            return false
        }else{
            return true
        }
    }
    // CHESS TABLES GET -- end   

    useEffect(() => {
        courseDetailGET()
        tablesGET()        
    }, [courseDetails.premiumPlan, isUserCreator])    
    
  return (
    <div className='container'>
            {checkIfUserIsCreator()
            ?
                <EditableCourseContent name={courseDetails.name} handleOnClick={likeCourse} isLiked={isCourseLiked} body={courseDetails.body} chessTables={chessTables} id={courseDetails.id} user={userInfo.username}/>
            :
                <NotEditableCourseContent name={courseDetails.name} handleOnClick={likeCourse} isLiked={isCourseLiked} body={courseDetails.body} chessTables={chessTables} />
            }         
    </div>
  )
}

export default CoursePage