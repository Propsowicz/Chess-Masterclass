import React, { useState, useEffect, useContext } from 'react'
import {UserContext} from '../context/UserContext'
import {checkCurrentPremiumPlan} from '../utils/utlis'

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

    // fetch course details
    let courseDetailGET = async () => {
        let response = await fetch(`http://127.0.0.1:8000/api/courses/${courseSlug}`)
        let data = await response.json()
        setcourseDetails(data)
    }
    
    // effect function to check if there is an API call possible
    useEffect(() => {
        courseDetailGET()
    }, [])

    let getPrice = (price) => {        
        if(price === '0.00'){
            return price = 'FREE'
        }else{
            return price
        }
    }      

    let navigateToHomePage = () => {
        navigate('/')
    }  

  return (
    <div className='container'>
        {checkCurrentPremiumPlan(courseDetails, userInfo) ?
            <div>
                <p className="fs-1">{courseDetails.name}</p>
                <p className="fs-6">{courseDetails.body}</p>   
                <ChessBoard />
            </div>
            :
            navigateToHomePage()
        }
        

    </div>
  )
}

export default CoursePage