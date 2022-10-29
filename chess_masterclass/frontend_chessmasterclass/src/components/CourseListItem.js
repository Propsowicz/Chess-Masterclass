import React, {useContext, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {UserContext} from '../context/UserContext'
import {checkCurrentPremiumPlan} from '../utils/utlis'
import ChessBoard from './ChessBoard'


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

    let getPremiumPlan = (props) => {
        let premiumPlansNames = {
            'free': 'Free',
            'master': 'Master',
            'international master': 'International Master',
            'grandmaster': 'Grandmaster'
          }
        return premiumPlansNames[props.premiumPlan]
    }

    let courseCartBtn = (props, userInfo) => {
        if(userInfo.user_acc_actv === 'True'){
            if(checkCurrentPremiumPlan(props, userInfo)){
                return <Link to={`/course/${props.slug}`} className="btn btn-success">Check it out</Link>

            }else{
                return <Link to={`/payment/premium-plans/`} className="btn btn-secondary">Buy access</Link>
            }          
        }else{
            return <Link to={`/register`} className="btn btn-primary">Register</Link>
        }
    } 

  return (
    <div>                   
        <div className="col-sm-6" style={{paddingTop:'3rem'}}>
            <div className="card" style={{width: '18rem', height:'28rem',}}>
                <div className="card-body">
                    <h5 className="card-title" style={{height:'3rem'}}>{props.name}</h5>
                    <h6 className="card-title" style={{height:'2.2rem'}}>Premium Plan: {getPremiumPlan(props)}</h6>
                    <div className='chessboard'><ChessBoard coord={props.representChessTable} size={200} /></div>
                    <p className="card-text" style={{paddingTop:'0.5rem'}}>{getBody(props)}</p>
                    {courseCartBtn(props, userInfo)}                       
                </div>
            </div>
        </div>         
    </div>
  )
}

export default CourseListItem