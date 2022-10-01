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
            return price + '$'
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
        {isAccountActivated(props, userInfo) ?
            <div className="col-sm-6">
                <div className="card" style={{width: '18rem', height:'13rem',}}>
                    <div className="card-body">
                        <h5 className="card-title">{props.name} - {getPrice(props)}</h5>
                        <p className="card-text">{getBody(props)}</p>
                        <Link to={`/course/${props.slug}`} className="btn btn-primary">Check it out</Link>                        
                    </div>
                </div>
            </div> 
            :
            <div className="col-sm-6">
                <div className="card" style={{width: '18rem', height:'13rem',}}>
                    <div className="card-body">
                        <h5 className="card-title">{props.name} - {getPrice(props)}</h5>
                        <p className="card-text">{getBody(props)}</p>
                        <Link to={`/course/${props.slug}`} className="btn btn-secondary">Buy access</Link>                        
                    </div>
                </div>
            </div>               
        }

        


        
    </div>
  )
}

export default CourseListItem