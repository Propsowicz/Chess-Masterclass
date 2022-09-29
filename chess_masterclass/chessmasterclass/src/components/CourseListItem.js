import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import {UserContext} from '../context/UserContext'

const CourseListItem = (props) => {
    let {userInfo} = useContext(UserContext)

    // get body string - if it's too long => slice it!
    let getBody = (props) => {
        let body = props.body

        if(body.length > 55){
            return body = body.slice(0, 55) + '...'
        }else{
            return body
        }    
    }

    // get course price- if it's 0,00 => it's free!
    let getPrice = (props) => {
        let price = props.price

        if(props.price === '0.00'){
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

    let isAccountActivated = (props, userInfo) => {
        if(userInfo.user_acc_actv === 'True'){
            return isPremium(props, userInfo)
        }else{
            return false
        }
    }


  return (

    <div>
        {/* {isPremium(props, userInfo) ? */}
        {isAccountActivated(props, userInfo) ?
            <div>
                <Link to={`/course/${props.id}`}>
                    <h2>{props.name} - {getPrice(props)}</h2> 
                </Link>
                <p>{getBody(props)}</p>
            </div>       
            :
            <div>
                <h2>{props.name} - {getPrice(props)}</h2> 
                <p>{getBody(props)}</p>
            </div>               
        }
        
    </div>
  )
}

export default CourseListItem