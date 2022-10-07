import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import {UserContext} from '../context/UserContext'
import {checkCurrentPremiumPlan} from '../utils/utlis'

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

 

    
    let courseCartBtn = (props, userInfo) => {
        if(userInfo.user_acc_actv === 'True'){
            if(checkCurrentPremiumPlan(props, userInfo)){
                return <Link to={`/course/${props.slug}`} className="btn btn-success">Check it out</Link>

            }else{
                return <Link to={`/premium-plans`} className="btn btn-secondary">Buy access</Link>
            }          
        }else{
            return <Link to={`/register`} className="btn btn-primary">Register</Link>
        }
    }

  return (

    <div>                   
        <div className="col-sm-6" style={{paddingTop:'3rem'}}>
            <div className="card" style={{width: '18rem', height:'13rem',}}>
                <div className="card-body">
                    <h5 className="card-title">{props.name} - {getPrice(props)}</h5>
                    <p className="card-text">{getBody(props)}</p>
                    {courseCartBtn(props, userInfo)}
                </div>
            </div>
        </div> 
        

        


        
    </div>
  )
}

export default CourseListItem