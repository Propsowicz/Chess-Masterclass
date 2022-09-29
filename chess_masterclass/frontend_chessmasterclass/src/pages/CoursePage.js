import React, { useState, useEffect, useContext } from 'react'
import {UserContext} from '../context/UserContext'

import {
    useParams,
    Link,
    useNavigate
} from 'react-router-dom'

const CoursePage = () => {
    let {userInfo} = useContext(UserContext)
    let navigate = useNavigate()
    
    // get dynamic ID (from App.js course/:id)
    let courseID = useParams().id

    // list of course detail
    let [courseDetails, setcourseDetails] = useState([])

    // fetch course details
    let courseDetailGET = async () => {
        let response = await fetch(`http://127.0.0.1:8000/api/courses/${courseID}`)
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

    let isPremium = (props, userInfo) => {
        if(parseFloat(userInfo.credit) >= props.price && userInfo.isActive === 'true'){
            return true
        }else if(props.price === '0.00' && userInfo.isActive === 'false'){
            return true
        }        
        else{
            return false
        }
    }

    let navigateToPayment = () => {
        navigate('/')
    }
    

  return (
    <div>
        {isPremium(courseDetails, userInfo) ?
            <div>
                <h2>{courseDetails.name} - {getPrice(courseDetails.price)}</h2>
                <p>{courseDetails.body}</p>

            </div>
            :
            navigateToPayment()
        }
        

    </div>
  )
}

export default CoursePage