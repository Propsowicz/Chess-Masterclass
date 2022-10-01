import React, { useState, useEffect, useContext } from 'react'
import {UserContext} from '../context/UserContext'

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
    <div className='container'>
        {isPremium(courseDetails, userInfo) ?
            <div>
                <p className="fs-1">{courseDetails.name}</p>
                <p className="fs-6">{courseDetails.body}</p>   
                <ChessBoard />
            </div>
            :
            navigateToPayment()
        }
        

    </div>
  )
}

export default CoursePage